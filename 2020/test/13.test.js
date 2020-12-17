const { inputToArray } = require("../dist/utils");
const { anotherOneRidesTheBus } = require("../dist/13");
const notes = ["939", "7,13,x,x,59,x,31,19"];

test("Find the ID of the earliest sample bus you can take to the airport multiplied by the number of minutes you'll need to wait for that bus", () => {
  expect(anotherOneRidesTheBus(notes)).toBe(295);
});

test("Find the ID of the earliest bus you can take to the airport multiplied by the number of minutes you'll need to wait for that bus", () => {
  expect(anotherOneRidesTheBus(inputToArray("13.txt"))).toBe(2165);
});
