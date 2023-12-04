import { inputToArray } from "./utils";

const file = process.argv[2] || '1.txt'

/**
 * On each line, the calibration value can be found by combining the first digit and the last digit (in that order) to form a single two-digit number.
 * What is the sum of all of the calibration values?
 */
export const partOne = (array: string[]): number => {
  return array.reduce((prev, curr) => {
    const pattern = /\d/g;
    const digits = curr.match(pattern);
    let firstDigit
    let lastDigit

    if (digits) {
      firstDigit = digits[0];
      lastDigit = digits[digits.length - 1];
    } else {
      console.log("No digits found in the string.");
    }

    return prev + parseInt(firstDigit + lastDigit)
  }, 0)

};

// console.log(partOne(inputToArray(file)))
