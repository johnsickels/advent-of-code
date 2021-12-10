// remove all matching pairs, recursively
const removePairs = (line: string): string => {
  const replaced = line.replace(/\(\)|\[]|{}|<>/, "");
  if (line.length === replaced.length) return line;
  return removePairs(replaced);
};

// give a score to the first illegal character found
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

// return mirrored brackets
const getCompletionArray = (line: string): string[] => {
  return line
    .split("")
    .reverse()
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
    });
};

// for each character, multiply the total score by 5 and then increase the total score by the point value
const scoreCompletionArray = (line: string[]) => {
  return line.reduce((acc, char) => {
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
      // remove pairs
      const pairsRemoved = removePairs(line);
      // 0 if valid, but incomplete
      const illegalScore = scoreIllegal(pairsRemoved);
      if (!illegalScore) {
        // mirrored brackets to complete the line
        const completionArray = getCompletionArray(pairsRemoved);
        // score the completion
        const score = scoreCompletionArray(completionArray);
        return score;
      }
    })
    // sort only lines that are valid but incomplete
    .filter((score) => score)
    .sort((a, b) => a - b);

  // return the middle score
  return sortedScores[Math.floor(sortedScores.length / 2)];
};
