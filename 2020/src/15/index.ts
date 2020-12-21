export const findNthNumber = (input: number[], target: number): number => {
  let i = input.length - 1;

  while (i < target - 1) {
    const lastSpoken = input.pop();
    const lastIndex = input.lastIndexOf(lastSpoken);

    if (lastIndex !== -1) {
      const difference = i - lastIndex;
      input.push(lastSpoken, difference);
    } else {
      input.push(lastSpoken, 0);
    }
    i++;
  }

  return input[input.length - 1];
};
