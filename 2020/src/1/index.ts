import * as fs from "fs";

const init = () => {
  const data = fs.readFileSync("inputs/1.txt", "utf8");

  const entries = data.split("\n");

  for (let i = 0; i < entries.length; i++) {
    for (let j = i + 1; j < entries.length; j++) {
      if (parseInt(entries[i]) + parseInt(entries[j]) === 2020) {
        return parseInt(entries[i]) * parseInt(entries[j]);
      }
    }
  }
};

console.log(init());
