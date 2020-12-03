const { treeCounter } = require("../dist/3");

test("Count the number of trees you hit down the slopes", () => {
  expect(
    treeCounter([
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
    ])
  ).toBe(7);
});
