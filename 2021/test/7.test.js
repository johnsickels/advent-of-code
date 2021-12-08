const { partOne } = require("../dist/7.js");
const { inputToArray } = require("../dist/utils");

const sample = [16, 1, 2, 0, 4, 2, 7, 1, 2, 14];

test("finds minimum fuel spend to align all crab submarines", () => {
  expect(partOne(sample)).toBe(37);
  expect(
    partOne(inputToArray("7.txt", 1, ",").map((num) => parseInt(num)))
  ).toBe(336120);
});

