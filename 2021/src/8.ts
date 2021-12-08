type Key = { [key: string]: number };

const parseInput = (array: string[]) => {
  return array.map((line: string) => {
    const splitOnDelimiter = line.split(" | ");
    const signalPatterns = splitOnDelimiter[0].split(" ");
    const outputValue = splitOnDelimiter[1].split(" ");
    return { signalPatterns, outputValue };
  });
};

const getKeyByValue = (object: Key, value: number) => {
  return Object.keys(object).find((key) => object[key] === value);
};

const getCommonChars = (s1: string, s2: string) => {
  return s1.split("").reduce((accumulatingTotalSum, cur) => {
    return +s2.includes(cur) + accumulatingTotalSum;
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

/**
 *
 * @param array signal patterns
 * @param key numbers figured out so far
 * @param conditions find signal pattern with this length that matches the comparison
 * @returns
 */
const findByCommonality = (
  array: string[],
  key: Key,
  conditions: {
    len: number;
    comparison: number;
    matches: number;
  }
) => {
  return array
    .find((signal, i) => {
      if (
        signal.length === conditions.len &&
        getCommonChars(signal, getKeyByValue(key, conditions.comparison)) ==
          conditions.matches
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

  return parsedInput.reduce((accumulatingTotalSum, cur) => {
    return (
      cur.outputValue.filter((val) => uniqueDigitLengths.includes(val.length))
        .length + accumulatingTotalSum
    );
  }, 0);
};

export const partTwo = (array: string[]): number => {
  const parsedInput = parseInput(array);

  return parsedInput.reduce((accumulatingTotalSum, currentLine) => {
    const key: Key = {};

    // we know 1, 4, 7, 8
    key[findByLength(currentLine.signalPatterns, 2)] = 1;
    key[findByLength(currentLine.signalPatterns, 4)] = 4;
    key[findByLength(currentLine.signalPatterns, 3)] = 7;
    key[findByLength(currentLine.signalPatterns, 7)] = 8;

    // length 5 with both digits from 1 is 3
    key[
      findByCommonality(currentLine.signalPatterns, key, {
        len: 5,
        comparison: 1,
        matches: 2,
      })
    ] = 3;

    // length 5 with 3 in common with 4 is 5
    key[
      findByCommonality(currentLine.signalPatterns, key, {
        len: 5,
        comparison: 4,
        matches: 3,
      })
    ] = 5;

    // length 5 with 2 in common with 4 is 2
    key[
      findByCommonality(currentLine.signalPatterns, key, {
        len: 5,
        comparison: 4,
        matches: 2,
      })
    ] = 2;

    // length 6 with 4 in common with 4 is 9
    key[
      findByCommonality(currentLine.signalPatterns, key, {
        len: 6,
        comparison: 4,
        matches: 4,
      })
    ] = 9;

    // length 6 with 1 in common with 1 is 6
    key[
      findByCommonality(currentLine.signalPatterns, key, {
        len: 6,
        comparison: 1,
        matches: 1,
      })
    ] = 6;

    // zero is the only one left
    const lastSignalPattern = currentLine.signalPatterns[0]
      .split("")
      .sort()
      .join("");
    key[lastSignalPattern] = 0;

    const sum = currentLine.outputValue.reduce(
      (accumulatingOutputSum, currentLineentOutputValue) => {
        currentLineentOutputValue = currentLineentOutputValue
          .split("")
          .sort()
          .join("");
        const stringNum = key[currentLineentOutputValue] + "";
        const accumulator = accumulatingOutputSum + stringNum;
        return accumulator;
      },
      ""
    );

    return parseInt(sum) + accumulatingTotalSum;
  }, 0);
};
