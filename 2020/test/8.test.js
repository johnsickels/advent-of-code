const { inputToArray } = require("../dist/utils");
const { findAccumulatorAtInfiniteLoop } = require("../dist/8");

test("Find sample accumulator value when the program enters the infinite loop", () => {
  expect(
    findAccumulatorAtInfiniteLoop([
      "nop +0",
      "acc +1",
      "jmp +4",
      "acc +3",
      "jmp -3",
      "acc -99",
      "acc +1",
      "jmp -4",
      "acc +6",
    ])
  ).toBe(5);
});

test("Find actual accumulator value when the program enters the infinite loop", () => {
  expect(findAccumulatorAtInfiniteLoop(inputToArray("../inputs/8.txt"))).toBe(
    1930
  );
});
