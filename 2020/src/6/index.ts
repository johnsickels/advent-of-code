// import { inputToArray } from "../utils"

const countUniqueAnswers = (answers: string): number => new Set(answers.split("\n").join("")).size

export const getSumOfUniqueAnswers = (answerCards: string[]): number => answerCards.reduce((acc, cur) => acc + countUniqueAnswers(cur), 0)

// console.log(getSumOfUniqueAnswers(inputToArray("6.txt", 2)));
