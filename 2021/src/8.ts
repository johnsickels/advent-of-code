import { inputToArray } from "./utils";

const parseInput = (array: string[]) => {
  return array.map((line: string) => {
    const splitOnDelimiter = line.split(" | ");
    const signalPatterns = splitOnDelimiter[0].split(" ");
    const outputValue = splitOnDelimiter[1].split(" ");
    return { signalPatterns, outputValue };
  });
};

type Key = { [key: string]: number };

const getKeyByValue = (object: Key, value: number) => {
  return Object.keys(object).find((key) => object[key] === value);
};

const getCommonChars = (s1: string, s2: string) => {
  return s1.split("").reduce((prev, cur) => {
    return +s2.includes(cur) + prev;
  }, 0);
};

const findByLength = (array: string[], len: number) => {
  return array
    .find((signal, i) => {
      if (signal.length === len) {
        array.splice(i, 1);
        return true;
      }
    })
    .split("")
    .sort()
    .join("");
};

const findFour = (array: string[]) => {
  return array
    .find((signal, i) => {
      if (signal.length === 4) {
        array.splice(i, 1);
        return true;
      }
    })
    .split("")
    .sort()
    .join("");
};
const findSeven = (array: string[]) => {
  return array
    .find((signal, i) => {
      if (signal.length === 3) {
        array.splice(i, 1);
        return true;
      }
    })
    .split("")
    .sort()
    .join("");
};
const findEight = (array: string[]) => {
  return array
    .find((signal, i) => {
      if (signal.length === 7) {
        array.splice(i, 1);
        return true;
      }
    })
    .split("")
    .sort()
    .join("");
};
const findThree = (array: string[], key: Key) => {
  return array
    .find((signal, i) => {
      // return (
      if (
        signal.length === 5 &&
        getCommonChars(signal, getKeyByValue(key, 1)) == 2
      ) {
        array.splice(i, 1);
        return true;
      }
      // );
    })
    .split("")
    .sort()
    .join("");
};
const findFive = (array: string[], key: Key) => {
  return array
    .find((signal, i) => {
      if (
        signal.length === 5 &&
        getCommonChars(signal, getKeyByValue(key, 4)) == 3
      ) {
        array.splice(i, 1);
        return true;
      }
    })
    .split("")
    .sort()
    .join("");
};
const findTwo = (array: string[], key: Key) => {
  return array
    .find((signal, i) => {
      if (
        signal.length === 5 &&
        getCommonChars(signal, getKeyByValue(key, 4)) == 2
      ) {
        array.splice(i, 1);
        return true;
      }
    })
    .split("")
    .sort()
    .join("");
};

const findNine = (array: string[], key: Key) => {
  return array
    .find((signal, i) => {
      if (
        signal.length === 6 &&
        getCommonChars(signal, getKeyByValue(key, 4)) == 4
      ) {
        array.splice(i, 1);
        return true;
      }
    })
    .split("")
    .sort()
    .join("");
};

const findSix = (array: string[], key: Key) => {
  return array
    .find((signal, i) => {
      if (
        signal.length === 6 &&
        getCommonChars(signal, getKeyByValue(key, 1)) == 1
      ) {
        array.splice(i, 1);
        return true;
      }
    })
    .split("")
    .sort()
    .join("");
};

export const partOne = (array: string[]): number => {
  const parsedInput = parseInput(array);
  const uniqueDigitLengths = [2, 3, 4, 7];

  return parsedInput.reduce((prev, cur) => {
    return (
      cur.outputValue.filter((val) => uniqueDigitLengths.includes(val.length))
        .length + prev
    );
  }, 0);
};

export const partTwo = (array: string[]) => {
  const parsedInput = parseInput(array);

  return parsedInput.reduce((prev, curr) => {
    const key: Key = {};

    // we know 1, 4, 7, 8
    key[findByLength(curr.signalPatterns, 2)] = 1;
    key[findFour(curr.signalPatterns)] = 4;
    key[findSeven(curr.signalPatterns)] = 7;
    key[findEight(curr.signalPatterns)] = 8;

    // length 5 with both digits from 1 is 3
    key[findThree(curr.signalPatterns, key)] = 3;

    // length 5 with 3 in common with 4 is 5
    key[findFive(curr.signalPatterns, key)] = 5;

    // length 5 with 2 in common with 4 is 2
    key[findTwo(curr.signalPatterns, key)] = 2;

    // length 6 with 4 in common with 4 is 9
    key[findNine(curr.signalPatterns, key)] = 9;

    // length 6 with 1 in common with 1 is 6
    key[findSix(curr.signalPatterns, key)] = 6;

    // zero is the only one left
    const lastSignalPattern = curr.signalPatterns[0].split("").sort().join("");
    key[lastSignalPattern] = 0;

    const sum = curr.outputValue.reduce((prev2, cur2) => {
      cur2 = cur2.split("").sort().join("");
      const stringNum = key[cur2] + "";
      const accumulator = prev2 + stringNum;
      return accumulator;
    }, "");
    return parseInt(sum) + prev;
  }, 0);
};

console.log(partTwo(inputToArray("8.txt")));
