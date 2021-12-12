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
  path: string,
  duplicateVisitsAllowed: boolean
): string[] => {
  const paths = [];
  const nextPossibleCaves = possibiliKey[possibility];

  for (let i = 0; i < nextPossibleCaves.length; i++) {
    const nextPossibleCave = nextPossibleCaves[i];
    const nextPossibleCaveRegex = new RegExp(nextPossibleCave, "g");

    const visitsToCave = (path.match(nextPossibleCaveRegex) || []).length;

    if (nextPossibleCave === "end") {
      paths.push(`${path},${nextPossibleCave}`);
    } else if (nextPossibleCave === "start") {
      continue;
    } else if (
      // uppercase
      nextPossibleCave.toLowerCase() !== nextPossibleCave
    ) {
      paths.push(
        ...explore(
          possibiliKey,
          nextPossibleCave,
          `${path},${nextPossibleCave}`,
          duplicateVisitsAllowed
        )
      );
    } else if (
      // lowercase
      // never been here
      visitsToCave === 0
    ) {
      paths.push(
        ...explore(
          possibiliKey,
          nextPossibleCave,
          `${path},${nextPossibleCave}`,
          duplicateVisitsAllowed
        )
      );
    } else if (
      // lowercase
      // been here once
      // haven't visited any other small cave twice
      visitsToCave === 1 &&
      duplicateVisitsAllowed
    ) {
      paths.push(
        ...explore(
          possibiliKey,
          nextPossibleCave,
          `${path},${nextPossibleCave}`,
          // don't visit any other small cave twice anymore
          false
        )
      );
    }
  }
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
      ...explore(
        possibiliKey,
        possibility,
        `start,${possibility}`,
        duplicateVisitsAllowed
      )
    );
  });

  return paths.length;
};
