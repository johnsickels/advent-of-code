const one = require("../dist/1/index.js");

test("finds the product of the two numbers which sum is 2020", () => {
  expect(one([0, 2020, 1, 2, 3])).toBe(0);
  expect(one([1010, 1010, 1, 2, 3])).toBe(1020100);
  expect(one([1, 2, 3, 4, 2019])).toBe(2019);
  expect(one([0, "null", 1, 2, 3])).toBe(undefined);
});
