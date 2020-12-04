const { inputToPassportObjects, validPassportCounter } = require("../dist/4");

test("Count the valid passports", () => {
  const passports = inputToPassportObjects("../inputs/4.test.txt");
  expect(validPassportCounter(passports)).toBe(2);
});
