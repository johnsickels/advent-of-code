// import { inputToArray } from "../utils";
// const notes = inputToArray("13.txt")

export const anotherOneRidesTheBus = (input: string[]): number => {

    const earliest = parseInt(input[0])
    const buses = input[1].split(",").map(id => parseInt(id)).filter(id => Number.isInteger(id))
    let earliestBus;
    let earliestBusTime = Infinity

    for (let i = 0; i < buses.length; i++) {
        const bus = buses[i];

        const next = Math.ceil(earliest / bus) * bus

        if (next < earliestBusTime) {
            earliestBusTime = next
            earliestBus = bus
        }

    }

    const timeToWait = earliestBusTime - earliest

    return earliestBus * timeToWait
}

// console.log(anotherOneRidesTheBus(notes))