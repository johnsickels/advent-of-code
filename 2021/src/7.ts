/**
 * day seven parts one and two
 * @param array current crab submarine positions
 * @param mode economy for part one and sport for part two
 * @returns minimum fuel spend
 */
export const main = (array: number[], mode = "economy"): number => {
  // get sum to find average position
  const sum = array.reduce((a, b) => a + b, 0);

  // get spend at middle point and +/- 1
  const averagePos = Math.round(sum / array.length) || 0;
  const averageSpend = findFuelTotalSpend(array, averagePos, mode);
  let upPos = averagePos + 1;
  let upSpend = findFuelTotalSpend(array, averagePos + 1, mode);
  let downPos = averagePos - 1;
  let downSpend = findFuelTotalSpend(array, averagePos - 1, mode);

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
      upSpend = findFuelTotalSpend(array, ++upPos, mode);
    }
    return upSpend;
  }

  if (dir === "down") {
    while (minimumSpend > downSpend) {
      minimumSpend = downSpend;
      downSpend = findFuelTotalSpend(array, --downPos, mode);
    }
    return minimumSpend;
  }
};

// find fuel spend for all crab sumarines to reach a specified target
const findFuelTotalSpend = (
  positions: number[],
  target: number,
  mode: string
) => {
  return positions.reduce((prev, curr) => {
    const fuelExpense =
      mode === "sport"
        ? findFuelSpend(Math.abs(curr - target))
        : Math.abs(curr - target);
    return prev + fuelExpense;
  }, 0);
};

// find fuel spend in sport mode 5 + 4 + 3 + 2 + 1
const findFuelSpend = (spacesToTravel: number): number => {
  let spacesTraveled = 0;
  let fuel = 0;
  while (spacesToTravel) {
    spacesTraveled++;
    fuel += spacesTraveled;
    spacesToTravel--;
  }
  return fuel;
};
