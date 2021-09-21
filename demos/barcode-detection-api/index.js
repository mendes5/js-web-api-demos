const bBox = document.querySelector("#b-box");
const video = document.querySelector("video");
const output = document.querySelector("code");

const barcodeDetector = new BarcodeDetector({
  formats: [
    "aztec",
    "code_128",
    "code_39",
    "code_93",
    "codabar",
    "data_matrix",
    "ean_13",
    "ean_8",
    "itf",
    "pdf417",
    "qr_code",
    "upc_a",
    "upc_e",
  ],
});

navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
  video.srcObject = stream;

  video.onplay = () =>
    setInterval(
      () =>
        barcodeDetector
          .detect(video)
          .then((barCodes) => {
            barCodes.forEach((barcode) => {
              output.innerText = JSON.stringify(barcode, null, "  ");
              bBox.style.top = `${barcode.boundingBox.top}px`;
              bBox.style.left = `${barcode.boundingBox.left}px`;
              bBox.style.width = `${barcode.boundingBox.width}px`;
              bBox.style.height = `${barcode.boundingBox.height}px`;
              bBox.innerText = `${barcode.rawValue} (${barcode.format})`;
            });
          })
          .catch(() => {
            // console.error("Barcode detection failed:", e);
          }),
      300
    );
});
