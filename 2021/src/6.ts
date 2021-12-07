// import { inputToArray } from "./utils";

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

// console.log(
//   partOne(
//     inputToArray("6.txt", 1, ",").map((num) => parseInt(num)),
//     80
//   )
// );
