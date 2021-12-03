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

  let gamma = "";
  let epsilon = "";

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const element = obj[key];
      const zeroMostCommon = element["0"] > element["1"];
      gamma += zeroMostCommon ? "0" : "1";
      epsilon += zeroMostCommon ? "1" : "0";
    }
  }
  return parseInt(gamma, 2) * parseInt(epsilon, 2);
};

// console.log(partOne(inputToArray("3.txt")));

const getRating = (array: string[], ratingType: string, col = 0): number => {

  if (array.length === 1) {
    return parseInt(array[0], 2);
  }

  const zeroStarting = [];
  const oneStarting = [];
  
  for (let j = 0; j < array.length; j++) {
    const bit = array[j][col];
    if (bit === "0") {
      zeroStarting.push(array[j]);
    } else {
      oneStarting.push(array[j]);
    }
  }

  if (ratingType === "oxygen") {
    if (oneStarting.length >= zeroStarting.length) {
      return getRating(oneStarting, ratingType, ++col);
    } else {
      return getRating(zeroStarting, ratingType, ++col);
    }
  }
  if (ratingType === "CO2") {
    if (oneStarting.length >= zeroStarting.length) {
      return getRating(zeroStarting, ratingType, ++col);
    } else {
      return getRating(oneStarting, ratingType, ++col);
    }
  }
};

export const partTwo = (array: string[]): number => {
  return getRating(array, "oxygen") * getRating(array, "CO2");
};

console.log(partTwo(inputToArray("3.txt")));
