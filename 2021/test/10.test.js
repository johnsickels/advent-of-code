const { partOne } = require("../dist/10.js");
const { inputToArray } = require("../dist/utils");

test("Syntax Scoring: Part One", () => {
  expect(partOne(inputToArray("10.test.txt"))).toBe(26397);
  expect(partOne(inputToArray("10.txt"))).toBe(266301);
});
