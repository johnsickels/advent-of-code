const { partOne } = require("../dist/12.js");
const { inputToArray } = require("../dist/utils");

test("Passage Pathing: Part One", () => {
  expect(partOne(inputToArray("12.test1.txt"))).toBe(10);
  expect(partOne(inputToArray("12.test2.txt"))).toBe(19);
  expect(partOne(inputToArray("12.test3.txt"))).toBe(226);
  expect(partOne(inputToArray("12.txt"))).toBe(3230);
});

