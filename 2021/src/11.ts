type Cave = number[][];

// make a 2D array cave system
const getCaveMap = (lines: string[]): Cave =>
  lines.map((line) => line.split("").map((num) => parseInt(num)));

// increase energy for position and all neighbors if we hit ten, recursively
const increaseEnergy = (x: number, y: number, caveMap: Cave) => {
  caveMap[y][x] = ++caveMap[y][x];

  // if hitting ten, but not over since we already flashed for you
  if (caveMap[y][x] === 10) {
    // up
    if (caveMap[y + 1] && Number.isInteger(caveMap[y + 1][x])) {
      caveMap = increaseEnergy(x, y + 1, caveMap);
    }
    // top right
    if (caveMap[y + 1] && Number.isInteger(caveMap[y + 1][x + 1])) {
      caveMap = increaseEnergy(x + 1, y + 1, caveMap);
    }
    // right
    if (Number.isInteger(caveMap[y][x + 1])) {
      caveMap = increaseEnergy(x + 1, y, caveMap);
    }
    // bottom right
    if (caveMap[y - 1] && Number.isInteger(caveMap[y - 1][x + 1])) {
      caveMap = increaseEnergy(x + 1, y - 1, caveMap);
    }
    // bottom
    if (caveMap[y - 1] && Number.isInteger(caveMap[y - 1][x])) {
      caveMap = increaseEnergy(x, y - 1, caveMap);
    }
    // bottom left
    if (caveMap[y - 1] && Number.isInteger(caveMap[y - 1][x - 1])) {
      caveMap = increaseEnergy(x - 1, y - 1, caveMap);
    }
    // left
    if (Number.isInteger(caveMap[y][x - 1])) {
      caveMap = increaseEnergy(x - 1, y, caveMap);
    }
    // top left
    if (caveMap[y + 1] && Number.isInteger(caveMap[y + 1][x - 1])) {
      caveMap = increaseEnergy(x - 1, y + 1, caveMap);
    }
  }
  return caveMap;
};

// increase energy for all octopi per step
const step = (caveMap: Cave): Cave => {
  for (let y = 0; y < caveMap.length; y++) {
    for (let x = 0; x < caveMap[y].length; x++) {
      caveMap = increaseEnergy(x, y, caveMap);
    }
  }
  return caveMap;
};

// if we hit ten, flash and reset
const flash = (caveMap: Cave): [Cave, number] => {
  let flashes = 0;
  for (let y = 0; y < caveMap.length; y++) {
    for (let x = 0; x < caveMap[y].length; x++) {
      if (caveMap[y][x] > 9) {
        flashes++;
        caveMap[y][x] = 0;
      }
    }
  }
  return [caveMap, flashes];
};

// count flashes for 100 steps
export const partOne = (input: string[]): number => {
  let caveMap = getCaveMap(input);
  let flashes = 0;

  for (let i = 0; i < 100; i++) {
    caveMap = step(caveMap);
    const [newCaveMap, newFlashes] = flash(caveMap);
    caveMap = newCaveMap;
    flashes += newFlashes;
  }
  return flashes;
};

// find synchronization step where everybody flashes in one step
export const partTwo = (input: string[]): number => {
  let caveMap = getCaveMap(input);
  const octopiPopulation = caveMap.reduce(
    (acc: number, cur: number[]) => acc + cur.length,
    0
  );

  for (let i = 0; ; i++) {
    caveMap = step(caveMap);
    const [newCaveMap, newFlashes] = flash(caveMap);
    caveMap = newCaveMap;

    if (newFlashes === octopiPopulation) return i + 1;
  }
};
