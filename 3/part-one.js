const fs = require("fs");
const input = fs.readFileSync("input.txt", "utf8").split("\n");

const cliProgress = require("cli-progress");
const bar1 = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);

const path1 = input[0].split(",");
const path2 = input[1].split(",");

let path1Coords;
let path2Coords;
let path1CoordsString = [];

let bar = 0;
let intersections = [];

trackCoords = (path, pathCoords) => {
  pathCoords = [[0, 0]];

  path.forEach(element => {
    let [x, y] = pathCoords[pathCoords.length - 1];
    let steps = parseInt(element.slice(1));

    switch (element[0]) {
      case "U":
        for (let i = y + 1; i < y + steps + 1; i++) {
          pathCoords.push([x, i]);
        }
        break;
      case "R":
        for (let i = x + 1; i < x + steps + 1; i++) {
          pathCoords.push([i, y]);
        }
        break;
      case "D":
        for (let i = y - 1; i > y - steps - 1; i--) {
          pathCoords.push([x, i]);
        }
        break;
      case "L":
        for (let i = x - 1; i > x - steps - 1; i--) {
          pathCoords.push([i, y]);
        }
        break;
      default:
        console.log(`Error`);
    }
  });
  return pathCoords;
};

path1Coords = trackCoords(path1, path1Coords);
path2Coords = trackCoords(path2, path2Coords);

path1Coords.forEach(coord => {
  path1CoordsString.push(JSON.stringify(coord));
});

bar1.start(path2Coords.length, 0);
path2Coords.forEach(coord => {
  bar1.update(bar++);

  if (path1CoordsString.includes(JSON.stringify(coord))) {
    intersections.push({ coord: coord, distance: coord[0] + coord[1] });
  }
});
bar1.stop();

intersections.sort((a, b) =>
  a.distance > b.distance ? 1 : b.distance > a.distance ? -1 : 0
);
console.log(`====================\nNearest instersection:\n${JSON.stringify(intersections[1])}\n====================`);