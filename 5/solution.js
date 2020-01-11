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
      case 1:
        arr[store] = arr[parameter1] + arr[parameter2];
        i += 2;
        break;
      case 101:
        arr[store] = parameter1 + arr[parameter2];
        i += 2;
        break;
      case 1001:
        arr[store] = arr[parameter1] + parameter2;
        i += 2;
        break;
      case 1101:
        arr[store] = parameter1 + parameter2;
        i += 2;
        break;
      case 2:
        arr[store] = arr[parameter1] * arr[parameter2];
        i += 2;
        break;
      case 102:
        arr[store] = parameter1 * arr[parameter2];
        i += 2;
        break;
      case 1002:
        arr[store] = arr[parameter1] * parameter2;
        i += 2;
        break;
      case 1102:
        arr[store] = parameter1 * parameter2;
        i += 2;
        break;
      case 3:
        arr[parameter1] = input;
        break;
      case 4:
        console.log(`Position ${i} output ${arr[parameter1]}`);
        break;

      // Opcode 5 is jump-if-true: if the first parameter is non-zero, it sets the instruction pointer to the value from the second parameter. Otherwise, it does nothing.
      case 5:
        if (arr[parameter1] !== 0) {
          i = arr[parameter2] - 2;
        } else {
          i++;
        }
        break;
      case 105:
        if (parameter1 !== 0) {
          i = arr[parameter2] - 2;
        } else {
          i++;
        }
        break;
      case 1005:
        if (arr[parameter1] !== 0) {
          i = parameter2 - 2;
        } else {
          i++;
        }
        break;
      case 1105:
        if (parameter1 !== 0) {
          i = parameter2 - 2;
        } else {
          i++;
        }
        break;
      // Opcode 6 is jump-if-false: if the first parameter is zero, it sets the instruction pointer to the value from the second parameter. Otherwise, it does nothing.
      case 6:
        if (arr[parameter1] === 0) {
          i = arr[parameter2] - 2;
        } else {
          i++;
        }
        break;
      case 106:
        if (parameter1 === 0) {
          i = arr[parameter2] - 2;
        } else {
          i++;
        }
        break;
      case 1006:
        if (arr[parameter1] === 0) {
          i = parameter2 - 2;
        } else {
          i++;
        }
        break;
      case 1106:
        if (parameter1 === 0) {
          i = parameter2 - 2;
        } else {
          i++;
        }
        break;
      // Opcode 7 is less than: if the first parameter is less than the second parameter, it stores 1 in the position given by the third parameter. Otherwise, it stores 0.
      case 7:
        if (arr[parameter1] < arr[parameter2]) {
          arr[store] = 1;
        } else {
          arr[store] = 0;
        }
        break;
      case 107:
        if (parameter1 < arr[parameter2]) {
          arr[store] = 1;
        } else {
          arr[store] = 0;
        }
        break;
      case 1007:
        if (arr[parameter1] < parameter2) {
          arr[store] = 1;
        } else {
          arr[store] = 0;
        }
        break;
      case 1107:
        if (parameter1 < parameter2) {
          arr[store] = 1;
        } else {
          arr[store] = 0;
        }
        break;
      // Opcode 8 is equals: if the first parameter is equal to the second parameter, it stores 1 in the position given by the third parameter. Otherwise, it stores 0.
      case 8:
        if (arr[parameter1] === arr[parameter2]) {
          arr[store] = 1;
        } else {
          arr[store] = 0;
        }
        break;
      case 108:
        if (parameter1 === arr[parameter2]) {
          arr[store] = 1;
        } else {
          arr[store] = 0;
        }
        break;
      case 1008:
        if (arr[parameter1] === parameter2) {
          arr[store] = 1;
        } else {
          arr[store] = 0;
        }
        break;
      case 1108:
        if (parameter1 === parameter2) {
          arr[store] = 1;
        } else {
          arr[store] = 0;
        }
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
