const { findTicketScanningErrorRate } = require("../dist/16");
const { inputToArray } = require("../dist/utils");

const input = inputToArray("16.txt", 2);
const sampleInput = inputToArray("16.sample.txt", 2);

test("Find the ticket scanning error rate", () => {
  expect(findTicketScanningErrorRate(input)).toBe(23122);
});

test("Find the sample ticket scanning error rate", () => {
  expect(findTicketScanningErrorRate(sampleInput)).toBe(71);
});
