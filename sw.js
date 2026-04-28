const CACHE_NAME = 'ramayanam-v4';

const KANDAS = [
    { id: 'Baalakaandam', splits: 77 },
    { id: 'Ayodhyakaandam', splits: 119 },
    { id: 'Aaranyakaandam', splits: 75 },
    { id: 'Kishkindakaanda', splits: 66 },
    { id: 'Sundarakaanda', splits: 68 },
    { id: 'Yuddhakaanda', splits: 128 }
];

function generateKandaFiles() {
    const files = [
        './', 
        './index.html', 
        './manifest.json', 
        './ramayanam.css', 
        './bootstrap.min.css', 
        './ramapattabhishekam.jpg',
        './reader.js',
        './Sanskrit2003.ttf'
    ];
    KANDAS.forEach(k => {
        for (let i = 1; i <= k.splits; i++) {
            files.push(`./${k.id}-newone_split${i}.html`);
        }
    });
    return files;
}

const ALL_ASSETS = generateKandaFiles();

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Caching all assets for offline use');
                return cache.addAll(ALL_ASSETS).catch(e => {
                    console.log('Some files skipped:', e.message);
                });
            })
            .then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(
                keys.filter(key => key !== CACHE_NAME)
                    .map(key => caches.delete(key))
            );
        }).then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', event => {
    const url = new URL(event.request.url);
    
    // Strategy: Cache First, then Network
    event.respondWith(
        caches.match(event.request).then(cachedResponse => {
            if (cachedResponse) {
                return cachedResponse;
            }
            return fetch(event.request).then(networkResponse => {
                if (networkResponse.ok) {
                    const cacheCopy = networkResponse.clone();
                    caches.open(CACHE_NAME).then(cache => {
                        cache.put(event.request, cacheCopy);
                    });
                }
                return networkResponse;
            });
        })
    );
});