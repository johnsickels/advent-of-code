import { inputToArray } from "./utils";

export const partOne = (array: string[]): number => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const obj: any = {};
  array.forEach((row) => {
    row.split("").forEach((bit, colIndex) => {
      obj["col" + colIndex] = obj["col" + colIndex] || {
        1: 0,
        0: 0,
      };
      obj["col" + colIndex][bit]++;
    });
  });

  let gamma = '';
  let epsilon = '';

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const element = obj[key];
      const zeroMostCommon = element["0"] > element["1"]
      gamma += zeroMostCommon ? "0" : "1";
      epsilon += zeroMostCommon ? "1" : "0";
    }
  }
    return parseInt(gamma, 2) * parseInt(epsilon, 2)
};

console.log(partOne(inputToArray("3.txt")));

// console.log(partOne(inputToArray("1.txt").map((e) => parseInt(e))));
