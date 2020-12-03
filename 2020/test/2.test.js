const { countValidPasswords } = require("../dist/2");

test("counts the number of valid passwords, part one", () => {
  expect(
    countValidPasswords(["1-3 a: abcde", "1-3 b: cdefg", "2-9 c: ccccccccc"])
      .partOne
  ).toBe(2);
  expect(
    countValidPasswords([
      "10-20 a: abcde",
      "10-30 b: cdefg",
      "20-90 c: ccccccccc",
    ]).partOne
  ).toBe(0);
  expect(
    countValidPasswords(["0-20 a: abcde", "0-30 b: cdefg", "0-90 c: ccccccccc"])
      .partOne
  ).toBe(3);
});

test("counts the number of valid passwords, part two", () => {
  expect(
    countValidPasswords(["1-3 a: abcde", "1-3 b: cdefg", "2-9 c: ccccccccc"])
      .partTwo
  ).toBe(1);
  expect(
    countValidPasswords([
      "10-20 a: abcde",
      "10-30 b: cdefg",
      "20-90 c: ccccccccc",
    ]).partTwo
  ).toBe(0);
  expect(
    countValidPasswords(["1-2 a: aacde", "1-3 b: bdbfg", "2-4 c: ccccccccc"])
      .partTwo
  ).toBe(0);
  expect(
    countValidPasswords(["1-2 a: abcde", "1-3 b: bdcfg", "2-4 c: cccdccccc"])
      .partTwo
  ).toBe(3);
});
