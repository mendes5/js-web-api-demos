console.log("PI is %f", Math.PI);

console.log(
  "%cC%co%cl%co%cr%cs",
  "font-weight: bold; color: red; font-size: 30px; background-color: #000",
  "font-weight: bold; color: lime; font-size: 30px; background-color: #000",
  "font-weight: bold; color: yellow; font-size: 30px; background-color: #000",
  "font-weight: bold; color: blue; font-size: 30px; background-color: #000",
  "font-weight: bold; color: pink; font-size: 30px; background-color: #000",
  "font-weight: bold; color: orange; font-size: 30px; background-color: #000"
);

console.table(console);

console.table(localStorage);

console.table({
  test: 1,
  prop: 2,
});

console.groupCollapsed("X");
{
  console.log("A");
  console.groupCollapsed("Y");
  {
    console.log("B");
    console.log("C");
  }
  console.groupEnd();
  console.groupCollapsed("Z");
  {
    console.log("D");
    console.log("E");
  }
  console.groupEnd();
  console.log("F");
}
console.groupEnd();

{
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 6; j++) {
      ctx.fillStyle = `rgb(${Math.floor(255 - 42.5 * i)},${Math.floor(
        255 - 42.5 * j
      )},0)`;
      ctx.fillRect(j * 25, i * 25, 25, 25);
    }
  }

  var img = new Image();
  const url = canvas.toDataURL();
  img.onload = function () {
    console.log(
      "%c ",
      `background: url(${url});  color: transparent; padding: 70px`
    );
  };

  img.src = url;
}
