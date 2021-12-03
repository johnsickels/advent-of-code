const { partOne, partTwo } = require("../dist/1.js");
const { inputToArray } = require("../dist/utils");

test("finds the measurements larger than the previous measurement", () => {
    expect(partOne(inputToArray("1.txt").map((e) => parseInt(e)))).toBe(1215);
});


test("finds the three window measurements larger than the previous measurement", () => {
    expect(partTwo(inputToArray("1.txt").map((e) => parseInt(e)))).toBe(1150);
});