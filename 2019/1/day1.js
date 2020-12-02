const fs = require("fs");
const readline = require("readline");

const readInterface = readline.createInterface({
  input: fs.createReadStream("./input.txt")
});

let totalFuel = 0;

readInterface.on("line", function (mass) {

  let addedFuel = (Math.floor(mass / 3) - 2);
  let newFuel = 0;

  totalFuel += addedFuel;
  newFuel = Math.floor(addedFuel / 3) - 2;

  while (newFuel > 0){
    totalFuel += newFuel;
    newFuel = Math.floor(newFuel / 3) - 2;
  }

});

setTimeout(() => console.log(totalFuel), 100);
// correct answer 5239910