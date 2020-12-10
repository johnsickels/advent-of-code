const { inputToArray } = require("../dist/utils");
const { joltProduct } = require("../dist/10");
const sampleAdapters = [
  28,
  33,
  18,
  42,
  31,
  14,
  46,
  20,
  48,
  47,
  24,
  23,
  49,
  45,
  19,
  38,
  39,
  11,
  1,
  32,
  25,
  35,
  8,
  17,
  7,
  9,
  4,
  2,
  34,
  10,
  3,
];

test("Find the sample number of 1-jolt differences multiplied by the number of 3-jolt differences", () => {
  expect(joltProduct(sampleAdapters)).toBe(220);
});

test("Find the actual number of 1-jolt differences multiplied by the number of 3-jolt differences", () => {
  const adapters = inputToArray("10.txt").map((d) => parseInt(d));
  expect(joltProduct(adapters)).toBe(1848);
});
