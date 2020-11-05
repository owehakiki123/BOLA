const CACHE_NAME = "football-app_v1";
var urlsToCache = [
  "/",
  "/nav.html",
  "/index.html",
  "/article.html",
  "/pages/about.html",
  "/pages/jadwal.html",
  "/pages/home.html",
  "/pages/save.html",
  "/icon.png",
  "/css/materialize.min.css",
  "/js/materialize.min.js",
  "/manifest.json",
  "/js/nav.js",
  "/js/api.js",
  "/js/idb.js",
  "/js/db.js",
  "/js/script.js",
  "/push.js",
  "/package-lock.json",
  "/package.json",
  "/maskable_icon.png",
  "https://unpkg.com/snarkdown@1.0.2/dist/snarkdown.umd.js",
  "https://fonts.googleapis.com/icon?family=Material+Icons"
];

self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

    self.addEventListener("fetch", function(event) {
      var base_url = "https://api.football-data.org/v2/";
      if (event.request.url.indexOf(base_url) > -1) {
        event.respondWith(
          caches.open(CACHE_NAME).then(function(cache) {
            return fetch(event.request).then(function(response) {
              cache.put(event.request.url, response.clone());
              return response;
            })
          })
        );
  } else {
    event.respondWith(
      caches.match(event.request, { ignoreSearch: true }).then(function(response) {
          return response || fetch (event.request);
      })
    )
  }
});

self.addEventListener("activate", function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName != CACHE_NAME) {
            console.log("ServiceWorker: cache " + cacheName + " dihapus");
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('push', function(event) {
  var body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = 'Push message no payload';
  }
  var options = {
    body: body,
    icon: 'icon.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };
  event.waitUntil(
    self.registration.showNotification('push notif bola', options)
  );
});