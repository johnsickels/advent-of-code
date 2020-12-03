import { inputToArray } from "../utils";

const entries = inputToArray("2.txt");

export const countValidPasswords = (array: string[]) => {
  let partOne = 0;
  let partTwo = 0;
  for (let i = 0; i < array.length; i++) {
    const entry = array[i];
    const dash = entry.indexOf("-");
    const space = entry.indexOf(" ");
    const colon = entry.indexOf(":");
    const min = parseInt(entry.substr(0, dash));
    const max = parseInt(entry.slice(dash + 1, space));
    const letter = entry.substr(space + 1, 1);
    const pw = entry.slice(colon + 2);

    const count = (pw.match(new RegExp(letter, "g")) || []).length;

    const isValidPt1 = count >= min && count <= max;
    if (isValidPt1) {
      partOne++;
    }

    const isValidPt2 =
      (pw[min - 1] === letter || pw[max - 1] === letter) &&
      pw[min - 1] !== pw[max - 1];
    if (isValidPt2) {
      partTwo++;
    }
  }
  return { partOne: partOne, partTwo: partTwo };
};

// console.log(countValidPasswords(entries));
