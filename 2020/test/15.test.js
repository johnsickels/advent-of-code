const { findNthNumber } = require("../dist/15");

test("Find the the 2020th number spoken", () => {
  expect(findNthNumber([0, 3, 6], 10)).toBe(0);
  expect(findNthNumber([0, 3, 6], 2020)).toBe(436);
  expect(findNthNumber([1, 3, 2], 2020)).toBe(1);
  expect(findNthNumber([2, 1, 3], 2020)).toBe(10);
  expect(findNthNumber([1, 2, 3], 2020)).toBe(27);
  expect(findNthNumber([2, 3, 1], 2020)).toBe(78);
  expect(findNthNumber([3, 2, 1], 2020)).toBe(438);
  expect(findNthNumber([3, 1, 2], 2020)).toBe(1836);
  expect(findNthNumber([0, 8, 15, 2, 12, 1, 4], 2020)).toBe(289);
});
