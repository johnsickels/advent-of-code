export const findTicketScanningErrorRate = (document: string[]): number => {

    let ticketScanningErrorRate = 0

    // parse tickets to a single array of numbers
    const tickets = document[2].split(":\n")[1].split(/[\n,]+/).map(t => parseInt(t))

    // build an array of acceptable ranges
    const ranges: number[][] = []
    document[0].split("\n").forEach(r => {
        r.split(": ")[1].split(" or ").forEach(s => {
            ranges.push(s.split("-").map(t => parseInt(t)))
        })
    })

    // check if a ticket value is in any range
    const isValid = (num: number, range: number[]): boolean => num >= range[0] && num <= range[1]
    const checkCategories = (ticket: number): void => {
        for (let j = 0; j < ranges.length; j++) {
            if (isValid(ticket, ranges[j])) return
        }
        // if not, add it to the TSER
        ticketScanningErrorRate += ticket
    }

    // check all ticket values
    for (let i = 0; i < tickets.length; i++) {
        checkCategories(tickets[i])
    }

    return ticketScanningErrorRate
}