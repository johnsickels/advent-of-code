const { main } = require("../dist/14.js");
const { inputToArray } = require("../dist/utils");

test("Extended Polymerization: Part One", () => {
  expect(main(inputToArray("14.test.txt", 2), 10)).toBe(1588);
  expect(main(inputToArray("14.txt", 2), 10)).toBe(2408);
});

test("Extended Polymerization: Part Two", () => {
  expect(main(inputToArray("14.test.txt", 2), 40)).toBe(2188189693529);
  expect(main(inputToArray("14.txt", 2), 40)).toBe(2651311098752);
});
