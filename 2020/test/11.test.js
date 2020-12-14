const { inputToArray } = require("../dist/utils");
const { sitDown } = require("../dist/11");

test("Find the number of seats occupied after the choas stabilizes", () => {
  expect(sitDown(inputToArray("11.txt"))).toBe(2481);
});

test("Find the number of sample seats occupied after the choas stabilizes", () => {
  expect(sitDown(inputToArray("11.sample.txt"))).toBe(37);
});
