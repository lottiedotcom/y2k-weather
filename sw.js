const CACHE_NAME = 'flora-v3';
const ASSETS = [
    '/',
    '/index.html',
    '/flora_db.js',
    '/climate_db.js',
    '/manifest.json'
];

self.addEventListener('install', event => {
    self.skipWaiting(); // Forces this new version to take over immediately
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(
                keys.map(key => {
                    // Deletes the old v1/v2 caches that are trapping your data
                    if (key !== CACHE_NAME) return caches.delete(key);
                })
            );
        })
    );
    self.clients.claim(); // Immediately controls all open tabs
});

self.addEventListener('fetch', event => {
    const url = new URL(event.request.url);

    // 🚨 CRITICAL FIX: Bypass the cache entirely for the Cloud Database and Weather APIs
    if (
        url.pathname.startsWith('/api/') || 
        url.hostname.includes('open-meteo.com') || 
        url.hostname.includes('synopticdata.com') || 
        url.hostname.includes('api.sunrise-sunset.org')
    ) {
        // Force network-only for live data
        event.respondWith(fetch(event.request));
        return;
    }

    // Standard cache-first strategy for static UI files
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});
