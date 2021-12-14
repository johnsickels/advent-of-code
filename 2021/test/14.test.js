const { partOne } = require("../dist/14.js");
const { inputToArray } = require("../dist/utils");

test("Passage Pathing: Part One", () => {
  expect(partOne(inputToArray("14.test.txt", 2))).toBe(1588);
  expect(partOne(inputToArray("14.txt", 2))).toBe(2408);
});
