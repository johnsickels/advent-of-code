// import { inputToArray } from "./utils";

export const main = (
  array: string[],
  size: number,
  diagonals = false
): number => {
  // parse
  const coords = array.map((line) => {
    const lineArr = line
      .replace(" -> ", ",")
      .split(",")
      .map((str) => parseInt(str));
    return { x1: lineArr[0], y1: lineArr[1], x2: lineArr[2], y2: lineArr[3] };
  });

  // new 2d array
  const diagram = [...Array(size)].map(() => Array(size).fill(0));

  coords.forEach(({ x1, y1, x2, y2 }) => {
    // draw vertical lines
    if (x1 === x2) {
      const x = x1;
      const ys = [y1, y2].sort((a, b) => a - b);
      for (let y = ys[0]; y <= ys[1]; y++) {
        diagram[y][x]++;
      }
    }

    // draw horizontal lines
    if (y1 === y2) {
      const y = y1;
      const xs = [x1, x2].sort((a, b) => a - b);
      for (let x = xs[0]; x <= xs[1]; x++) {
        diagram[y][x]++;
      }
    }

    // draw diagonal lines
    if (diagonals) {
      const lineLen = Math.abs(x1 - x2);
      if (x1 > x2 && y1 > y2) {
        let i = 0;
        let x = x1;
        let y = y1;
        while (i <= lineLen) {
          diagram[y][x]++;
          i++;
          x--;
          y--;
        }
      }
      if (x1 > x2 && y1 < y2) {
        let i = 0;
        let x = x1;
        let y = y1;
        while (i <= lineLen) {
          diagram[y][x]++;
          i++;
          x--;
          y++;
        }
      }
      if (x1 < x2 && y1 > y2) {
        let i = 0;
        let x = x1;
        let y = y1;
        while (i <= lineLen) {
          diagram[y][x]++;
          i++;
          x++;
          y--;
        }
      }
      if (x1 < x2 && y1 < y2) {
        let i = 0;
        let x = x1;
        let y = y1;
        while (i <= lineLen) {
          diagram[y][x]++;
          i++;
          x++;
          y++;
        }
      }
    }
  });

  // flatten 2d array
  const diagramString = diagram
    .map((line) => line.join(""))
    .join("")
    .split("");

  // count overlaps
  let overlaps = 0;
  for (const point of diagramString) {
    if (parseInt(point) > 1) {
      overlaps++;
    }
  }

  return overlaps;
};

// console.log(main(inputToArray("5.test.txt"), 10, true));
// console.log(main(inputToArray("5.txt"), 1000, true));
