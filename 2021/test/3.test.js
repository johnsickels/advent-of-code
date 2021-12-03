const { partOne, partTwo } = require("../dist/3.js");
const { inputToArray } = require("../dist/utils");

const exampleReport = [
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
];

test("finds the power consumption of the submarine", () => {
  expect(partOne(inputToArray("3.txt"))).toBe(3309596);
  expect(partOne(exampleReport)).toBe(198);
});

test("finds the life support rating of the submarine", () => {
  expect(partTwo(inputToArray("3.txt"))).toBe(2981085);
  expect(partTwo(exampleReport)).toBe(230);
});
