// =====================================
// CHAMPION HABIT TRACKER
// SERVICE WORKER
// PHASE 7 - OFFLINE FIX
// =====================================

const CACHE_NAME = "champion-habit-tracker-v3";

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
        "Champion Habit Tracker: Installing v3..."
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
        "Champion Habit Tracker: Activated v3 ✅"
    );

    event.waitUntil(

        caches.keys()
            .then(keys => {

                return Promise.all(

                    keys
                        .filter(
                            key => key !== CACHE_NAME
                        )
                        .map(
                            key => caches.delete(key)
                        )

                );

            })

    );

    self.clients.claim();

});


// =====================================
// FETCH
// =====================================

self.addEventListener("fetch", event => {

    const request =
        event.request;

    const url =
        new URL(request.url);


    // =================================
    // PAGE / NAVIGATION REQUEST
    // =================================

    if (
        request.mode === "navigate"
    ) {

        event.respondWith(

            caches.match(
                request
            )
            .then(response => {

                // Exact URL found
                if (response) {
                    return response;
                }


                // =================================
                // IMPORTANT OFFLINE FIX
                // Ignore query parameters
                // =================================

                const cleanRequest =
                    new Request(
                        url.origin +
                        url.pathname
                    );


                return caches.match(
                    cleanRequest
                );

            })
            .then(response => {

                if (response) {
                    return response;
                }


                // If online, try network
                return fetch(request);

            })
            .catch(() => {

                // Offline fallback
                return caches.match(
                    "./index.html"
                );

            })

        );

        return;
    }


    // =====================================
    // NORMAL FILE REQUEST
    // CSS / JS / IMAGES / MANIFEST
    // =====================================

    event.respondWith(

        caches.match(request)
            .then(response => {

                if (response) {
                    return response;
                }

                return fetch(request);

            })

    );

});
