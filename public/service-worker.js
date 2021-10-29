var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = [
  '/',
];

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
          .then(function(cache) {
            return cache.addAll(urlsToCache);
          })
      );
  });

  self.addEventListener('fetch', function(event) {
    event.respondWith(
      caches.match(event.request)
        .then(function(response) {
          if (response) {
            return response;
          }
          return fetch(event.request).then(
            function(response) {
  
              var responseToCache = response.clone();
  
              caches.open(CACHE_NAME)
                .then(function(cache) {
                  cache.put(event.request, responseToCache);
                });
  
              return response;
            }
          );
        }
      )
    );
  });

  self.addEventListener('activate', function(e) {
    e.waitUntil(
      caches.keys().then(function(keyList) {
            return Promise.all(keyList.map(function(key) {
          if(CACHE_NAME.indexOf(key) === -1) {
            return caches.delete(key);
          }
        }));
      })
    );
  });