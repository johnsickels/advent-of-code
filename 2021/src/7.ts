export const partOne = (array: number[]): number => {
  // get sum to find average position
  const sum = array.reduce((a, b) => a + b, 0);

  // get spend at middle point and +/- 1
  const averagePos = Math.round(sum / array.length) || 0;
  const averageSpend = findFuelSpend(array, averagePos);
  let upPos = averagePos + 1;
  let upSpend = findFuelSpend(array, averagePos + 1);
  let downPos = averagePos - 1;
  let downSpend = findFuelSpend(array, averagePos - 1);

  // determine direction
  let dir: string;

  if (upSpend < averageSpend) {
    dir = "up";
  } else if (downSpend < averageSpend) {
    dir = "down";
  } else {
    return averageSpend;
  }

  // go in that direction and find minimum spend
  let minimumSpend = Infinity;

  if (dir === "up") {
    while (minimumSpend > upSpend) {
      minimumSpend = upSpend;
      upSpend = findFuelSpend(array, ++upPos);
    }
    return upSpend;
  }

  if (dir === "down") {
    while (minimumSpend > downSpend) {
      minimumSpend = downSpend;
      downSpend = findFuelSpend(array, --downPos);
    }
    return minimumSpend;
  }
};

const findFuelSpend = (positions: number[], target: number) => {
  return positions.reduce((prev, curr) => prev + Math.abs(curr - target), 0);
};
