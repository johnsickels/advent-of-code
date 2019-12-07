const input =
  "1,0,0,3,1,1,2,3,1,3,4,3,1,5,0,3,2,10,1,19,1,5,19,23,1,23,5,27,1,27,13,31,1,31,5,35,1,9,35,39,2,13,39,43,1,43,10,47,1,47,13,51,2,10,51,55,1,55,5,59,1,59,5,63,1,63,13,67,1,13,67,71,1,71,10,75,1,6,75,79,1,6,79,83,2,10,83,87,1,87,5,91,1,5,91,95,2,95,10,99,1,9,99,103,1,103,13,107,2,10,107,111,2,13,111,115,1,6,115,119,1,119,10,123,2,9,123,127,2,127,9,131,1,131,10,135,1,135,2,139,1,10,139,0,99,2,0,14,0";

let arr = input.split(",").map(Number);
arr[1] = noun = 82
arr[2] = verb = 98

for (i = 0; i < arr.length; i += 4) {
  let opcode = arr[i];

  // IMPORTANT to understand the linear effects of altering arr[1] & arr[2]...
  let x = arr[i + 1];
  // increase x by 1, add 230400 to output

  let y = arr[i + 2];
  // increase y by 1, add 1 to output

  let store = arr[i + 3];

  switch (opcode) {
    case 1:
      arr[store] = arr[x] + arr[y];
      break;
    case 2:
      arr[store] = arr[x] * arr[y];
      break;
    case 99:
      console.log(arr[0]);
      return;
    default:
      console.log("error occured: invalid opcode");
  }
}
/* Looking for output 19690720
if (1,0,0,3...) returns 797822
and (1,82,0,3...) returns 19690622
then (1,82,98,3...) returns 19690720
*/
