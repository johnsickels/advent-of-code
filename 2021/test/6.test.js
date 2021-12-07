const { partOne } = require("../dist/6.js");
const { inputToArray } = require("../dist/utils");

const sample = [3, 4, 3, 1, 2];

test("finds the lanternfish population", () => {
  expect(partOne(sample, 80)).toBe(5934);
  expect(
    partOne(
      inputToArray("6.txt", 1, ",").map((num) => parseInt(num)),
      80
    )
  ).toBe(350149);
});
