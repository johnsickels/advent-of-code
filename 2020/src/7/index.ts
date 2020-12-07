// import { inputToArray } from "../utils";
// const bagRuleStrings = inputToArray("7.txt");
const myBag = "shinyGold";

interface bagRule {
  [key: string]: number;
}
interface bagRuleGroup {
  [key: string]: bagRule;
}

const camelize = (wordA: string, wordB: string) => {
  return wordA + wordB.substr(0, 1).toUpperCase() + wordB.substr(1);
};

const bagRuleStringToObject = (ruleStrings: string[]): bagRuleGroup => {
  const bagRuleObject: bagRuleGroup = {};
  ruleStrings.forEach((ruleString: string) => {
    const substr = ruleString.split(" ");
    const key = camelize(substr[0], substr[1]);
    bagRuleObject[key] = {};

    let i = 4;
    while (i < substr.length) {
      if (parseInt(substr[i])) {
        bagRuleObject[key][camelize(substr[i + 1], substr[i + 2])] = parseInt(
          substr[i]
        );
      }
      i += 4;
    }
  });
  return bagRuleObject;
};

export const countBagsThatCanHoldMyBag = (ruleStrings: string[]): number => {
  const bagRuleObject = bagRuleStringToObject(ruleStrings);
  const bags = [myBag];
  const canHoldMyBag = (bag: string) => {
    for (const b in bagRuleObject) {
      if (Object.keys(bagRuleObject[b]).includes(bag) && !bags.includes(b)) {
        bags.push(b);
      }
    }
  };
  let i = 0;
  while (i < bags.length) {
    canHoldMyBag(bags[i]);
    i++;
  }
  return bags.length - 1;
};

export const countBagsInMyBag = (ruleStrings: string[]): number => {
  let bagsInside = 0;
  const bagRuleObject = bagRuleStringToObject(ruleStrings);

  const addBags = (bagObj: bagRule, multiplier: number) => {
    Object.entries(bagObj).forEach(([bagColor, numberOfBags]) => {
      bagsInside += numberOfBags * multiplier;
      if (Object.keys(bagRuleObject[bagColor]).length) {
        addBags(bagRuleObject[bagColor], numberOfBags * multiplier);
      }
    });
  };

  addBags(bagRuleObject[myBag], 1);
  return bagsInside;
};

// console.log("Part one:", countBagsThatCanHoldMyBag(bagRuleStrings));
// console.log("Part two:", countBagsInMyBag(bagRuleStrings));
