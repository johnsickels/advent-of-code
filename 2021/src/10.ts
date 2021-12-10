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

export const partOne = (input: string[]): number => {
  return input.reduce((acc, line) => {
    const pairsRemoved = removePairs(line);
    const illegalScore = scoreIllegal(pairsRemoved);
    return acc + illegalScore;
  }, 0);
};
