const http = require('http');
const fs = require('fs');
const path = require('path');
const { URL } = require('url');

function loadEnvFromFile() {
  const envPath = path.join(process.cwd(), '.env');
  if (!fs.existsSync(envPath)) return;
  const raw = fs.readFileSync(envPath, 'utf8');
  raw.split(/\r?\n/).forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) return;
    const eq = trimmed.indexOf('=');
    if (eq < 0) return;
    const key = trimmed.slice(0, eq).trim();
    const value = trimmed.slice(eq + 1).trim();
    if (!process.env[key]) process.env[key] = value;
  });
}

loadEnvFromFile();

const HOST = '0.0.0.0';
const PORT = Number(process.env.PORT || 3000);
const GOOGLE_PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY || '';
const CACHE_TTL_MS = 6 * 60 * 60 * 1000;

const PLACE_DETAILS_CACHE = new Map();
const PLACE_PHOTO_CACHE = new Map();
const HOTELS_CACHE = new Map();
const RESTAURANTS_CACHE = new Map();

const MEAL_QUERY_HINT = {
  breakfast: 'breakfast cafe restaurant',
  lunch: 'lunch korean restaurant',
  dinner: 'dinner popular restaurant',
  drinks: 'pub izakaya bar'
};

const BROADCAST_PICKS = {
  '종로구': {
    breakfast: [{ name: '토속촌 삼계탕', show: '또간집' }],
    lunch: [{ name: '광장시장 먹거리', show: '맛있는 녀석들' }],
    dinner: [{ name: '익선동 한식주점', show: '또간집' }],
    drinks: [{ name: '서순라길 바', show: '또간집' }]
  },
  '중구': {
    breakfast: [{ name: '명동교자', show: '맛있는 녀석들' }],
    lunch: [{ name: '남대문시장 칼국수골목', show: '맛있는 녀석들' }],
    dinner: [{ name: '을지로 노포 식당', show: '또간집' }],
    drinks: [{ name: '을지로 포차거리', show: '또간집' }]
  },
  '마포구': {
    breakfast: [{ name: '연남동 브런치 카페', show: '또간집' }],
    lunch: [{ name: '망원시장 분식', show: '맛있는 녀석들' }],
    dinner: [{ name: '홍대 고깃집', show: '또간집' }],
    drinks: [{ name: '합정 와인바', show: '또간집' }]
  },
  '강남구': {
    breakfast: [{ name: '신사동 브런치 카페', show: '또간집' }],
    lunch: [{ name: '강남역 국밥집', show: '맛있는 녀석들' }],
    dinner: [{ name: '압구정 한우집', show: '또간집' }],
    drinks: [{ name: '청담 칵테일바', show: '또간집' }]
  },
  '송파구': {
    breakfast: [{ name: '잠실 베이커리 카페', show: '또간집' }],
    lunch: [{ name: '석촌호수 근처 국수집', show: '맛있는 녀석들' }],
    dinner: [{ name: '잠실새내 닭갈비', show: '또간집' }],
    drinks: [{ name: '송리단길 펍', show: '또간집' }]
  }
};

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

async function fetchWikipediaPhotoUrl(queryText) {
  const normalizedQuery = queryText.replace(/\s+seoul$/i, '').trim();
  const languages = ['ko', 'en'];

  for (const lang of languages) {
    const searchUrl = `https://${lang}.wikipedia.org/w/api.php?action=query&list=search&srlimit=1&utf8=1&format=json&srsearch=${encodeURIComponent(normalizedQuery)}`;
    const searchResponse = await fetch(searchUrl);
    if (!searchResponse.ok) {
      continue;
    }

    const searchData = await searchResponse.json();
    const title = searchData?.query?.search?.[0]?.title;
    if (!title) {
      continue;
    }

    const imageUrl = `https://${lang}.wikipedia.org/w/api.php?action=query&prop=pageimages&piprop=thumbnail&pithumbsize=1280&format=json&titles=${encodeURIComponent(title)}`;
    const imageResponse = await fetch(imageUrl);
    if (!imageResponse.ok) {
      continue;
    }

    const imageData = await imageResponse.json();
    const pages = imageData?.query?.pages ? Object.values(imageData.query.pages) : [];
    const thumbnail = pages?.[0]?.thumbnail?.source;
    if (thumbnail) {
      return thumbnail;
    }
  }

  throw new Error(`No wikipedia thumbnail found for query: ${queryText}`);
}

function priceLevelToAvg(priceLevel) {
  if (!priceLevel) return '약 ₩140,000';
  const map = {
    PRICE_LEVEL_FREE: '약 ₩0',
    PRICE_LEVEL_INEXPENSIVE: '약 ₩80,000',
    PRICE_LEVEL_MODERATE: '약 ₩140,000',
    PRICE_LEVEL_EXPENSIVE: '약 ₩220,000',
    PRICE_LEVEL_VERY_EXPENSIVE: '약 ₩350,000'
  };
  return map[priceLevel] || '약 ₩140,000';
}

