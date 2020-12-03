import * as fs from "fs";
import * as path from "path";

export const inputToArray = (file: string) => {
  const INPUT_DIR = path.resolve(__dirname, "../../inputs");
  const inputPath = path.join(INPUT_DIR, file);
  const data = fs.readFileSync(inputPath, "utf8");
  return data.split("\n");
};
