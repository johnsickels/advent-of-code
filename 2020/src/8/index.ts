// import { inputToArray } from "../utils";
// const instructions = inputToArray("8.txt");

export const findAccumulatorAtInfiniteLoop = (input: string[]): number => {
  let accumulator = 0;
  let position = 0;
  const positionHistory: number[] = [];

  do {
    const instruction = input[position].split(" ");
    const operation = instruction[0];
    const argument = parseInt(instruction[1]);

    positionHistory.push(position);

    switch (operation) {
      case "acc":
        accumulator += argument;
        position++;
        break;
      case "jmp":
        position += argument;
        break;
      case "nop":
        position++;
        break;

      default:
        console.error(
          `404: Operation (${operation}) not found. Accumulator: ${accumulator}`
        );
        break;
    }
  } while (!positionHistory.includes(position));
  return accumulator;
};

// console.log(findAccumulatorAtInfiniteLoop(instructions));
