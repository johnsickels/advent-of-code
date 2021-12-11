interface Point {
  riskLevel: number;
  visited: boolean;
  x: number;
  y: number;
}

const getCaveMap = (lines: string[]): Point[][] => {
  // make a 2D array cave system
  return lines.map((line, y) =>
    line.split("").map((num, x) => {
      // add one to value for risk level
      return { riskLevel: parseInt(num) + 1, visited: false, x, y };
    })
  );
};

const findLowestFromPoint = (x: number, y: number, map: Point[][]): Point => {
  // don't retrace steps
  if (map[y][x].visited) return;
  map[y][x].visited = true;

  // gather comparison values
  const riskLevel = map[y][x].riskLevel;
  const up = map[y + 1] && map[y + 1][x] && map[y + 1][x].riskLevel;
  const down = map[y - 1] && map[y - 1][x] && map[y - 1][x].riskLevel;
  const right = map[y][x + 1] && map[y][x + 1].riskLevel;
  const left = map[y][x - 1] && map[y][x - 1].riskLevel;

  // check up, down, left and right
  if (down < riskLevel) return findLowestFromPoint(x, y - 1, map);
  if (up < riskLevel) return findLowestFromPoint(x, y + 1, map);
  if (left < riskLevel) return findLowestFromPoint(x - 1, y, map);
  if (right < riskLevel) return findLowestFromPoint(x + 1, y, map);

  // disregard wall points
  const validPositions = [riskLevel, up, down, left, right].filter((pos) =>
    Number.isInteger(pos)
  );

  // if all equal, we are on a plateau
  if (validPositions.every((p) => validPositions[0] === p)) {
    return;
  }

  // this is a low point
  return { x, y, riskLevel, visited: true };
};

const findAllLowestPoints = (caveMap: Point[][]) => {
  const lowPoints = [];

  for (let y = 0; y < caveMap.length; y++) {
    for (let x = 0; x < caveMap[y].length; x++) {
      const lowestPoint = findLowestFromPoint(x, y, caveMap);
      if (lowestPoint) {
        lowPoints.push(lowestPoint);
      }
    }
  }

  return lowPoints;
};

// My first generator function
// Thank you Harold
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function* getBasinPoints(x: number, y: number, map: Point[][]): any {
  // current point value
  const cur = map[y][x].riskLevel;

  // get up down left right
  const up = map[y + 1] && map[y + 1][x] && map[y + 1][x].riskLevel;
  const down = map[y - 1] && map[y - 1][x] && map[y - 1][x].riskLevel;
  const right = map[y][x + 1] && map[y][x + 1].riskLevel;
  const left = map[y][x - 1] && map[y][x - 1].riskLevel;

  // check each
  // if larger, not null, and not peak, then
  // delegate another generator
  if (up > cur && up !== 10) yield* getBasinPoints(x, y + 1, map);
  if (down > cur && down !== 10) yield* getBasinPoints(x, y - 1, map);
  if (right > cur && right !== 10) yield* getBasinPoints(x + 1, y, map);
  if (left > cur && left !== 10) yield* getBasinPoints(x - 1, y, map);

  // if none match return basin coords as a string
  yield `${y},${x}`;
}

export const partOne = (input: string[]): number => {
  const caveMap = getCaveMap(input);
  const lowPoints = findAllLowestPoints(caveMap);
  return lowPoints
    .map((lowPoint) => lowPoint.riskLevel)
    .reduce((a, b) => a + b, 0);
};

export const partTwo = (input: string[]): number => {
  const caveMap = getCaveMap(input);
  const lowPoints = findAllLowestPoints(caveMap);

  const basinSizes = lowPoints.map(
    (point) =>
      new Set(Array.from(getBasinPoints(point.x, point.y, caveMap))).size
  );

  return basinSizes
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((acc, cur) => acc * cur, 1);
};
