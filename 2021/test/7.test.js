const { main } = require("../dist/7.js");
const { inputToArray } = require("../dist/utils");

const sample = [16, 1, 2, 0, 4, 2, 7, 1, 2, 14];

test("finds minimum fuel spend to align all crab submarines", () => {
  expect(main(sample)).toBe(37);
  expect(main(inputToArray("7.txt", 1, ",").map((num) => parseInt(num)))).toBe(
    336120
  );
});

test("finds minimum fuel spend to align all crab submarines in sport mode", () => {
  expect(main(sample, "sport")).toBe(168);
  expect(
    main(
      inputToArray("7.txt", 1, ",").map((num) => parseInt(num)),
      "sport"
    )
  ).toBe(96864235);
});
