const fs = require("fs");
const arr = fs.readFileSync("input.txt", "utf8").split("\n");

let object;
// let orbits = [];

arr.forEach(orbit => {
  object = orbit.split(")");
  console.log(object);
});
