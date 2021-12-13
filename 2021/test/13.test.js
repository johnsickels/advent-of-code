const { main } = require("../dist/13.js");
const { inputToArray } = require("../dist/utils");

test("Passage Pathing: Part One", () => {
  expect(main(inputToArray("13.test.txt", 2))).toBe(17);
  expect(main(inputToArray("13.txt", 2))).toBe(602);
});
