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
let totalSteps = 0;

trackCoords = (path, pathCoords) => {
  pathCoords = [{ coords: [0, 0], totalSteps: 0 }];
  totalSteps = 0;

  path.forEach(element => {
    let [x, y] = pathCoords[pathCoords.length - 1].coords;
    let steps = parseInt(element.slice(1));

    switch (element[0]) {
      case "U":
        for (let i = y + 1; i < y + steps + 1; i++) {
          pathCoords.push({ coords: [x, i], totalSteps: ++totalSteps });
        }
        break;
      case "R":
        for (let i = x + 1; i < x + steps + 1; i++) {
          pathCoords.push({ coords: [i, y], totalSteps: ++totalSteps });
        }
        break;
      case "D":
        for (let i = y - 1; i > y - steps - 1; i--) {
          pathCoords.push({ coords: [x, i], totalSteps: ++totalSteps });
        }
        break;
      case "L":
        for (let i = x - 1; i > x - steps - 1; i--) {
          pathCoords.push({ coords: [i, y], totalSteps: ++totalSteps });
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
  path1CoordsString.push(JSON.stringify(coord.coords));
});

bar1.start(path2Coords.length, 0);
path2Coords.forEach(coord => {
  bar1.update(bar++);

  if (path1CoordsString.includes(JSON.stringify(coord.coords))) {
    let path1Steps =
      path1Coords[path1CoordsString.indexOf(JSON.stringify(coord.coords))]
        .totalSteps;
    let path2Steps = parseInt(coord.totalSteps);
    intersections.push({
      coord: coord.coords,
      distance: coord.coords[0] + coord.coords[1],
      bothTotalSteps: path1Steps + path2Steps
    });
  }
});
bar1.stop();

// ===== PART ONE ===== //
shortestDistance = () => {
  intersections.sort((a, b) =>
    a.distance > b.distance ? 1 : b.distance > a.distance ? -1 : 0
  );
  console.log(
  `====================\n SHORTEST DISTANCE:\n
    ${JSON.stringify(intersections[1].distance)}\n
  ====================`
);
};

// ===== PART TWO ===== //
leastSteps = () => {
  intersections.sort((a, b) =>
    a.bothTotalSteps > b.bothTotalSteps
      ? 1
      : b.bothTotalSteps > a.bothTotalSteps
      ? -1
      : 0
  );
  console.log(
  `====================\nLEAST STEPS:\n
    ${JSON.stringify(intersections[1].bothTotalSteps)}\n
    ====================`
);
};

shortestDistance();
leastSteps();

console.log(
  `====================\nANSWER:\n
    ${JSON.stringify(intersections[1])}\n
  ====================`
);
