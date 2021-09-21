const button = document.querySelector("button");
const input = document.querySelector("input");

document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "hidden") {
    navigator.sendBeacon(
      "http://localhost:3000/analytics?value=" + input.value
    );
  }
});
