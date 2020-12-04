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
  const isValid = (passport: Passport) => {
    const requiredFields = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];
    return requiredFields.every((field) =>
      Object.prototype.hasOwnProperty.call(passport, field)
    );
  };
  const validPassports = passports.filter(isValid);
  return validPassports.length;
};

export const strictValidPassportCounter = (passports: Passport[]): number => {
  const isValid = (passport: Passport) => {
    // byr (Birth Year) - four digits; at least 1920 and at most 2002.
    if (
      passport["byr"] === undefined ||
      parseInt(passport["byr"]) < 1920 ||
      parseInt(passport["byr"]) > 2002
    )
      return false;

    // iyr (Issue Year) - four digits; at least 2010 and at most 2020.
    if (
      passport["iyr"] === undefined ||
      parseInt(passport["iyr"]) < 2010 ||
      parseInt(passport["iyr"]) > 2020
    )
      return false;

    // eyr (Expiration Year) - four digits; at least 2020 and at most 2030.
    if (
      passport["eyr"] === undefined ||
      parseInt(passport["eyr"]) < 2020 ||
      parseInt(passport["eyr"]) > 2030
    )
      return false;

    // hgt (Height) - a number followed by either cm or in:
    if (passport["hgt"] === undefined) return false;
    const unitOfMeasurement = passport["hgt"].slice(-2);
    if (unitOfMeasurement !== "cm" && unitOfMeasurement !== "in") return false;
    const height = parseInt(passport["hgt"]);
    // If cm, the number must be at least 150 and at most 193.
    if (unitOfMeasurement === "cm") {
      if (height < 150 || height > 193) {
        return false;
      }
    }
    // If in, the number must be at least 59 and at most 76.
    if (unitOfMeasurement === "in") {
      if (height < 59 || height > 76) {
        return false;
      }
    }

    // hcl (Hair Color) - a # followed by exactly six characters 0-9 or a-f.
    if (passport["hcl"] === undefined) return false;
    if (passport["hcl"][0] !== "#") return false;
    const validHCL = /^[a-f0-9]{6}$/;
    if (!validHCL.test(passport["hcl"].slice(1))) {
      return false;
    }

    // ecl (Eye Color) - exactly one of: amb blu brn gry grn hzl oth.
    const eclOptions = ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"];
    if (!eclOptions.includes(passport["ecl"])) return false;

    // pid (Passport ID) - a nine-digit number, including leading zeroes.
    const validPID = /^[0-9]{9}$/;
    if (!validPID.test(passport["pid"])) return false;

    // cid (Country ID) - ignored, missing or not.
    return true;
  };
  const validPassports = passports.filter(isValid);

  return validPassports.length;
};

// console.log(validPassportCounter(inputToPassportObjects("4.txt")));
// console.log(strictValidPassportCounter(inputToPassportObjects("4.txt")));
