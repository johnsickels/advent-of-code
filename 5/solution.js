const fs = require("fs");
const arr = fs
  .readFileSync("input.txt", "utf8")
  .split(",")
  .map(e => {
    return parseInt(e);
  });

intcode = input => {
  for (i = 0; i < arr.length; i += 2) {
    let opcode = arr[i];

    let parameter1 = arr[i + 1];

    let parameter2 = arr[i + 2];

    let store = arr[i + 3];

    switch (opcode) {
      case 1101:
        arr[store] = parameter1 + parameter2;
        i += 2;
        break;
      case 1001:
        arr[store] = arr[parameter1] + parameter2;
        i += 2;
        break;
      case 101:
        arr[store] = parameter1 + arr[parameter2];
        i += 2;
        break;
      case 1102:
        arr[store] = parameter1 * parameter2;
        i += 2;
        break;
      case 1002:
        arr[store] = arr[parameter1] * parameter2;
        i += 2;
        break;
      case 102:
        arr[store] = parameter1 * arr[parameter2];
        i += 2;
        break;
      case 1:
        arr[store] = arr[parameter1] + arr[parameter2];
        i += 2;
        break;
      case 2:
        arr[store] = arr[parameter1] * arr[parameter2];
        i += 2;
        break;
      case 3:
        arr[parameter1] = input;
        break;
      case 4:
        console.log(`Position ${i} output ${arr[parameter1]}`);
        break;
      case 99:
        console.log(`HALT`);
        return;
      default:
        console.log("error occured: invalid opcode");
    }
  }
};

intcode(1);
