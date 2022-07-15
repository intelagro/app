var CACHENAME = "cachestore-v3";
var FILES = [
  "https://printjs-4de6.kxcdn.com/print.min.css",
  "https://printjs-4de6.kxcdn.com/print.min.js",
  "https://intelagro.net/intelagro/login.html",
  "https://intelagro.net/intelagro/campo.html",
  "https://intelagro.net/intelagro/informes.html",
  "https://pro.fontawesome.com/releases/v5.10.0/css/all.css",
  "https://intelagro.net/intelagro/adminlite/plugins/fontawesome-free/css/all.min.css",
  "https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css",
  "https://intelagro.net/intelagro/adminlite/plugins/icheck-bootstrap/icheck-bootstrap.min.css",
  "https://intelagro.net/intelagro/adminlite/plugins/sweetalert2-theme-bootstrap-4/bootstrap-4.min.css",
  "https://intelagro.net/intelagro/adminlite/plugins/toastr/toastr.min.css",
  "https://intelagro.net/intelagro/adminlite/dists/css/adminlte.min.css",
  "https://intelagro.net/intelagro/adminlite/plugins/datatables-responsive/css/responsive.bootstrap4.min.css",
  "https://intelagro.net/intelagro/adminlite/plugins/datatables-bs4/css/dataTables.bootstrap4.min.css",
  "https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700",
  "https://intelagro.net/intelagro/adminlite/plugins/toastr/toastr.min.js",
  "https://intelagro.net/intelagro/adminlite/plugins/sweetalert2/sweetalert2.min.js",
  "https://intelagro.net/intelagro/adminlite/dists/js/adminlte.min.js",
  "https://intelagro.net/intelagro/adminlite/plugins/jquery/jquery.min.js",
  "https://intelagro.net/intelagro/adminlite/plugins/bootstrap/js/bootstrap.bundle.min.js",
  "https://intelagro.net/intelagro/adminlite/plugins/moment/moment.min.js",
  "https://intelagro.net/intelagro/adminlite/plugins/datatables/jquery.dataTables.min.js",
  "https://intelagro.net/intelagro/adminlite/plugins/datatables-bs4/js/dataTables.bootstrap4.min.js",
  "https://intelagro.net/intelagro/adminlite/plugins/datatables-responsive/js/dataTables.responsive.min.js",
  "https://intelagro.net/intelagro/adminlite/plugins/datatables-responsive/js/responsive.bootstrap4.min.js",
  "https://intelagro.net/intelagro/adminlite/plugins/chart.js/Chart.min.js",
  "https://intelagro.net/intelagro/js/bundle.js"
];

self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(CACHENAME).then(function(cache) {
      return cache.addAll(FILES);
    })
  );
}); 

self.addEventListener('activate', function(event) {
  var version = 'v3';
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