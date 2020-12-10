const { inputToArray } = require("../dist/utils");
const { findWeakness } = require("../dist/9");

test("Find the weakness in sample XMAS", () => {
  expect(
    findWeakness(
      [
        35,
        20,
        15,
        25,
        47,
        40,
        62,
        55,
        65,
        95,
        102,
        117,
        150,
        182,
        127,
        219,
        299,
        277,
        309,
        576,
      ],
      5
    )
  ).toBe(127);
});

test("Find the weakness in actual XMAS", () => {
  const nums = inputToArray("9.txt").map((n) => parseInt(n));
  expect(findWeakness(nums, 25)).toBe(177777905);
});
