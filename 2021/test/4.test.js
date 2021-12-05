const { partOne } = require("../dist/4.js");
const { inputToArray } = require("../dist/utils");

test("beats the squid", () => {
  expect(partOne(inputToArray("4.txt"))).toBe(23177);
  expect(partOne(inputToArray("4.test.txt"))).toBe(4512);
});
