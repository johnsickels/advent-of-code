const {
  inputToPassportObjects,
  validPassportCounter,
  strictValidPassportCounter,
} = require("../dist/4");

test("Count the valid passports sample", () => {
  const passports = inputToPassportObjects("../inputs/4.sample.txt");
  expect(validPassportCounter(passports)).toBe(2);
});

test("Count the valid passports actual", () => {
  const passports = inputToPassportObjects("../inputs/4.txt");
  expect(validPassportCounter(passports)).toBe(202);
});

test("Count the strictly valid passports sample", () => {
  const passports = inputToPassportObjects("../inputs/4.sample.txt");
  expect(strictValidPassportCounter(passports)).toBe(2);
});

test("Count the strictly valid passports actual", () => {
  const passports = inputToPassportObjects("../inputs/4.txt");
  expect(strictValidPassportCounter(passports)).toBe(137);
});

test("Fail an invalid haircolor", () => {
  expect(
    strictValidPassportCounter([
      {
        eyr: 2029,
        ecl: "blu",
        cid: 129,
        byr: 1989,
        iyr: 2014,
        pid: 896056539,
        hcl: "#g97842",
        hgt: "165cm",
      },
    ])
  ).toBe(0);
});
