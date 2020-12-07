const { inputToArray } = require("../dist/utils");
const { countBagsThatCanHoldMyBag } = require("../dist/7");

test("Count sample bags that can hold my shiny gold bag", () => {
  expect(
    countBagsThatCanHoldMyBag(inputToArray("../inputs/7.sample.txt"))
  ).toBe(4);
});

test("Count actual bags that can hold my shiny gold bag", () => {
  expect(countBagsThatCanHoldMyBag(inputToArray("../inputs/7.txt"))).toBe(257);
});
