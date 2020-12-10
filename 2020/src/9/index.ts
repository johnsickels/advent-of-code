// const { inputToArray } = require("../utils")

// const nums = inputToArray("9.txt").map((n: string) => parseInt(n))
// const preamble = 25

const isValid = (arr: number[], num: number): boolean => {

    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[i] + arr[j] === num) {
                return true
            }
        }
    }
    return false
}

export const hackXMAS = (nums: number[], preamble: number): { firstNumber: number, encryptionWeakness: number } => {

    for (let k = preamble; k < nums.length; k++) {
        if (!isValid(nums.slice(k - preamble, k), nums[k])) {
            const encryptionWeakness = findWeekness(nums.slice(0, k), nums[k])
            return { firstNumber: nums[k], encryptionWeakness: encryptionWeakness }
        }
    }
}

const findWeekness = (nums: number[], target: number): number => {

    for (let lower = 0; lower < nums.length; lower++) {
        let upper = lower + 1
        let sum;

        do {
            sum = nums.slice(lower, upper).reduce((acc, cur) => acc + cur)
            if (sum === target) {
                return Math.min(...nums.slice(lower, upper)) + Math.max(...nums.slice(lower, upper))
            }
            upper++
        } while (sum <= target);
    }
}

// console.log(hackXMAS(nums, preamble));