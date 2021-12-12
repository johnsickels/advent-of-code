const { main } = require("../dist/12.js");
const { inputToArray } = require("../dist/utils");

test("Passage Pathing: Part One", () => {
  expect(main(inputToArray("12.test1.txt"))).toBe(10);
  expect(main(inputToArray("12.test2.txt"))).toBe(19);
  expect(main(inputToArray("12.test3.txt"))).toBe(226);
  expect(main(inputToArray("12.txt"))).toBe(3230);
});

test("Passage Pathing: Part Two", () => {
  expect(main(inputToArray("12.test1.txt"), true)).toBe(36);
  expect(main(inputToArray("12.test2.txt"), true)).toBe(103);
  expect(main(inputToArray("12.test3.txt"), true)).toBe(3509);
  expect(main(inputToArray("12.txt"), true)).toBe(83475);
});
