const item = {
  id: "post-1",
  url: "./offline2.html",
  title: "Offline Content",
  description: "Offline content example",
  icons: [
    {
      src: "./icon.png",
      sizes: "64x64",
      type: "image/png",
    },
  ],
  category: "article",
};

const channel = new BroadcastChannel("worker");

self.addEventListener("activate", (event) => {
  event.waitUntil(clients.claim());
  self.registration.index.add(item);
  Promise.all([fetch(item.url), fetch(item.icons[0].src)]).then(
    ([srcResponse, iconResponse]) => {
      caches
        .open("CACHE_NAME")
        .then((cache) => {
          cache.put(item.url, srcResponse);
          cache.put(item.icons[0].src, iconResponse);
        })
        .then(() => {
          channel.postMessage("cache-installed");
        });
    }
  );
});

self.addEventListener("fetch", (event) => {
  if (
    event.request.url.includes("icon.png") ||
    event.request.url.includes("offline2")
  ) {
    event.respondWith(caches.match(event.request.url, { ignoreSearch: true }));
  }
});
