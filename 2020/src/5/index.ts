// import { inputToArray } from "../utils"

// const boardingPasses = inputToArray("5.txt")

export const boardingPassToSeatID = (boardingPass: string): number => {
    let row = 0
    let col = 0

    let i = 0
    while (i < 7) {
        if (boardingPass[i] === "B") {
            row += 128 / (2 ** (i + 1))
        }
        i++
    }
    while (i < 10) {
        if (boardingPass[i] === "R") {
            col += 8 / (2 ** (i - 6))
        }
        i++
    }
    const seatID = (row * 8) + col
    return seatID
}

export const highestSeatID = (boardingPasses: string[]): number => {
    const sortedSeatIDs = boardingPasses.map(boardingPassToSeatID).sort((a, b) => b - a)
    return sortedSeatIDs[0]
}

export const missingSeatID = (boardingPasses: string[]): number => {
    const sortedSeatIDs = boardingPasses.map(boardingPassToSeatID).sort((a, b) => a - b)

    for (let i = 1; i < sortedSeatIDs.length; i++) {
        if (sortedSeatIDs[i] !== sortedSeatIDs[i - 1] + 1) return sortedSeatIDs[i] - 1
    }
}

// console.log(highestSeatID(boardingPasses));
// console.log(missingSeatID(boardingPasses));
