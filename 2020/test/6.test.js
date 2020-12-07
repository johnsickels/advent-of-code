const { inputToArray } = require("../dist/utils");
const { getSumOfUniqueAnswers } = require("../dist/6");

test("Get the sum of the sample, unique answer sheets", () => {
  expect(getSumOfUniqueAnswers(["abc", "abc", "abac", "aaaa", "b"])).toBe(11);
});

test("Get the sum of the actual, unique answer sheets", () => {
  expect(getSumOfUniqueAnswers(inputToArray("../inputs/6.txt", 2))).toBe(6565);
});
