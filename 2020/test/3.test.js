const { treeCounter, slopeTreeProduct } = require("../dist/3");

test("Count the number of trees you hit down the slopes", () => {
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

test("Find the product of trees hit on each slope", () => {
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