async function fetchTopHotels(queryText) {
  const cacheItem = HOTELS_CACHE.get(queryText);
  if (cacheItem && Date.now() - cacheItem.cachedAt < CACHE_TTL_MS) {
    return cacheItem.data;
  }

  const response = await fetch('https://places.googleapis.com/v1/places:searchText', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': GOOGLE_PLACES_API_KEY,
      'X-Goog-FieldMask': 'places.displayName,places.rating,places.userRatingCount,places.formattedAddress,places.priceLevel,places.googleMapsUri'
    },
    body: JSON.stringify({
      textQuery: queryText,
      languageCode: 'ko'
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Hotel search error (${response.status}): ${errorText}`);
  }

  const data = await response.json();
  const hotels = Array.isArray(data.places) ? data.places.map((p) => ({
    name: p.displayName?.text || '',
    rating: typeof p.rating === 'number' ? p.rating : 0,
    userRatingCount: typeof p.userRatingCount === 'number' ? p.userRatingCount : 0,
    address: p.formattedAddress || '',
    averagePrice: priceLevelToAvg(p.priceLevel),
    googleMapsUri: p.googleMapsUri || ''
  })).filter((h) => h.name) : [];

  hotels.sort((a, b) => {
    if (b.rating !== a.rating) return b.rating - a.rating;
    return b.userRatingCount - a.userRatingCount;
  });

  const top5 = hotels.slice(0, 5);
  HOTELS_CACHE.set(queryText, { cachedAt: Date.now(), data: top5 });
  return top5;
}

async function fetchTopRestaurants(district, meal, limit = 3) {
  const cacheKey = `${district}:${meal}:${limit}`;
  const cacheItem = RESTAURANTS_CACHE.get(cacheKey);
  if (cacheItem && Date.now() - cacheItem.cachedAt < CACHE_TTL_MS) {
    return cacheItem.data;
  }

  const hint = MEAL_QUERY_HINT[meal] || 'restaurant';
  const textQuery = `${district} Seoul ${hint}`;
  const response = await fetch('https://places.googleapis.com/v1/places:searchText', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': GOOGLE_PLACES_API_KEY,
      'X-Goog-FieldMask': 'places.displayName,places.rating,places.userRatingCount,places.formattedAddress,places.googleMapsUri,places.priceLevel'
    },
    body: JSON.stringify({
      textQuery,
      languageCode: 'ko'
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Restaurant search error (${response.status}): ${errorText}`);
  }

  const data = await response.json();
  const restaurants = Array.isArray(data.places)
    ? data.places.map((p) => ({
        name: p.displayName?.text || '',
        rating: typeof p.rating === 'number' ? p.rating : 0,
        userRatingCount: typeof p.userRatingCount === 'number' ? p.userRatingCount : 0,
        address: p.formattedAddress || '',
        averagePrice: priceLevelToAvg(p.priceLevel),
        googleMapsUri: p.googleMapsUri || ''
      })).filter((r) => r.name)
    : [];

  restaurants.sort((a, b) => {
    if (b.rating !== a.rating) return b.rating - a.rating;
    return b.userRatingCount - a.userRatingCount;
  });

  const top = restaurants.slice(0, limit);
  const curation = BROADCAST_PICKS[district]?.[meal] || [];
  const result = { top, curation };
  RESTAURANTS_CACHE.set(cacheKey, { cachedAt: Date.now(), data: result });
  return result;
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

    try {
      let photoUrl = '';
      let source = '';

      if (GOOGLE_PLACES_API_KEY) {
        try {
          photoUrl = await fetchGooglePlacePhotoUrl(query.trim());
          source = 'google_places_photo';
        } catch (_) {
          photoUrl = await fetchWikipediaPhotoUrl(query.trim());
          source = 'wikipedia_fallback';
        }
      } else {
        photoUrl = await fetchWikipediaPhotoUrl(query.trim());
        source = 'wikipedia_fallback';
      }

      sendJson(res, 200, { query: query.trim(), photoUrl, source });
    } catch (error) {
      sendJson(res, 404, { error: 'Failed to fetch place photo', message: error.message });
    }
    return;
  }

  if (requestUrl.pathname === '/api/hotels-top' && req.method === 'GET') {
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
      const hotels = await fetchTopHotels(query.trim());
      sendJson(res, 200, { query: query.trim(), hotels, source: 'google_places_hotels' });
    } catch (error) {
      sendJson(res, 502, { error: 'Failed to fetch top hotels', message: error.message });
    }
    return;
  }

  if (requestUrl.pathname === '/api/restaurants-top' && req.method === 'GET') {
    const district = requestUrl.searchParams.get('district');
    const meal = requestUrl.searchParams.get('meal');
    const limit = Number(requestUrl.searchParams.get('limit') || '3');

    if (!district || district.trim().length < 2) {
      sendJson(res, 400, { error: 'Invalid district parameter' });
      return;
    }
    if (!meal || !MEAL_QUERY_HINT[meal]) {
      sendJson(res, 400, { error: 'Invalid meal parameter' });
      return;
    }
    if (!GOOGLE_PLACES_API_KEY) {
      sendJson(res, 503, { error: 'GOOGLE_PLACES_API_KEY is not configured' });
      return;
    }

    try {
      const data = await fetchTopRestaurants(district.trim(), meal, Math.min(Math.max(limit, 1), 5));
      sendJson(res, 200, {
        district: district.trim(),
        meal,
        restaurants: data.top,
        broadcastPicks: data.curation,
        source: 'google_places_restaurants+curation'
      });
    } catch (error) {
      sendJson(res, 502, { error: 'Failed to fetch top restaurants', message: error.message });
    }
    return;
  }

  const filePath = resolveStaticPath(requestUrl.pathname);
  sendFile(res, filePath);
});

server.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}`);
});
