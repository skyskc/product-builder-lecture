require('dotenv').config();

const http = require('http');
const fs = require('fs');
const path = require('path');
const { URL } = require('url');

const HOST = '0.0.0.0';
const PORT = Number(process.env.PORT || 3000);
const GOOGLE_PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY || '';
const CACHE_TTL_MS = 6 * 60 * 60 * 1000;

const PLACE_DETAILS_CACHE = new Map();
const PLACE_PHOTO_CACHE = new Map();

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=utf-8'
};

function sendJson(res, status, payload) {
  const body = JSON.stringify(payload);
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': Buffer.byteLength(body)
  });
  res.end(body);
}

function sendFile(res, filePath) {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      sendJson(res, 404, { error: 'Not found' });
      return;
    }
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, {
      'Content-Type': MIME_TYPES[ext] || 'application/octet-stream',
      'Cache-Control': 'no-cache'
    });
    res.end(data);
  });
}

async function searchGooglePlaceId(queryText) {
  const searchResponse = await fetch('https://places.googleapis.com/v1/places:searchText', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': GOOGLE_PLACES_API_KEY,
      'X-Goog-FieldMask': 'places.id'
    },
    body: JSON.stringify({
      textQuery: queryText,
      languageCode: 'ko'
    })
  });

  if (!searchResponse.ok) {
    const errorText = await searchResponse.text();
    throw new Error(`Google Places Text Search error (${searchResponse.status}): ${errorText}`);
  }

  const searchData = await searchResponse.json();
  const googlePlaceId = searchData.places?.[0]?.id;
  if (!googlePlaceId) {
    throw new Error(`No Google place id found for query: ${queryText}`);
  }
  return googlePlaceId;
}

async function fetchGooglePlaceDetails(queryText) {
  const cacheItem = PLACE_DETAILS_CACHE.get(queryText);
  if (cacheItem && Date.now() - cacheItem.cachedAt < CACHE_TTL_MS) {
    return cacheItem.data;
  }

  const googlePlaceId = await searchGooglePlaceId(queryText);

  const url = `https://places.googleapis.com/v1/places/${googlePlaceId}`;
  const response = await fetch(url, {
    headers: {
      'X-Goog-Api-Key': GOOGLE_PLACES_API_KEY,
      'X-Goog-FieldMask': 'displayName,rating,userRatingCount,reviews,googleMapsUri'
    }
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Google Places API error (${response.status}): ${errorText}`);
  }

  const data = await response.json();
  const normalized = {
    placeId: googlePlaceId,
    displayName: data.displayName?.text || '',
    rating: data.rating || null,
    userRatingCount: data.userRatingCount || null,
    googleMapsUri: data.googleMapsUri || '',
    reviews: Array.isArray(data.reviews)
      ? data.reviews.slice(0, 3).map((review) => ({
          author: review.authorAttribution?.displayName || 'Google User',
          rating: review.rating || null,
          text: review.text?.text || ''
        })).filter((review) => review.text)
      : []
  };

  PLACE_DETAILS_CACHE.set(queryText, { cachedAt: Date.now(), data: normalized });
  return normalized;
}

async function fetchGooglePlacePhotoUrl(queryText) {
  const cacheItem = PLACE_PHOTO_CACHE.get(queryText);
  if (cacheItem && Date.now() - cacheItem.cachedAt < CACHE_TTL_MS) {
    return cacheItem.data;
  }

  const googlePlaceId = await searchGooglePlaceId(queryText);
  const placeResponse = await fetch(`https://places.googleapis.com/v1/places/${googlePlaceId}`, {
    headers: {
      'X-Goog-Api-Key': GOOGLE_PLACES_API_KEY,
      'X-Goog-FieldMask': 'photos'
    }
  });

  if (!placeResponse.ok) {
    const errorText = await placeResponse.text();
    throw new Error(`Google Places photo lookup error (${placeResponse.status}): ${errorText}`);
  }

  const placeData = await placeResponse.json();
  const photoName = placeData.photos?.[0]?.name;
  if (!photoName) {
    throw new Error(`No place photo found for query: ${queryText}`);
  }

  const mediaResponse = await fetch(`https://places.googleapis.com/v1/${photoName}/media?maxWidthPx=1280&skipHttpRedirect=true`, {
    headers: {
      'X-Goog-Api-Key': GOOGLE_PLACES_API_KEY
    }
  });

  if (!mediaResponse.ok) {
    const errorText = await mediaResponse.text();
    throw new Error(`Google Place Photo media error (${mediaResponse.status}): ${errorText}`);
  }

  const mediaData = await mediaResponse.json();
  const photoUrl = mediaData.photoUri;
  if (!photoUrl) {
    throw new Error(`No photoUri returned for query: ${queryText}`);
  }

  PLACE_PHOTO_CACHE.set(queryText, { cachedAt: Date.now(), data: photoUrl });
  return photoUrl;
}

function resolveStaticPath(urlPathname) {
  const safePath = path.normalize(urlPathname).replace(/^([.][.][/\\])+/, '');
  let relativePath = safePath === '/' ? '/index.html' : safePath;
  if (relativePath.endsWith('/')) {
    relativePath += 'index.html';
  }
  return path.join(process.cwd(), relativePath);
}

const server = http.createServer(async (req, res) => {
  const requestUrl = new URL(req.url, `http://${req.headers.host}`);

  if (requestUrl.pathname === '/api/place-details' && req.method === 'GET') {
    const query = requestUrl.searchParams.get('query');
    if (!query || query.trim().length < 2) {
      sendJson(res, 400, { error: 'Invalid query parameter' });
      return;
    }

    if (!GOOGLE_PLACES_API_KEY) {
      sendJson(res, 503, { error: 'GOOGLE_PLACES_API_KEY is not configured' });
      return;
    }

    try {
      const details = await fetchGooglePlaceDetails(query.trim());
      sendJson(res, 200, { query: query.trim(), details, source: 'google_places' });
    } catch (error) {
      sendJson(res, 502, { error: 'Failed to fetch Google place details', message: error.message });
    }
    return;
  }

  if (requestUrl.pathname === '/api/place-photo' && req.method === 'GET') {
    const query = requestUrl.searchParams.get('query');
    if (!query || query.trim().length < 2) {
      sendJson(res, 400, { error: 'Invalid query parameter' });
      return;
    }

    if (!GOOGLE_PLACES_API_KEY) {
      sendJson(res, 503, { error: 'GOOGLE_PLACES_API_KEY is not configured' });
      return;
    }

    try {
      const photoUrl = await fetchGooglePlacePhotoUrl(query.trim());
      sendJson(res, 200, { query: query.trim(), photoUrl, source: 'google_places_photo' });
    } catch (error) {
      sendJson(res, 404, { error: 'Failed to fetch Google place photo', message: error.message });
    }
    return;
  }

  const filePath = resolveStaticPath(requestUrl.pathname);
  sendFile(res, filePath);
});

server.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}`);
});
