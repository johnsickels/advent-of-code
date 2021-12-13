import { writeFileSync } from "fs";

const parseCoords = (str: string): number[] =>
  str.split(",").map((s) => parseInt(s));

const parseFold = (str: string): [string, number] => {
  const dirVal = str.split(" ")[2];
  const splitStr = dirVal.split("=");
  const dir = splitStr[0];
  const val = parseInt(splitStr[1]);
  return [dir, val];
};

const make2DArray = (maxX: number, maxY: number) =>
  [...Array(maxY)].map(() => Array(maxX).fill("."));

const findMaxes = (coords: string[]) => {
  let maxX = 0;
  let maxY = 0;
  coords.forEach((coord) => {
    const [x, y] = coord.split(",").map((s) => parseInt(s));
    if (x > maxX) {
      maxX = x;
    }
    if (y > maxY) {
      maxY = y;
    }
  });
  // zero indexed coordinates
  return [maxX + 1, maxY + 1];
};

const markPaper = (paper: string[][], coords: string[]) => {
  coords.forEach((coord) => {
    const [x, y] = parseCoords(coord);
    paper[y][x] = "#";
  });
  return paper;
};

const foldPaper = (paper: string[][], fold: string) => {
  const [dir, val] = parseFold(fold);
  if (dir === "y") {
    for (let y = paper.length - 1; y > val; y--) {
      for (let x = 0; x < paper[y].length; x++) {
        if (paper[y][x] === "#") {
          // mirror math
          paper[val * 2 - y][x] = "#";
        }
      }
    }
    // take off folded rows
    paper.splice(val);
  }
  if (dir === "x") {
    for (let y = 0; y < paper.length; y++) {
      for (let x = paper[y].length - 1; x > val; x--) {
        if (paper[y][x] === "#") {
          // mirror math
          paper[y][val * 2 - x] = "#";
        }
        if (x === val + 1) {
          // take off folder columns
          paper[y].splice(val);
        }
      }
    }
  }
  return paper;
};

const countDots = (paper: string[][]): number => {
  let dots = 0;
  paper.forEach((row) => {
    row.forEach((point) => {
      if (point === "#") {
        dots++;
      }
    });
  });
  return dots;
};

export const main = (input: string[]): number => {
  const coords = input[0].split("\n");
  const folds = input[1].split("\n");

  // make appropriately sized paper
  const [maxX, maxY] = findMaxes(coords);
  let paper = make2DArray(maxX, maxY);

  // mark beginning dots
  paper = markPaper(paper, coords);

  let dotsAfterFirstFold;

  folds.forEach((fold, i) => {
    paper = foldPaper(paper, fold);
    if (i === 0) {
      dotsAfterFirstFold = countDots(paper);
    }
  });

  // write after final fold to reveal code
  writeFileSync("after.txt", paper.map((row) => row.join("")).join("\n"));

  return dotsAfterFirstFold;
};
