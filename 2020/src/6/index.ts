// import { inputToArray } from "../utils"

const countUniqueAnswers = (answers: string): number => new Set(answers.split("\n").join("")).size

export const getSumOfUniqueAnswers = (answerCards: string[]): number => answerCards.reduce((acc, cur) => acc + countUniqueAnswers(cur), 0)

export const getSumOfAllYeses = (answerCards: string[]): number => {

    let allYeses = 0

    answerCards.forEach(answerCard => {

        interface answerCounter {
            [key: string]: number
        }
        const obj: answerCounter = {}
        const answers = answerCard.replace(/\n/g, "").split("")
        const groupLength = answerCard.split("\n").length

        answers.forEach(a => {

            if (!obj[a]) {
                obj[a] = 1
            } else {
                obj[a]++
            }
        })

        for (const letter in obj) {
            if (obj[letter] === groupLength) {
                allYeses++
            }
        }
    })

    return allYeses
}

// console.log(getSumOfUniqueAnswers(inputToArray("6.txt", 2)));
// console.log(getSumOfAllYeses(inputToArray("6.txt", 2)))
