// import { inputToArray } from "../utils";

// const rows = inputToArray("3.txt");

export const treeCounter = (
  array: string[],
  right: number,
  down: number
): number => {
  let x = 0;
  let y = 0;
  let trees = 0;

  while (y < array.length - 1) {
    x += right;
    x = x % array[y].length;
    y += down;
    const pos = array[y][x];

    if (pos === "#") {
      trees++;
    }
  }
  return trees;
};

export const slopeTreeProduct = (
  rows: string[],
  slopes: number[][]
): number => {
  return slopes.reduce((acc, cur) => {
    return acc * treeCounter(rows, cur[0], cur[1]);
  }, 1);
};

// console.log(treeCounter(rows, 3, 1));
// console.log(
//   slopeTreeProduct(rows, [
//     [1, 1],
//     [3, 1],
//     [5, 1],
//     [7, 1],
//     [1, 2],
//   ])
// );
