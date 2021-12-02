const { partOne, partTwo } = require("../dist/2/index.js");
const { inputToArray } = require("../dist/utils");

test("finds product of the horizontal position and depth you would have after following the planned course", () => {
  expect(partOne(inputToArray("2.txt"))).toBe(2039256);
  expect(partOne(["forward 5", "down 5", "forward 8", "up 3", "down 8", "forward 2"])).toBe(150);
});

test("finds product of the horizontal position and depth you would have after following the planned course, corrected with aim", () => {
  expect(partTwo(inputToArray("2.txt"))).toBe(1856459736);
  expect(partTwo(["forward 5", "down 5", "forward 8", "up 3", "down 8", "forward 2"])).toBe(900);
});
