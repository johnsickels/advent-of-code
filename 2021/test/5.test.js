const { partOne } = require("../dist/5.js");
const { inputToArray } = require("../dist/utils");

test("finds the horizontal and vertical overlaps", () => {
  expect(partOne(inputToArray("5.txt"), 1000)).toBe(5147);
  expect(partOne(inputToArray("5.test.txt"), 10)).toBe(5);
});

// test("give squid the game", () => {
//   expect(partTwo(inputToArray("4.txt"))).toBe(6804);
//   expect(partTwo(inputToArray("4.test.txt"))).toBe(1924);
// });
