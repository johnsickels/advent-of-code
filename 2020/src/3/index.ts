import { inputToArray } from "../utils";

const rows = inputToArray("3.txt");

export const treeCounter = (array: string[]) => {
  let x = 0;
  let y = 0;
  let trees = 0;
  const right = 3;
  const down = 1;

  while (y < array.length - 1) {
    x += right;
    x = x % array[y].length;
    y += down;
    let pos = array[y][x];

    if (pos === "#") {
      trees++;
    }
  }
  return trees;
};

// console.log(treeCounter(rows));
