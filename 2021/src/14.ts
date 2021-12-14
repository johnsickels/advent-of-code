type PairInsertionKey = Record<string, string>;
type ElementCounter = Record<string, number>;

const getKey = (rules: string[]) => {
  const pairInsertionKey: PairInsertionKey = {};

  rules.forEach((pairInsertionRule) => {
    const [adjacents, insert] = pairInsertionRule.split(" -> ");
    pairInsertionKey[adjacents] = insert;
  });

  return pairInsertionKey;
};

const step = (polymerTemplate: string, key: PairInsertionKey) => {
  for (let i = 0; i < polymerTemplate.length; i += 2) {
    const pair = polymerTemplate[i] + polymerTemplate[i + 1];
    const temp = polymerTemplate.split("");
    temp.splice(i + 1, 0, key[pair]);
    polymerTemplate = temp.join("");
  }
  return polymerTemplate;
};

const countElements = (polymerTemplate: string) => {
  const elementCounter: ElementCounter = {};
  polymerTemplate.split("").forEach((el) => {
    elementCounter[el] = elementCounter[el] ? ++elementCounter[el] : 1;
  });
  return elementCounter;
};

const getMostLeastDifference = (count: ElementCounter) => {
  const counts = Object.values(count);
  counts.sort((a, b) => b - a);
  return counts[0] - counts[counts.length - 1];
};

export const partOne = (input: string[]): number => {
  let polymerTemplate = input[0];
  const pairInsertionRules = input[1].split("\n");

  const pairInsertionKey = getKey(pairInsertionRules);

  for (let i = 0; i <= 9; i++) {
    polymerTemplate = step(polymerTemplate, pairInsertionKey);
  }

  const count = countElements(polymerTemplate);

  const answer = getMostLeastDifference(count);
  return answer;
};
