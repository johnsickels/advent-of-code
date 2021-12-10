import { inputToArray } from "./utils";

const findLowestFromPoint = (x: number, y: number, map: number[][]): string => {
  const val = map[y][x];
  const up = map[y + 1] && map[y + 1][x];
  const down = map[y - 1] && map[y - 1][x];
  const right = map[y][x + 1];
  const left = map[y][x - 1];

  //   console.log({ x, y, val });

//   if (!up || !down || !left || !right) return;
//   if ((val === up) && (val === down)&&(val === left)&&(val === right)) return;
  //   if()

  // check up and down
  if (down < val) {
    return findLowestFromPoint(x, y - 1, map);
  }
  if (up < val) {
    return findLowestFromPoint(x, y + 1, map);
  }
  // check left and right
  if (left < val) {
    return findLowestFromPoint(x - 1, y, map);
  }
  if (right < val) {
    return findLowestFromPoint(x + 1, y, map);
  }

  //   if(val === )

  console.log("low point", { x, y, val });

  return JSON.stringify({ x, y, val });
  // if nothing has changed, return {val, x, y}
};

export const partOne = (input: string[]): number => {
  const map = input.map((line) => line.split("").map((num) => parseInt(num)));
  const lowPoints = new Set();
  //   console.log(map);
  for (let y = 0; y < map.length; y++) {
    // map[x];
    for (let x = 0; x < map[y].length; x++) {
      //   const val = map[y][x];
      //   console.log({ x, y, val });
      const lowestPoint = findLowestFromPoint(x, y, map);
      if (lowestPoint) {
        lowPoints.add(lowestPoint);
      }
    }
  }
  console.log(lowPoints);

  // map +1 and reduce to sum
  return (Array.from(lowPoints) as string[])
    .map((stringyObj) => ++JSON.parse(stringyObj).val)
    .reduce((a, b) => a + b, 0);
};

console.log(partOne(inputToArray("9.test.txt")));
