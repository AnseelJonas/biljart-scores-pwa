const CACHE_NAME = 'biljart-app-cache-v1-0';

const urlsToCache = [
    '/index.html',
    '/assets/js/build/bundle.js',
    '/assets/css/vuetify.min.css',
    '/assets/css/reset.css',
    '/assets/css/screen.css',
    '/assets/media/background1.jpg',
    '/assets/media/background2.jpg',
    '/assets/media/background3.jpg',
    '/assets/fonts/MaterialIcons-Regular.eot',
    '/assets/fonts/MaterialIcons-Regular.ttf',
    '/assets/fonts/MaterialIcons-Regular.woff',
    '/assets/fonts/MaterialIcons-Regular.woff2',
    '/images/empty_icon.svg',
    '/images/favicon.ico',
    '/images/icon-72x72.png',
    '/images/icon-96x96.png',
    '/images/icon-128x128.png',
    '/images/icon-144x144.png',
    '/images/icon-152x152.png',
    '/images/icon-192x192.png',
    '/images/icon-384x384.png',
    '/images/icon-512x512.png',
];

self.addEventListener('install', function(evt) {
    evt.waitUntil(
        precache().then(function() { return self.skipWaiting();})
    );
});

function precache() {
    return caches
    .open(CACHE_NAME)
    .then(function(cache){
        return cache.addAll(urlsToCache);
    }).catch(err =>{
        console.log('Could not cache', err);
    });
}

self.addEventListener('fetch', function(evt) {
    evt.respondWith(
        fromServer(evt.request)
        .catch(function(error){
            //console.log(error);
            return fromCache(evt.request);
        })
    )
});

function fromCache(request) {
    return caches
    .open(CACHE_NAME)
    .then(function(cache){
        return cache.match(request)
        .then( function(matching) {
            console.log(request);//TOO temp
            console.log(matching);//TODO temp
            return matching || caches.match('/index.html');
        });
    });
}

function fromServer(request){
    return fetch(request)
    .then(function(response){ return response});
}

self.addEventListener('activate', function(evt) {
    return self.clients.claim();
});