const CACHE = 'ponte-a-prueba-v3';

self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(CACHE).then(function(cache) {
      return cache.add('./');
    })
  );
  // Fuerza activación inmediata sin esperar a que se cierren pestañas
  self.skipWaiting();
});

self.addEventListener('activate', function(e) {
  e.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(
        keys.filter(function(k) { return k !== CACHE; })
            .map(function(k) { return caches.delete(k); })
      );
    })
  );
  // Toma el control de todas las pestañas abiertas inmediatamente
  self.clients.claim();
});

self.addEventListener('fetch', function(e) {
  // Siempre intenta la red primero; si falla, usa caché
  e.respondWith(
    fetch(e.request).then(function(response) {
      // Actualiza la caché con la respuesta más reciente
      var clone = response.clone();
      caches.open(CACHE).then(function(cache) {
        cache.put(e.request, clone);
      });
      return response;
    }).catch(function() {
      // Sin red: sirve desde caché
      return caches.match(e.request).then(function(cached) {
        return cached || caches.match('./');
      });
    })
  );
});

// Notifica a todos los clientes que hay una nueva versión disponible
self.addEventListener('message', function(e) {
  if (e.data && e.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
