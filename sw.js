// 不能访问dom和window等一系列api
// self 代表 Service Worker
const CACHE_NAME = "cache-v1";

self.addEventListener("install", event => {
  // 新的 sw 事件安装后触发
  console.log("install", event);
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(["/", "./index.css"]))
  );
});
self.addEventListener("activate", event => {
  console.log("activate", event);
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
          return cacheName;
        })
      );
    })
  );
});
self.addEventListener("fetch", event => {
  console.log("fetch", event);
  event.respondWith(
    caches.open(CACHE_NAME).then(cache => {
      return cache.match(event.request).then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request).then(response => {
          cache.put(event.request, response.clone());
          return response;
        });
      });
    })
  );
});
