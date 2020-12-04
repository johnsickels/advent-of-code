// import { inputToArray } from "../utils";

export const partOne = (array: number[]): number => {
  for (let i = 0; i < array.length; i++) {
    for (let j = i + 1; j < array.length; j++) {
      if (array[i] + array[j] === 2020) {
        return array[i] * array[j];
      }
    }
  }
};

// console.log(partOne(inputToArray("1.txt").map((e) => parseInt(e))));

export const partTwo = (array: number[]): number => {
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

// console.log(partTwo(inputToArray("1.txt").map((e) => parseInt(e))));
