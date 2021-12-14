type PairInsertionRules = Record<string, string[]>;
type Counter = Record<string, number>;

/**
 * Create an object whose values represent the two new pairs will replace the original pair
 *
 * Example:
 * {  CH: [ 'CB', 'BH' ] }
 *
 * @param input Input array like CH -> B
 * @returns
 */
const getPairInsertionRules = (input: string[]): PairInsertionRules => {
  const pairInsertionRules: PairInsertionRules = {};

  input.forEach((pairInsertionRule) => {
    const [adjacents, insert] = pairInsertionRule.split(" -> ");
    pairInsertionRules[adjacents] = [
      adjacents[0] + insert,
      insert + adjacents[1],
    ];
  });

  return pairInsertionRules;
};

/**
 * Create counter object of initial pairs from the input
 *
 * Example:
 * { NN: 1, NC: 1, CB: 1 }
 *
 * @param polymerTemplate initial input like 'NNCB'
 * @returns
 */
const getInitialPairs = (polymerTemplate: string): Counter => {
  const pairs: Counter = {};

  for (let i = 0; i < polymerTemplate.length - 1; i++) {
    const currentPair = polymerTemplate[i] + polymerTemplate[i + 1];
    pairs[currentPair] = pairs[currentPair] ? ++pairs[currentPair] : 1;
  }

  return pairs;
};

/**
 * Create new counter object that substitues each pair with the two pairs after the insertion
 *
 * @param key pair insertion rules
 * @param oldPairs pair conter object from last step
 * @returns
 */
const step = (rules: PairInsertionRules, oldPairs: Counter): Counter => {
  const newPairs: Counter = {};
  Object.entries(oldPairs).forEach(([pair, frequency]) => {
    rules[pair].forEach((newPair) => {
      newPairs[newPair] = newPairs[newPair]
        ? newPairs[newPair] + frequency
        : frequency;
    });
  });
  return newPairs;
};

/**
 * Count elements from pairs
 * @param pairs Counter object of pairs after all steps
 * @returns Counter object of all elements
 */
const getElementCount = (pairs: Counter): Counter => {
  const elCounter: Counter = {};

  Object.entries(pairs).forEach(([pair, frequency]) => {
    pair.split("").forEach((el) => {
      // divide  by 2 because we count each pair once, and therefore character twice
      elCounter[el] = elCounter[el]
        ? elCounter[el] + frequency / 2
        : frequency / 2;
    });
  });

  // round up because the endcaps are only half points
  Object.entries(elCounter).forEach(([pair, frequency]) => {
    elCounter[pair] = Math.ceil(frequency);
  });

  return elCounter;
};

/**
 * Sort the frequency of each element
 * @param count Counter object of elements after all steps
 * @returns Difference of most frequent element and least frequent element
 */
const getMostLeastDifference = (count: Counter): number => {
  const counts = Object.values(count);
  counts.sort((a, b) => b - a);

  return counts[0] - counts[counts.length - 1];
};

export const main = (input: string[], steps: number): number => {
  const polymerTemplate = input[0];
  const pairInsertionRules = input[1].split("\n");

  const rules = getPairInsertionRules(pairInsertionRules);

  let pairs = getInitialPairs(polymerTemplate);

  for (let i = 0; i < steps; i++) {
    pairs = step(rules, pairs);
  }

  const elCounter = getElementCount(pairs);

  const answer = getMostLeastDifference(elCounter);

  return answer;
};
