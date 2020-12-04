const { treeCounter, slopeTreeProduct } = require("../dist/3");
const { inputToArray } = require("../dist/utils");

test("Count the number of sample trees you hit down the slopes", () => {
  expect(
    treeCounter(
      [
        "..##.......",
        "#...#...#..",
        ".#....#..#.",
        "..#.#...#.#",
        ".#...##..#.",
        "..#.##.....",
        ".#.#.#....#",
        ".#........#",
        "#.##...#...",
        "#...##....#",
        ".#..#...#.#",
      ],
      3,
      1
    )
  ).toBe(7);
});

test("Find the product of sample trees hit on each slope", () => {
  expect(
    slopeTreeProduct(
      [
        "..##.......",
        "#...#...#..",
        ".#....#..#.",
        "..#.#...#.#",
        ".#...##..#.",
        "..#.##.....",
        ".#.#.#....#",
        ".#........#",
        "#.##...#...",
        "#...##....#",
        ".#..#...#.#",
      ],
      [
        [1, 1],
        [3, 1],
        [5, 1],
        [7, 1],
        [1, 2],
      ]
    )
  ).toBe(336);
});

test("Count the number of actual trees you hit down the slopes", () => {
  expect(treeCounter(inputToArray("../inputs/3.txt"), 3, 1)).toBe(164);
});

test("Find the product of actual trees hit on each slope", () => {
  expect(
    slopeTreeProduct(inputToArray("../inputs/3.txt"), [
      [1, 1],
      [3, 1],
      [5, 1],
      [7, 1],
      [1, 2],
    ])
  ).toBe(5007658656);
});
