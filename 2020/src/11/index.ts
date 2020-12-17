// import { inputToArray } from "../utils";
// const floorPlan = inputToArray("11.txt").map(row => row.split(""))

const countOccupiedSeats = (plan: string[][]): number => {
    let occupiedSeats = 0
    for (let i = 0; i < plan.length; i++) {
        for (let j = 0; j < plan[i].length; j++) {
            if (plan[i][j] === "#") occupiedSeats++
        }
    }
    return occupiedSeats
}

const toggle = (row: number, col: number, grid: string[][]): string => {

    const space = grid[row][col]
    let adjacents = 0

    if (space === ".") return "."

    for (let dy = -1; dy < 2; dy++) {
        for (let dx = -1; dx < 2; dx++) {
            if ((dx !== 0 || dy !== 0) && grid[row + dx] && grid[row + dx][col + dy] === "#") {
                adjacents++
            }
        }
    }

    if (space === "L") return adjacents === 0 ? "#" : "L"

    if (space === "#") return adjacents > 3 ? "L" : "#"
}

export const sitDown = (data: string[][]): number => {
    const newFloorPlan: string[][] = []
    let changed = false

    for (let i = 0; i < data.length; i++) {
        newFloorPlan.push([])
        for (let j = 0; j < data[i].length; j++) {
            const space = toggle(i, j, data)
            newFloorPlan[i].push(space)
            if (space !== data[i][j]) changed = true
        }
    }

    if (!changed) return countOccupiedSeats(newFloorPlan)

    return sitDown(newFloorPlan)
}

// console.log(sitDown(floorPlan))