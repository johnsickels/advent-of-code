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
  path: string,
  possibility: string,
  duplicateVisitsAllowed: boolean
): string[] => {
  const paths: string[] = [];
  path += `,${possibility}`;

  const nextPossibleCaves = possibiliKey[possibility];

  nextPossibleCaves.forEach((nextPossibleCave) => {
    const nextPossibleCaveRegex = new RegExp(nextPossibleCave, "g");
    const visitsToCave = (path.match(nextPossibleCaveRegex) || []).length;

    if (nextPossibleCave === "start") {
      // can't visit start again
    } else if (nextPossibleCave === "end") {
      // complete this path
      paths.push(`${path},${nextPossibleCave}`);
    } else if (
      // uppercase
      nextPossibleCave.toLowerCase() !== nextPossibleCave
    ) {
      paths.push(
        ...explore(possibiliKey, path, nextPossibleCave, duplicateVisitsAllowed)
      );
    } else if (
      // lowercase, never been here
      visitsToCave === 0
    ) {
      paths.push(
        ...explore(possibiliKey, path, nextPossibleCave, duplicateVisitsAllowed)
      );
    } else if (
      // lowercase, been here once, haven't visited any other small cave twice
      visitsToCave === 1 &&
      duplicateVisitsAllowed
    ) {
      paths.push(
        // don't visit any other small cave twice anymore
        ...explore(possibiliKey, path, nextPossibleCave, false)
      );
    }
    // else kill the path
  });
  return paths;
};

export const main = (
  input: string[],
  duplicateVisitsAllowed = false
): number => {
  const possibiliKey = getPossibiliKey(input);
  const paths: string[] = [];

  possibiliKey.start.forEach((possibility) => {
    paths.push(
      ...explore(possibiliKey, `start`, possibility, duplicateVisitsAllowed)
    );
  });

  return paths.length;
};
