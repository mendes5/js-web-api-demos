import dat from "https://cdn.skypack.dev/dat.gui";

const gui = new dat.GUI();

const canvas = document.getElementById("cnv");
const ctx = cnv.getContext("2d");
const file = document.querySelector("input");

const state = {
  step: 10,
  img: null,
};

gui.add(state, "step").min(10).max(1000).step(2).onChange(render);

file.onchange = (event) => {
  const file = URL.createObjectURL(event.target.files[0]);
  const img = new Image();
  img.src = file;

  img.onload = () => {
    state.img = img;
    render();
  };
};

function render() {
  if (!state.img) return null;

  canvas.width = state.img.width;
  canvas.height = state.img.height;

  ctx.drawImage(state.img, 0, 0, state.img.width, state.img.height);
  const imgData = ctx.getImageData(0, 0, state.img.width, state.img.height);

  ctx.font = `monospace ${state.step}`;

  const bg = 2;

  for (let x = 0; x < state.img.width; x += state.step) {
    for (let y = 0; y < state.img.height; y += state.step) {
      const randomChar = "0123456789abcdef"[(Math.random() * 16) << 0];

      const i = (x + y * imgData.width) * 4;
      const r = imgData.data[i + 0];
      const g = imgData.data[i + 1];
      const b = imgData.data[i + 2];
      const a = imgData.data[i + 3] / 255;

      ctx.fillStyle = `rgba(${r},${g},${b},${a})`;
      ctx.fillRect(x, y, state.step, state.step);

      ctx.fillStyle = `rgba(${r / bg},${g / bg},${b / bg},${a})`;
      ctx.fillText(randomChar, x, y + state.step);
    }
  }
}
