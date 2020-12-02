import * as fs from "fs";

const data = fs.readFileSync("./2020/inputs/1.txt", "utf8");
const entries = data.split("\n").map((s) => parseInt(s));

const partOne = (array: number[]): number => {
  for (let i = 0; i < array.length; i++) {
    for (let j = i + 1; j < array.length; j++) {
      if (array[i] + array[j] === 2020) {
        return array[i] * array[j];
      }
    }
  }
};

// console.log(partOne(entries));

const partTwo = (array: number[]): number => {
  for (let i = 0; i < array.length; i++) {
    for (let j = i + 1; j < array.length; j++) {
      for (let k = 0; k < array.length; k++) {
        if (array[i] + array[j] + array[k] === 2020) {
          return array[i] * array[j] * array[k];
        }
      }
    }
  }
};

// console.log(partTwo(entries));

module.exports = {
  partOne: partOne,
  partTwo: partTwo,
};
