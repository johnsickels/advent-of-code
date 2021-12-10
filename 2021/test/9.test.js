const { partOne } = require("../dist/9.js");
const { inputToArray } = require("../dist/utils");

test("Smoke Basin: Part One", () => {
  expect(partOne(inputToArray("9.test.txt"))).toBe(15);
  expect(partOne(inputToArray("9.txt"))).toBe(591);
});
