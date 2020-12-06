const { inputToArray } = require("../dist/utils");
const {
  highestSeatID,
  missingSeatID,
  boardingPassToSeatID,
} = require("../dist/5");

test("Get the seatID from boarding pass string", () => {
  expect(boardingPassToSeatID("FBFBBFFRLR")).toBe(357);
  expect(boardingPassToSeatID("BFFFBBFRRR")).toBe(567);
  expect(boardingPassToSeatID("FFFBBBFRRR")).toBe(119);
  expect(boardingPassToSeatID("BBFFBBFRLL")).toBe(820);
});

test("Get the highest seat ID", () => {
  const boardingPasses = inputToArray("../inputs/5.txt");

  expect(highestSeatID(boardingPasses)).toBe(842);
});

test("Get the missing seat ID", () => {
  const boardingPasses = inputToArray("../inputs/5.txt");

  expect(missingSeatID(boardingPasses)).toBe(617);
});
