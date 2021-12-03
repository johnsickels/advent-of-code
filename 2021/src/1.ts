// import { inputToArray } from "../utils";

export const partOne = (array: number[]): number => {
  let largerMeasurements = 0;
  for (let i = 0; i < array.length; i++) {
    const prev = array[i - 1];
    const curr = array[i];
    // console.log(element);
    if (prev && curr && curr > prev) {
      largerMeasurements++;
    }
  }
  return largerMeasurements;
};

// partOne(inputToArray("1.txt").map((e) => parseInt(e)))

// console.log(partOne(inputToArray("1.txt").map((e) => parseInt(e))));

export const partTwo = (array: number[]): number => {
  let largerMeasurements = 0;
  let lastMeasurement;
  for (let i = 0; i < array.length - 2; i++) {
    const n1 = array[i];
    const n2 = array[i + 1];
    const n3 = array[i + 2];

    const threeSum = n1 + n2 + n3

    if (lastMeasurement && threeSum > lastMeasurement){
      
      largerMeasurements++
    }
    lastMeasurement = threeSum
  }
  return largerMeasurements;
};

// console.log(partTwo(inputToArray("1.txt").map((e) => parseInt(e))));
