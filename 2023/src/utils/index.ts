import * as fs from "fs";
import * as path from "path";

export const inputToArray = (
  file: string,
  newLines = 1,
  splitOn = "\n"
): string[] => {
  const INPUT_DIR = path.resolve(__dirname, "../../inputs");
  const inputPath = path.join(INPUT_DIR, file);
  console.log(inputPath);

  const data = fs.readFileSync(inputPath, "utf8");
  const numberOfNewLines = splitOn.repeat(newLines);
  return data.split(numberOfNewLines);
};
