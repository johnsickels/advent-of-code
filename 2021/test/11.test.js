const { partOne, partTwo } = require("../dist/11.js");
const { inputToArray } = require("../dist/utils");

test("Dumbo Octopus: Part One", () => {
  expect(partOne(inputToArray("11.test.txt"))).toBe(1656);
  expect(partOne(inputToArray("11.txt"))).toBe(1743);
});

test("Dumbo Octopus: Part Two", () => {
  expect(partTwo(inputToArray("11.test.txt"))).toBe(195);
  expect(partTwo(inputToArray("11.txt"))).toBe(364);
});
