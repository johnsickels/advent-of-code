const { partOne } = require("../dist/3.js");
const { inputToArray } = require("../dist/utils");

test("finds the power consumption of the submarine", () => {
  expect(partOne(inputToArray("3.txt"))).toBe(3309596);
  expect(
    partOne([
      "00100",
      "11110",
      "10110",
      "10111",
      "10101",
      "01111",
      "00111",
      "11100",
      "10000",
      "11001",
      "00010",
      "01010",
    ])
  ).toBe(198);
});
