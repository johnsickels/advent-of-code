const { partOne, partTwo } = require("../dist/8.js");
const { inputToArray } = require("../dist/utils");

test("Seven Segment Search: Part One", () => {
  expect(partOne(inputToArray("8.test.txt"))).toBe(26);
  expect(partOne(inputToArray("8.txt"))).toBe(456);
});

test("Seven Segment Search: Part Two", () => {
    expect(partTwo(inputToArray("8.test.txt"))).toBe(61229);
    expect(partTwo(inputToArray("8.txt"))).toBe(1091609);
  });
