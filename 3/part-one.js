const fs = require("fs");
const input = fs.readFileSync("input.txt", "utf8").split("\n");

const path1 = input[0].split(",");
const path2 = input[1].split(",");

trackCoords = path => {
  let pathCoords = [[0, 0]];

  path.forEach(element => {
    let [x, y] = pathCoords[pathCoords.length - 1];

    switch (element[0]) {
      case "U":
        y += parseInt(element.slice(1));
        break;
      case "R":
        x += parseInt(element.slice(1));
        break;
      case "D":
        y -= parseInt(element.slice(1));
        break;
      case "L":
        x -= parseInt(element.slice(1));
        break;
      default:
        console.log(`Error`);
    }
    pathCoords.push([x,y]);
  });

  return pathCoords;
};

console.log(trackCoords(path1));
// trackCoords(path1);

// trackCoords(path2);

// if coordinates are ever equal
// when tracking second path each path1-arr.includes(path-2arr[current])

// store them in an array
// transfer coordiate array to distance arr with added abs val
// sort from least and output arr[0]
