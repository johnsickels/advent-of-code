const { inputToArray } = require("../dist/utils");
const {
  findAccumulatorAtInfiniteLoop,
  findAccumulatorAtFixedProgram,
} = require("../dist/8");

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
    ]).accumulator
  ).toBe(5);
});

test("Find actual accumulator value when the program enters the infinite loop", () => {
  expect(
    findAccumulatorAtInfiniteLoop(inputToArray("../inputs/8.txt")).accumulator
  ).toBe(1930);
});

test("Find sample accumulator value when the program is fixed", () => {
  expect(
    findAccumulatorAtFixedProgram([
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
  ).toBe(8);
});

test("Find actual accumulator value when the program is fixed", () => {
  expect(findAccumulatorAtFixedProgram(inputToArray("../inputs/8.txt"))).toBe(
    1688
  );
});
