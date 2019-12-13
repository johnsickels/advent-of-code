const fs = require("fs");
const arr = fs
  .readFileSync("input.txt", "utf8")
  .split(",")
  .map(e => {
    return parseInt(e);
  });
let i = 0;
const len = arr.length;
let param1;
let param2;

intcode = input => {
  while (i < len) {

    let opcode = arr[i];

    switch (opcode.toString().length) {
      case 1:
        param1 = arr[arr[i + 1]];
        param2 = arr[arr[i + 2]];
        break;
      case 2:
        break;
      case 3:
        param1 = arr[i + 1];
        param2 = arr[arr[i + 2]];
        opcode = Number(opcode.toString().split("")[2]);
        break;
      case 4:
        param1 = (opcode.toString().split("")[1] === "1")
          ? arr[i + 1]
          : arr[arr[i + 1]];
        param2 = arr[i + 2];
        opcode = Number(opcode.toString().split("")[3]);
        break;
      default:
        console.log(`Error: Invalid OPCODE ${opcode}`);
    }

    switch (opcode) {
      case 1:
        arr[arr[i + 3]] = param1 + param2;
        i += 4;
        break;
      case 2:
        arr[arr[i + 3]] = param1 * param2;
        i += 4;
        break;
      case 3:
        arr[arr[i + 1]] = input;
        i++;
        break;
      case 4:
        console.log(`Position ${i} output ${param1}`)
        i += 2;
        break;
      case 5:
        if (param1 !== 0) {
          i = param2;
        } else {
          i += 3;
        }
        break;
      case 6:
        if (param1 === 0) {
          i = param2;
        } else {
          i += 3;
        }
        break;
      case 7:
        if (param1 < param2) {
          arr[i + 3] = 1;
        } else {
          arr[i + 3] = 0;
        }
        i += 4;
        break;
      case 8:
        if (param1 === param2) {
          arr[i + 3] = 1;
        } else {
          arr[i + 3] = 0;
        }
        i += 4;
        break;
      case 99:
        console.log(`HALT`);
        return;
      default:
        console.log(`error occured: invalid opcode ${opcode} at position ${i}`);
    }
  }
};

intcode(5);
// 7286649 was too low