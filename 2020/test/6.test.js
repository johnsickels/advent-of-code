const { inputToArray } = require("../dist/utils");
const { getSumOfUniqueAnswers, getSumOfAllYeses } = require("../dist/6");

test("Get the sum of the sample, unique answer sheets", () => {
  expect(getSumOfUniqueAnswers(["abc", "abc", "abac", "aaaa", "b"])).toBe(11);
});

test("Get the sum of the actual, unique answer sheets", () => {
  expect(getSumOfUniqueAnswers(inputToArray("../inputs/6.txt", 2))).toBe(6565);
});

test("Get the sum of the sample, all yeses answer sheets", () => {
  expect(getSumOfAllYeses(inputToArray("../inputs/6.sample.txt", 2))).toBe(6);
});

test("Get the sum of the actual, all yeses answer sheets", () => {
  expect(getSumOfAllYeses(inputToArray("../inputs/6.txt", 2))).toBe(3137);
});
