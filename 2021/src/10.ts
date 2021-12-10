import { inputToArray } from "./utils";

const removePairs = (line: string): string => {
  const replaced = line.replace(/\(\)|\[]|{}|<>/, "");
  if (line.length === replaced.length) return line;
  return removePairs(replaced);
};

const scoreIllegal = (line: string): number | null => {
  const chars = line.split("");
  for (const char of chars) {
    switch (char) {
      case ")":
        return 3;
      case "]":
        return 57;
      case "}":
        return 1197;
      case ">":
        return 25137;
    }
  }
  return 0;
};

const inverseChars = (line: string): string => {
  return line
    .split("")
    .map((char) => {
      switch (char) {
        case "(":
          return ")";
        case "[":
          return "]";
        case "{":
          return "}";
        case "<":
          return ">";
      }
    })
    .join("");
};

const scoreInversed = (line: string) => {
  return line.split("").reduce((acc, char) => {
    switch (char) {
      case ")":
        return acc * 5 + 1;
      case "]":
        return acc * 5 + 2;
      case "}":
        return acc * 5 + 3;
      case ">":
        return acc * 5 + 4;
    }
  }, 0);
};

export const partOne = (input: string[]): number => {
  return input.reduce((acc, line) => {
    const pairsRemoved = removePairs(line);
    const illegalScore = scoreIllegal(pairsRemoved);
    return acc + illegalScore;
  }, 0);
};

export const partTwo = (input: string[]): number => {
  const sortedScores = input
    .map((line) => {
      const pairsRemoved = removePairs(line);
      const illegalScore = scoreIllegal(pairsRemoved);
      if (!illegalScore) {
        const reversed = pairsRemoved.split("").reverse().join("");
        const inversed = inverseChars(reversed);
        const score = scoreInversed(inversed);
        return score;
      }
    })
    .filter((score) => score)
    .sort((a, b) => a - b);

  return sortedScores[Math.floor(sortedScores.length / 2)];
};
console.log(partTwo(inputToArray("10.txt")));
