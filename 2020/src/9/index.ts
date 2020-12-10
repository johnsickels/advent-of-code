// const { inputToArray } = require("../utils")

// const nums = inputToArray("9.txt").map((n: string) => parseInt(n))
// const preamble = 25

const isValid = (num: number, arr: number[]): boolean => {

    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[i] + arr[j] === num) {
                return true
            }
        }
    }
    return false
}

export const findWeakness = (nums: number[], preamble: number): number => {

    for (let k = preamble; k < nums.length; k++) {
        if (!isValid(nums[k], nums.slice(k - preamble, k))) {
            return nums[k]
        }

    }
}

// console.log(findWeakness(nums, preamble));
