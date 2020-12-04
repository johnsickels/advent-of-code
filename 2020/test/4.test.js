const {
  inputToPassportObjects,
  validPassportCounter,
  strictValidPassportCounter,
} = require("../dist/4");

test("Count the valid passports sample", () => {
  const passports = inputToPassportObjects("../inputs/4.test.txt");
  expect(validPassportCounter(passports)).toBe(2);
});

test("Count the valid passports actual", () => {
  const passports = inputToPassportObjects("../inputs/4.txt");
  expect(validPassportCounter(passports)).toBe(202);
});

test("Count the strictly valid passports sample", () => {
  const passports = inputToPassportObjects("../inputs/4.test.txt");
  expect(strictValidPassportCounter(passports)).toBe(2);
});

test("Count the strictly valid passports actual", () => {
  const passports = inputToPassportObjects("../inputs/4.txt");
  expect(strictValidPassportCounter(passports)).toBe(137);
});
