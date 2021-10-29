var CACHE_NAME = 'my-site-cache-v3';
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

  // 호출한 url을 캐시에 저장
  self.addEventListener('fetch', function(event) {
    event.respondWith(
      // caches: 캐시스토리지안에 데이터
      // event.request: 호출된 url주소
      caches.match(event.request)
        .then(function(response) {
          // 현재 주소와 같은 url이 있는 경우 바로 리턴
          if (response) {
            return response;
          }
          return fetch(event.request).then(
            function(response) {
  
              // 현재 호출된 주소의 결과를 복사
              var responseToCache = response.clone();
  
              caches.open(CACHE_NAME)
                .then(function(cache) {
                  // 캐시 스토리지에 저장
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