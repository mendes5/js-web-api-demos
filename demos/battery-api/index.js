const info = document.querySelector("#info");

const MAX_POINT_COUNT = 10_000;
const MIN_POINT_COUNT = 570;

const batteryState = {
  charging: false,
  level: 0,
  dischargingTime: "unspecified",
  chargingTime: "unspecified",
};

const drawState = {
  pointsToRender: 0,
};

navigator.getBattery().then(function (battery) {
  const syncBatteryInfo = () => {
    batteryState.charging = battery.charging;
    batteryState.level = battery.level * 100 + "%";
    batteryState.chargingTime = battery.chargingTime + " seconds";
    batteryState.dischargingTime = battery.dischargingTime + " seconds";
    drawState.pointsToRender = batteryState.charging
      ? MAX_POINT_COUNT
      : MIN_POINT_COUNT;

    info.innerText = JSON.stringify({ batteryState, drawState }, null, "  ");
  };

  syncBatteryInfo();

  battery.addEventListener("chargingchange", syncBatteryInfo);
  battery.addEventListener("levelchange", syncBatteryInfo);
  battery.addEventListener("chargingtimechange", syncBatteryInfo);
  battery.addEventListener("dischargingtimechange", syncBatteryInfo);
});

const points = new Array(MAX_POINT_COUNT)
  .fill(0)
  .map(() => [
    [
      -10 + Math.random() * 20,
      -10 + Math.random() * 20,
      -10 + Math.random() * 20,
    ],
    `hsl(${Math.random() * 360}deg, 100%, 85%)`,
  ]);

const cubeVertices = [
  [-1, +1, +1],
  [+1, +1, +1],
  [-1, +1, -1],
  [+1, +1, -1],

  [-1, -1, +1],
  [+1, -1, +1],
  [-1, -1, -1],
  [+1, -1, -1],

  [-2.5, -4, +2.5],
  [+2.5, -4, +2.5],
  [-2.5, -4, -2.5],
  [+2.5, -4, -2.5],

  [-2.5, 4, +2.5],
  [+2.5, 4, +2.5],
  [-2.5, 4, -2.5],
  [+2.5, 4, -2.5],
];

const cubeLines = [
  [0, 1],
  [0, 2],
  [0, 4],
  [1, 3],
  [1, 5],
  [2, 3],
  [2, 6],
  [3, 7],
  [4, 6],
  [4, 5],
  [5, 7],
  [6, 7],
  [8, 9],
  [10, 11],
  [11, 9],
  [10, 8],
  [11, 8],
  [12, 13],
  [14, 15],
  [15, 13],
  [14, 12],
  [15, 12],
];

const lineColors = cubeLines.map(
  () => `hsl(${Math.random() * 360}deg, 100%, 50%)`
);

const applyMatrix3x4 = ([x, y, z], matrix) => [
  matrix[0] * x + matrix[3] * y + matrix[6] * z + matrix[9],
  matrix[1] * x + matrix[4] * y + matrix[7] * z + matrix[10],
  matrix[2] * x + matrix[5] * y + matrix[8] * z + matrix[11],
];

const to3D = ([x, y, z]) => [x / z, y / z];

const draw = (canvas, ctx, d) => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;

  ctx.resetTransform();
  ctx.translate(innerWidth / 2, innerHeight / 2);
  ctx.scale(innerHeight * 0.5, innerHeight * 0.5);

  ctx.strokeStyle = "#fff";
  ctx.lineWidth = 4 / innerHeight;

  const s = Math.sin(d);
  const c = Math.cos(d);

  const matrix = [c, 0, -s, 0, 1, 0, s, 0, c, 0, 0, -4];

  for (let index in lineColors) {
    let [startIndex, endIndex] = cubeLines[index];
    const start = applyMatrix3x4(cubeVertices[startIndex], matrix);
    const end = applyMatrix3x4(cubeVertices[endIndex], matrix);

    ctx.strokeStyle = lineColors[index];

    ctx.beginPath();
    const move = to3D(start);
    ctx.moveTo(move[0], move[1]);
    const line = to3D(end);
    ctx.lineTo(line[0], line[1]);
    ctx.stroke();
  }

  let pointsRendered = 0;

  const pointsToRender = batteryState.charging
    ? MAX_POINT_COUNT
    : MAX_POINT_COUNT / 5;

  for (let [point, color] of points) {
    const toCull = applyMatrix3x4(point, matrix);

    if (pointsRendered++ >= pointsToRender) {
      break;
    }

    if (toCull[2] > 0) {
      ctx.fillStyle = color;
      ctx.fillRect(...to3D(toCull), 10 / innerHeight, 10 / innerHeight);
    }
  }
};

const canvas = document.querySelector(`canvas`);
const ctx = canvas.getContext(`2d`);

function render(d) {
  draw(canvas, ctx, d / 5000);
  requestAnimationFrame(render);
}

render();
