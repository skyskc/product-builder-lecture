const STATIC_CACHE = 'goseoul-static-v2';
const PAGE_CACHE = 'goseoul-pages-v2';
const CORE_ASSETS = [
    '/',
    '/index.html',
    '/explore.html',
    '/course.html',
    '/generation.html',
    '/kcontent.html',
    '/kcontent-result.html',
    '/comments.html',
    '/about.html',
    '/partner.html',
    '/editorial.html',
    '/privacy.html',
    '/place.html?view=app&id=place-001',
    '/style.css',
    '/main.js'
];

function isStaticAssetRequest(requestUrl) {
    return /\.(?:css|js|png|jpg|jpeg|svg|webp|gif|ico|woff2?|ttf)$/i.test(requestUrl.pathname);
}

async function putInCache(cacheName, request, response) {
    const cache = await caches.open(cacheName);
    await cache.put(request, response);
}

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(STATIC_CACHE)
            .then((cache) => cache.addAll(CORE_ASSETS))
            .then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) => Promise.all(
            keys
                .filter((key) => ![STATIC_CACHE, PAGE_CACHE].includes(key))
                .map((key) => caches.delete(key))
        )).then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', (event) => {
    const { request } = event;
    if (request.method !== 'GET') return;

    const url = new URL(request.url);
    if (url.origin !== self.location.origin) return;

    if (url.pathname.startsWith('/api/')) {
        event.respondWith(
            fetch(request).catch(() => new Response(JSON.stringify({ error: 'offline' }), {
                status: 503,
                headers: { 'Content-Type': 'application/json' }
            }))
        );
        return;
    }

    if (request.mode === 'navigate') {
        event.respondWith((async () => {
            try {
                const response = await fetch(request);
                if (response && response.ok) {
                    void putInCache(PAGE_CACHE, request, response.clone());
                }
                return response;
            } catch (_) {
                const matched = await caches.match(request);
                if (matched) return matched;

                if (url.pathname === '/' || url.pathname.endsWith('.html')) {
                    const fallback = await caches.match('/index.html');
                    if (fallback) return fallback;
                }

                return new Response('', { status: 504, statusText: 'Offline' });
            }
        })());
        return;
    }

    if (isStaticAssetRequest(url)) {
        event.respondWith((async () => {
            const cached = await caches.match(request);
            if (cached) return cached;

            try {
                const response = await fetch(request);
                if (response && response.ok && response.type === 'basic') {
                    void putInCache(STATIC_CACHE, request, response.clone());
                }
                return response;
            } catch (_) {
                return new Response('', { status: 504, statusText: 'Offline' });
            }
        })());
        return;
    }

    event.respondWith(
        fetch(request).catch(async () => {
            const fallback = await caches.match(request);
            return fallback || new Response('', { status: 504, statusText: 'Offline' });
        })
    );
});
