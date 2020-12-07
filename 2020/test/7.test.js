const { inputToArray } = require("../dist/utils");
const { countBagsThatCanHoldMyBag, countBagsInMyBag } = require("../dist/7");

test("Count sample bags that can hold my shiny gold bag", () => {
  expect(
    countBagsThatCanHoldMyBag(inputToArray("../inputs/7.sample.txt"))
  ).toBe(4);
});

test("Count actual bags that can hold my shiny gold bag", () => {
  expect(countBagsThatCanHoldMyBag(inputToArray("../inputs/7.txt"))).toBe(257);
});

test("Count sample bags inside my shiny gold bag", () => {
  expect(countBagsInMyBag(inputToArray("../inputs/7.sample.txt"))).toBe(32);
  expect(countBagsInMyBag(inputToArray("../inputs/7.sample.2.txt"))).toBe(126);
});

test("Count actual bags inside my shiny gold bag", () => {
  expect(countBagsInMyBag(inputToArray("../inputs/7.txt"))).toBe(1038);
});
