// import { inputToArray } from "../utils";
// const instructions = inputToArray("8.txt");

interface handheldOutput {
  accumulator: number;
  isInfinite: boolean;
}

export const findAccumulatorAtInfiniteLoop = (
  input: string[],
  positionOfOperationToChange?: number
): handheldOutput => {
  let accumulator = 0;
  let position = 0;
  const positionHistory: number[] = [];

  do {
    const instruction = input[position].split(" ");
    let operation = instruction[0];
    const argument = parseInt(instruction[1]);

    positionHistory.push(position);

    if (positionOfOperationToChange === position) {
      switch (operation) {
        case "nop":
          operation = "jmp";
          break;
        case "jmp":
          operation = "nop";
          break;
        default:
          break;
      }
    }

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
  } while (!positionHistory.includes(position) && position < input.length);
  const isInfinite = positionHistory.includes(position);
  return { accumulator: accumulator, isInfinite: isInfinite };
};

export const findAccumulatorAtFixedProgram = (input: string[]): number => {
  for (let i = 0; i < input.length; i++) {
    const results = findAccumulatorAtInfiniteLoop(input, i);
    if (results.isInfinite === false) {
      return results.accumulator;
    }
  }
};

// console.log(findAccumulatorAtInfiniteLoop(instructions));
// console.log(findAccumulatorAtFixedProgram(instructions));
