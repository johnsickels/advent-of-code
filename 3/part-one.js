const fs = require("fs");

const input = fs.readFileSync("input.txt", "utf8").split("\n");

const path1 = input[0].split(",");
const path2 = input[1].split(",");

let path1coords = [[0, 0]];
let path2coords = [[0, 0]];

// track coordinate of each
path1.forEach(element => {
  let lastCoord = path1coords[path1coords.length-1];
  console.log(lastCoord);
  
  switch (element[0]) {
    // if U (0,+)
    case "U":
      lastCoord[1] += parseInt(element.slice(1));
      path1coords.push(lastCoord);
      break;
    // if R (+,0)
    case "R":
      lastCoord[0] += parseInt(element.slice(1));
      path1coords.push(lastCoord);
      break;
    // if D (0,-)
    case "D":
      lastCoord[1] -= parseInt(element.slice(1));
      path1coords.push(lastCoord);
      break;
    // if L (-,0)
    case "L":
      lastCoord[0] -= parseInt(element.slice(1));
      path1coords.push(lastCoord);
      break;
    default:
      console.log(`Error`);
  }
});

// if coordinates are ever equal
// when tracking second path each path1-arr.includes(path-2arr[current])

// store them in an array
// transfer coordiate array to distance arr with added abs val
// sort from least and output arr[0]

console.log();
