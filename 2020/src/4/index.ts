import * as fs from "fs";
import * as path from "path";

interface Passport {
  [key: string]: string;
}

export const inputToPassportObjects = (file: string): Passport[] => {
  const INPUT_DIR = path.resolve(__dirname, "../../inputs");
  const inputPath = path.join(INPUT_DIR, file);
  const data = fs.readFileSync(inputPath, "utf8");
  const rawPassports = data.split("\n\n");
  const passportObjects = rawPassports.map((rawPassport) => {
    const stringPassport = rawPassport.split("\n").join(" ");
    const arrayPassport = stringPassport.split(" ");
    const passportObject: Passport = {};

    arrayPassport.forEach((passportProprty) => {
      const semicolon = passportProprty.indexOf(":");
      const key = passportProprty.slice(0, semicolon);
      const value = passportProprty.slice(semicolon + 1);
      passportObject[key] = value;
    });

    return passportObject;
  });
  return passportObjects;
};

export const validPassportCounter = (passports: Passport[]): number => {
  const isValid = (data: Passport) => {
    const requiredFields = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];
    return requiredFields.every((field) =>
      Object.prototype.hasOwnProperty.call(data, field)
    );
  };
  const validPassports = passports.filter(isValid);
  return validPassports.length;
};

console.log(validPassportCounter(inputToPassportObjects("4.txt")));
