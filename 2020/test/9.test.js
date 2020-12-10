const { inputToArray } = require("../dist/utils");
const { hackXMAS } = require("../dist/9");

const sample = [
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
];

test("Find the first invalid number in sample XMAS", () => {
  expect(hackXMAS(sample, 5).firstNumber).toBe(127);
});

test("Find the weakness in actual XMAS", () => {
  const nums = inputToArray("9.txt").map((n) => parseInt(n));
  expect(hackXMAS(nums, 25).firstNumber).toBe(177777905);
});

test("Find the encryption weakness in sample XMAS", () => {
  expect(hackXMAS(sample, 5).encryptionWeakness).toBe(62);
});
