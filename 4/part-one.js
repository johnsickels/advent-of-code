const min = 356261;
const max = 846303;

let passwords = [];

passwordValidator = (a, b) => {
  for (let i = a; i < b + 1; i++) {
    iArr = ("" + i).split("").map(Number);
    let incrementing = true;
    let containsDups = false;

    for (let j = 0; j < 5; j++) {
      if (iArr[j] > iArr[j + 1]) {
        incrementing = false;
      }
      if (
        iArr[j] === iArr[j + 1] &&
        iArr[j + 1] !== iArr[j + 2] &&
        iArr[j] !== iArr[j - 1]
      ) {
        containsDups = true;
      }
    }

    if (incrementing && containsDups) {
      passwords.push(i);
    }
  }
  console.log(`${passwords.length} different passwords meet the criteria`);
};

passwordValidator(min, max);
