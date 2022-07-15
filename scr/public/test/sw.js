var CACHENAME = "cachestore-v1";
var FILES = [
  "https://intelagro.net/test/login.html",
  "https://intelagro.net/test/campo.html",
  "https://intelagro.net/test/informes.html",
  "https://pro.fontawesome.com/releases/v5.10.0/css/all.css",
  "https://intelagro.net/intelagro/adminlite/plugins/fontawesome-free/css/all.min.css",
  "https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css",
  "https://intelagro.net/test/adminlite/plugins/icheck-bootstrap/icheck-bootstrap.min.css",
  "https://intelagro.net/test/adminlite/plugins/sweetalert2-theme-bootstrap-4/bootstrap-4.min.css",
  "https://intelagro.net/test/adminlite/plugins/toastr/toastr.min.css",
  "https://intelagro.net/test/adminlite/dists/css/adminlte.min.css",
  "https://intelagro.net/test/adminlite/plugins/datatables-responsive/css/responsive.bootstrap4.min.css",
  "https://intelagro.net/test/adminlite/plugins/datatables-bs4/css/dataTables.bootstrap4.min.css",
  "https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700",
  "https://intelagro.net/test/adminlite/plugins/toastr/toastr.min.js",
  "https://intelagro.net/test/adminlite/plugins/sweetalert2/sweetalert2.min.js",
  "https://intelagro.net/test/adminlite/dists/js/adminlte.min.js",
  "https://intelagro.net/test/adminlite/plugins/jquery/jquery.min.js",
  "https://intelagro.net/test/adminlite/plugins/bootstrap/js/bootstrap.bundle.min.js",
  "https://intelagro.net/test/adminlite/plugins/moment/moment.min.js",
  "https://intelagro.net/test/adminlite/plugins/datatables/jquery.dataTables.min.js",
  "https://intelagro.net/test/adminlite/plugins/datatables-bs4/js/dataTables.bootstrap4.min.js",
  "https://intelagro.net/test/adminlite/plugins/datatables-responsive/js/dataTables.responsive.min.js",
  "https://intelagro.net/test/adminlite/plugins/datatables-responsive/js/responsive.bootstrap4.min.js",
  "https://intelagro.net/test/adminlite/plugins/chart.js/Chart.min.js",
  "https://intelagro.net/test/js/bundle.js"
];

self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(CACHENAME).then(function(cache) {
      return cache.addAll(FILES);
    })
  );
}); 

self.addEventListener('activate', function(event) {
  var version = 'v1';
  event.waitUntil(
    caches.keys()
      .then(cacheNames =>
        Promise.all(
          cacheNames
            .map(c => c.split('-'))
            .filter(c => c[0] === 'cachestore')
            .filter(c => c[1] !== version)
            .map(c => caches.delete(c.join('-')))
        )
      )
  );
});

self.addEventListener("fetch", function(event) {
    event.respondWith(
      caches.match(event.request).then(function(response) {
        return response || fetch(event.request);
      })
    );
  })