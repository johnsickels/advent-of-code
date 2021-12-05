const { partOne, partTwo } = require("../dist/4.js");
const { inputToArray } = require("../dist/utils");

test("beats the squid", () => {
  expect(partOne(inputToArray("4.txt"))).toBe(23177);
  expect(partOne(inputToArray("4.test.txt"))).toBe(4512);
});

test("give squid the game", () => {
  expect(partTwo(inputToArray("4.txt"))).toBe(6804);
  expect(partTwo(inputToArray("4.test.txt"))).toBe(1924);
});
