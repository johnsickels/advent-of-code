export const partOne = (
  array: number[],
  days: number,
  currentDay = 0
): number => {
  if (currentDay === days) {
    return array.length;
  }
  let newborns = 0;
  for (let j = 0; j < array.length; j++) {
    array[j]--;

    if (array[j] < 0) {
      array[j] = 6;
      newborns++;
    }
  }
  return partOne(array.concat(Array(newborns).fill(8)), days, ++currentDay);
};

const regenerate = (fishAge: number, daysLeft: number): number => {
  daysLeft = daysLeft - fishAge - 1;
  return daysLeft < 0 ? 1 : regenerate(6, daysLeft) + regenerate(8, daysLeft);
};

export const partTwo = (arr: number[], days: number): number => {
  let population = 0;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const obj: { [key: string]: number } = {};

  for (const fish of arr) {
    obj[fish] = ++obj[fish] || 1;
  }

  for (const [fishAge, frequency] of Object.entries(obj)) {
    population += regenerate(parseInt(fishAge), days) * frequency;
  }

  return population;
};
