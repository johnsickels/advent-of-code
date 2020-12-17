const { inputToArray } = require("../dist/utils");
const { goTheDistance } = require("../dist/12");
const directions = ["F10", "N3", "F7", "R90", "F11"];

test("Find the sample Manhattan distance between the destination and the ship's starting position", () => {
  expect(goTheDistance(directions)).toBe(25);
});

test("Find the Manhattan distance between the destination and the ship's starting position", () => {
  expect(goTheDistance(inputToArray("12.txt"))).toBe(1838);
});
