const CACHE_NAME = 'wb-cache-v1';
const STATIC_ASSETS = [
    '/',
    '/index.html',
    '/styles.css',
    '/nav-footer.css',
    '/assets/js/main.js',
    '/assets/js/optimizations.js',
    '/assets/images/logo.png'
];

// Install Service Worker
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Cache aberto');
                return cache.addAll(STATIC_ASSETS);
            })
    );
});

// Activate Service Worker
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Fetch Event Strategy
self.addEventListener('fetch', event => {
    const requestUrl = event.request.url;

    // Evita que o site.webmanifest seja baixado como arquivo
    if (requestUrl.endsWith('site.webmanifest')) {
        return;
    }

    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Retorna do cache, se existir
                if (response) {
                    return response;
                }

                // Faz uma cópia da requisição original
                const fetchRequest = event.request.clone();

                return fetch(fetchRequest).then(response => {
                    // Verifica se é uma resposta válida
                    if (!response || response.status !== 200 || response.type !== 'basic') {
                        return response;
                    }

                    // Faz uma cópia da resposta para cache
                    const responseToCache = response.clone();

                    caches.open(CACHE_NAME)
                        .then(cache => {
                            cache.put(event.request, responseToCache);
                        });

                    return response;
                });
            })
    );
});


// Handle Push Notifications
self.addEventListener('push', event => {
    const options = {
        body: event.data.text(),
        icon: '/assets/images/icon.png',
        badge: '/assets/images/badge.png'
    };

    event.waitUntil(
        self.registration.showNotification('WB Notification', options)
    );
});

// Handle Notification Clicks
self.addEventListener('notificationclick', event => {
    event.notification.close();
    event.waitUntil(
        clients.openWindow('/')
    );
}); 