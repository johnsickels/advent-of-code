def claim_fabric(claims):
    fabric = [[0]*1000 for i in range(1000)]

    for claim in claims:
        claim_split = claim.split()
        x, y = claim_split[2].replace(':', '').split(',')
        width, height = claim_split[3].split('x')

        x = int(x)
        y = int(y)
        width = int(width)
        height = int(height)

        for j in range(y, y + height):
            for k in range(x, x + width):
                fabric[j][k] += 1

    return fabric


def count_overlaps(fabric):
    overlaps = 0

    for row in fabric:
        overlaps += sum(1 for coord in row if coord > 1)

    return overlaps


def main():
    claims = open("input.txt")
    fabric = claim_fabric(claims)
    overlaps = count_overlaps(fabric)
    return overlaps


print(main())
