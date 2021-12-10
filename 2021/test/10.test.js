const { partOne, partTwo } = require("../dist/10.js");
const { inputToArray } = require("../dist/utils");

test("Syntax Scoring: Part One", () => {
  expect(partOne(inputToArray("10.test.txt"))).toBe(26397);
  expect(partOne(inputToArray("10.txt"))).toBe(266301);
});

test("Syntax Scoring: Part Two", () => {
  expect(partTwo(inputToArray("10.test.txt"))).toBe(288957);
  expect(partTwo(inputToArray("10.txt"))).toBe(3404870164);
});
