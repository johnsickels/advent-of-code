// import { inputToArray } from "../utils";

export const partOne = (array: string[]): number => {
  let x = 0;
  let y = 0;
  for (const instruction of array) {
    const lineArr = instruction.split(" ");
    const direction = lineArr[0];
    const value = parseInt(lineArr[1]);
    // console.log(direction, value);
    switch (direction) {
      case "forward":
        x += value;
        break;
      case "up":
        y -= value;
        break;
      case "down":
        y += value;
        break;
      default:
        break;
    }
  }
  return x * y;
};

// partOne(inputToArray("2.txt"));
