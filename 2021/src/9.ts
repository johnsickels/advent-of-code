interface Point {
  riskLevel: number;
  visited: boolean;
}

interface LowPoint {
  x: number;
  y: number;
  val: number;
}

const findLowestFromPoint = (
  x: number,
  y: number,
  map: Point[][]
): LowPoint => {
  // don't retrace steps
  if (map[y][x].visited) return;
  map[y][x].visited = true;

  // gather comparison values
  const val = map[y][x].riskLevel;
  const up = map[y + 1] && map[y + 1][x] && map[y + 1][x].riskLevel;
  const down = map[y - 1] && map[y - 1][x] && map[y - 1][x].riskLevel;
  const right = map[y][x + 1] && map[y][x + 1].riskLevel;
  const left = map[y][x - 1] && map[y][x - 1].riskLevel;

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

  // disregard wall points
  const validPositions = [val, up, down, left, right].filter((pos) =>
    Number.isInteger(pos)
  );

  // if all equal, we are on a plateau
  if (validPositions.every((p) => validPositions[0] === p)) {
    return;
  }

  // this is a low point
  return { x, y, val };
};

export const partOne = (input: string[]): number => {
  // make a 2D array cave system
  const map: Point[][] = input.map((line) =>
    line.split("").map((num) => {
      // add one to value for risk level
      return { riskLevel: parseInt(num) + 1, visited: false };
    })
  );

  const lowPoints = [];

  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      const lowestPoint = findLowestFromPoint(x, y, map);
      if (lowestPoint) {
        lowPoints.push(lowestPoint);
      }
    }
  }

  return lowPoints.map((lowPoint) => lowPoint.val).reduce((a, b) => a + b, 0);
};
