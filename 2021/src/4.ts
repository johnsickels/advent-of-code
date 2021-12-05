// import { inputToArray } from "./utils";

type Row = (number | string)[];
type Board = Row[];

export const partOne = (array: string[]): number => {
  const draws = array[0].split(",").map((draw) => parseInt(draw));
  const boards: Board[] = [];

  // make 2D arrays
  for (let i = 2; i < array.length; i += 6) {
    boards.push(
      array.slice(i, i + 5).map((row) => {
        return row
          .trim()
          .split(/\s+/)
          .map((digit) => parseInt(digit));
      })
    );
  }

  // draw numbers
  for (const draw of draws) {
    // strike each draw with an x in every board
    strikeBoards(boards, draw);

    // check each board for a win
    const winningBoard = checkForAWin(boards);
    if (winningBoard && winningBoard.length) {
      const sum = getSumOfRemaingNumbers(winningBoard);
      return sum * draw;
    }
  }
};

const strikeBoards = (boards: Board[], draw: number) => {
  // the worst triple loop ever
  boards.forEach((board) => {
    board.forEach((row) => {
      row.forEach((num, i) => {
        if (num === draw) {
          row[i] = "x";
        }
      });
    });
  });
};

const checkForAWin = (boards: Board[]) => {
  // check rows
  for (const board of boards) {
    for (const row of board) {
      // if no nums ( all exes )
      if (!row.some((num) => Number.isInteger(num))) {
        return board;
      }
    }
    // check columns
    for (let i = 0; i < 5; i++) {
      let exes = 0;
      for (let j = 0; j < 5; j++) {
        if (board[j][i] === "x") {
          exes++;
        }
      }

      // if entire column is exes
      if (exes === 5) {
        return board;
      }
    }
  }
};

const getSumOfRemaingNumbers = (board: Board): number => {
  let sum = 0;
  for (const row of board) {
    for (const num of row) {
      if (Number.isInteger(num)) {
        sum += num as number;
      }
    }
  }
  return sum;
};

// console.log(partOne(inputToArray("4.txt")));
