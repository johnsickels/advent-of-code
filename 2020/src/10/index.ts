// const { inputToArray } = require("../utils");
// const adapters = inputToArray("10.txt").map((d: string) => parseInt(d));

export const joltProduct = (adapters: number[]): number => {
  adapters = adapters.sort((a: number, b: number) => a - b);
  const outlet = 0;
  let oneJoltDiff = 0;
  let threeJoltDiff = 0;
  const device = adapters[adapters.length - 1] + 3;

  const difference = (a: number, b: number): void => {
    const diff = b - a;
    switch (diff) {
      case 1:
        oneJoltDiff++;
        break;
      case 3:
        threeJoltDiff++;
        break;
      default:
        console.error(
          "There was an error calculating the difference in jolts!",
          diff
        );
        break;
    }
  };

  // Find the jolt difference between the outlet and the first adapter
  difference(outlet, adapters[0]);

  // Find the jolt difference between the adapters themselves
  for (let i = 0; i < adapters.length - 1; i++) {
    difference(adapters[i], adapters[i + 1]);
  }

  // Find the jolf difference between the last adapter and the advice
  difference(adapters[adapters.length - 1], device);

  return oneJoltDiff * threeJoltDiff;
};

// console.log(joltProduct(adapters));
