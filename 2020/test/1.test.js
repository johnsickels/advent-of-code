const { partOne, partTwo } = require("../dist/1/index.js");
const { inputToArray } = require("../dist/utils");

test("finds the sample product of the two numbers which sum is 2020", () => {
  expect(partOne([1721, 979, 366, 299, 675, 1456])).toBe(514579);
  expect(partOne([0, 2020, 1, 2, 3])).toBe(0);
  expect(partOne([1010, 1010, 1, 2, 3])).toBe(1020100);
  expect(partOne([1, 2, 3, 4, 2019])).toBe(2019);
  expect(partOne([0, "null", 1, 2, 3])).toBe(undefined);
});

test("finds the sample product of the three numbers which sum is 2020", () => {
  expect(partTwo([1721, 979, 366, 299, 675, 1456])).toBe(241861950);
  expect(partTwo([0, 2019, 1, 2, 3])).toBe(0);
  expect(partTwo([1010, 1009, 1, 2, 3])).toBe(1019090);
  expect(partTwo([1, 2, 3, 4, 2017])).toBe(4034);
  expect(partTwo([0, "null", 1, 2, 3])).toBe(undefined);
});

test("finds the actual product of the two numbers which sum is 2020", () => {
  expect(partOne(inputToArray("1.txt").map((e) => parseInt(e)))).toBe(445536);
});

test("finds the actual product of the three numbers which sum is 2020", () => {
  expect(partTwo(inputToArray("1.txt").map((e) => parseInt(e)))).toBe(
    138688160
  );
});
