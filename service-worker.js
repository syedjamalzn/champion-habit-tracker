// =====================================
// CHAMPION HABIT TRACKER
// SERVICE WORKER
// PHASE 7 - STEP 3
// =====================================

const CACHE_NAME = "champion-habit-tracker-v2";

const APP_FILES = [
    "./",
    "./index.html",

    // Main pages
    "./dashboard.html",
    "./checklist.html",
    "./history.html",
    "./analytics.html",

    // Workout pages
    "./exercise.html",
    "./workout.html",
    "./workout-day.html",
    "./fat-loss.html",

    // CSS
    "./style.css",
    "./analytics.css",

    // JavaScript
    "./script.js",
    "./dashboard.js",
    "./exercise.js",
    "./workout.js",
    "./analytics.js",

    // PWA
    "./manifest.json",

    // Icons
    "./icons/icon-192.png",
    "./icons/icon-512.png"
];


// =====================================
// INSTALL
// =====================================

self.addEventListener("install", event => {

    console.log(
        "Champion Service Worker: Installing..."
    );

    event.waitUntil(

        caches.open(CACHE_NAME)
            .then(cache => {

                return cache.addAll(APP_FILES);

            })

    );

    self.skipWaiting();

});


// =====================================
// ACTIVATE
// =====================================

self.addEventListener("activate", event => {

    console.log(
        "Champion Service Worker: Activated ✅"
    );

    event.waitUntil(

        caches.keys()
            .then(keys => {

                return Promise.all(

                    keys
                        .filter(key => key !== CACHE_NAME)
                        .map(key => caches.delete(key))

                );

            })

    );

    self.clients.claim();

});


// =====================================
// FETCH
// =====================================

self.addEventListener("fetch", event => {

    event.respondWith(

        caches.match(event.request, {
            ignoreSearch: true
        })
        .then(response => {

            if (response) {
                return response;
            }

            return fetch(event.request);

        })

    );

}); 
