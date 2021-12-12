type PossibiliKey = Record<string, string[]>;

/**
 * create a key of possible caves to travel to given current cave
 * 
 * Example:
{
  start: [ 'A', 'b' ],
  A: [ 'start', 'c', 'b', 'end' ],
  b: [ 'start', 'A', 'd', 'end' ],
  c: [ 'A' ],
  d: [ 'b' ],
  end: [ 'A', 'b' ]
}
**/
const getPossibiliKey = (input: string[]) => {
  const possibliKey: PossibiliKey = {};

  input.forEach((path) => {
    const [a, b] = path.split("-");
    if (!possibliKey[a]) possibliKey[a] = [];
    if (!possibliKey[b]) possibliKey[b] = [];
    possibliKey[a].push(b);
    possibliKey[b].push(a);
  });

  return possibliKey;
};

const explore = (
  possibiliKey: PossibiliKey,
  possibility: string,
  path: string
): string[] => {
  const paths = [];
  const nextPossibleCaves = possibiliKey[possibility];

  for (let i = 0; i < nextPossibleCaves.length; i++) {
    const nextPossibleCave = nextPossibleCaves[i];

    if (nextPossibleCave === "end") {
      paths.push(`${path},${nextPossibleCave}`);
    } else if (
      // lowercase and first time here
      (nextPossibleCave.toLowerCase() === nextPossibleCave &&
        !path.includes(nextPossibleCave)) ||
      // uppercase
      nextPossibleCave.toLowerCase() !== nextPossibleCave
    ) {
      paths.push(
        ...explore(
          possibiliKey,
          nextPossibleCave,
          `${path},${nextPossibleCave}`
        )
      );
    }
  }
  return paths;
};

export const partOne = (input: string[]): number => {
  const possibiliKey = getPossibiliKey(input);

  const paths: string[] = [];

  possibiliKey.start.forEach((possibility) => {
    paths.push(...explore(possibiliKey, possibility, `start,${possibility}`));
  });

  return paths.length;
};
