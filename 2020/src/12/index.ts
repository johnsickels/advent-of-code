// import { inputToArray } from "../utils";
// const directions = inputToArray("12.txt")
// const directions = ["F10", "N3", "F7", "R90", "F11"]

export const goTheDistance = (input: string[]): number => {

    let x = 0
    let y = 0

    const cardinals = ["E", "S", "W", "N"]
    let facingIndex = 0

    const move = (dir: string, val: number): void => {
        switch (dir) {
            case "E":
                x += val
                break;
            case "W":
                x -= val
                break;
            case "N":
                y += val
                break;
            case "S":
                y -= val
                break;
            case "R":
                facingIndex += (val / 90) % 4
                if (facingIndex > 3) facingIndex -= 4
                break;
            case "L":
                facingIndex -= (val / 90) % 4
                if (facingIndex < 0) facingIndex += 4
                break;
            case "F":
                move(cardinals[facingIndex], val)
                break;
            default:
                break;
        }
    }

    for (let i = 0; i < input.length; i++) {

        const action = input[i].substring(0, 1);
        const value = parseInt(input[i].substring(1))
        move(action, value)

    }

    return Math.abs(x) + Math.abs(y)
}

// console.log(goTheDistance(directions))
