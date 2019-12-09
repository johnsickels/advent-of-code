const fs = require("fs");
const input = fs.readFileSync("input.txt", "utf8").split("\n");

const path1 = input[0].split(",");
const path2 = input[1].split(",");

let path1Coords;
let path2Coords;

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
  // console.log(`path coordinated... ${pathCoords[0]}`);

  return pathCoords;
};

// console.log(trackCoords(path1, path1Coords));
path1Coords = trackCoords(path1, path1Coords);
path2Coords = trackCoords(path2, path2Coords);

console.log(JSON.stringify(path1Coords[1])===JSON.stringify(path2Coords[0]))
for (let i = 0; i < path1Coords.length; i++) {
  for (let j = 0; j < path2Coords.length; j++) {
    if (JSON.stringify(path1Coords[i])===JSON.stringify(path2Coords[j])){
      console.log(JSON.stringify(path1Coords[i]));
    }
  }
}

// store them in an array
// transfer coordiate array to distance arr with added abs val
// sort from least and output arr[0]
