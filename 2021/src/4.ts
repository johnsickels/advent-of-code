// import { inputToArray } from "./utils";

type Row = (number | string)[];
type Board = Row[];

const getDraws = (rawArr: string[]) =>
  rawArr[0].split(",").map((draw) => parseInt(draw));

// make 2D arrays
const getBoards = (rawArr: string[]) => {
  const boards = [];
  for (let i = 2; i < rawArr.length; i += 6) {
    boards.push(
      rawArr.slice(i, i + 5).map((row) => {
        return row
          .trim()
          .split(/\s+/)
          .map((digit) => parseInt(digit));
      })
    );
  }
  return boards;
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
  for (let i = 0; i < boards.length; i++) {
    const board = boards[i];
    for (const row of board) {
      // if no nums ( all exes )
      if (!row.some((num) => Number.isInteger(num))) {
        return { board, i };
      }
    }
    // check columns
    for (let j = 0; j < 5; j++) {
      let exes = 0;
      for (let k = 0; k < 5; k++) {
        if (board[k][j] === "x") {
          exes++;
        }
        if (exes === 5) {
          return { board, i };
        }
      }
    }
  }
};

// i hate this global var
const checkForWins = (boards: Board[], lastWonBoard?: Board): Board => {
  // check each board for a win
  const winningBoardObj = checkForAWin(boards);
  // boards
  if (winningBoardObj) {
    lastWonBoard = boards.splice(winningBoardObj.i, 1)[0];
    // keep cheking
    return checkForWins(boards, lastWonBoard);
  }
  return lastWonBoard;
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

export const partOne = (array: string[]): number => {
  const draws = getDraws(array);
  const boards: Board[] = getBoards(array);

  // draw numbers
  for (const draw of draws) {
    // strike each draw with an x in every board
    strikeBoards(boards, draw);

    // check each board for a win
    const winningBoardObj = checkForAWin(boards);
    if (winningBoardObj) {
      const sum = getSumOfRemaingNumbers(winningBoardObj.board);
      return sum * draw;
    }
  }
};

export const partTwo = (array: string[]): number => {
  const draws = getDraws(array);
  const boards: Board[] = getBoards(array);
  //   let wins = 0;
  let lastWonBoard;

  // draw numbers
  for (const draw of draws) {
    strikeBoards(boards, draw);

    lastWonBoard = checkForWins(boards);
    if (lastWonBoard && !boards.length) {
      return getSumOfRemaingNumbers(lastWonBoard) * draw;
    }
  }
};

// console.log(partTwo(inputToArray("4.txt")));
