const channel = new BroadcastChannel("global_channel");
let count = 0;

self.addEventListener("install", function (event) {
  channel.postMessage({
    type: "service_worker_install",
    data: { count },
  });

  setInterval(() => {
    count++;
    channel.postMessage({
      type: "service_worker_sync",
      data: { count },
    });
  }, 10000);
});
