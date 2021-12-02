const { partOne } = require("../dist/2/index.js");
const { inputToArray } = require("../dist/utils");

test("finds product of the horizontal position and depth you would have after following the planned course", () => {
  expect(partOne(inputToArray("2.txt"))).toBe(2039256);
  expect(partOne(["forward 5", "down 5", "forward 8", "up 3", "down 8", "forward 2"])).toBe(150);
});

// test("finds the three window measurements larger than the previous measurement", () => {
//     expect(partTwo(inputToArray("1.txt").map((e) => parseInt(e)))).toBe(1150);
// });
