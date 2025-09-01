
const CACHE = 'portfolio-v1';
const ASSETS = [
  '/', 'index.html', 'styles.css', 'script.js',
  'manifest.webmanifest',
  'assets/icons/icon-192.png',
  'assets/icons/icon-512.png',
  'assets/icons/favicon.png',
  'assets/img/hero-bg.svg',
  'assets/img/avatar.svg',
  'assets/img/project-1.svg',
  'assets/img/project-2.svg',
  'assets/img/project-3.svg',
  'assets/img/project-4.svg',
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  const req = event.request;
  event.respondWith(
    caches.match(req).then(cached => cached || fetch(req).catch(() => caches.match('index.html')))
  );
});
