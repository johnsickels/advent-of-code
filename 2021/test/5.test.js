const { main } = require("../dist/5.js");
const { inputToArray } = require("../dist/utils");

test("finds the horizontal and vertical overlaps", () => {
  expect(main(inputToArray("5.txt"), 1000)).toBe(5147);
  expect(main(inputToArray("5.test.txt"), 10)).toBe(5);
});

test("finds all overlaps", () => {
    expect(main(inputToArray("5.txt"), 1000, true)).toBe(16925);
    expect(main(inputToArray("5.test.txt"), 10, true)).toBe(12);
  });

