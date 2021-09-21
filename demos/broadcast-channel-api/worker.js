const channel = new BroadcastChannel("global_channel");

let id = "0000000".replace(
  /0/g,
  () => "0123456789abcdef"[(Math.random() * 16) << 0]
);

channel.postMessage({
  type: "web_worker_install",
  data: { id },
});

setInterval(() => {
  channel.postMessage({
    type: "web_worker_tick",
    data: { id },
  });
}, 10000);
