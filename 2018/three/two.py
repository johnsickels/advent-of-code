def claim_fabric(claims):
    fabric = [[0]*1000 for i in range(1000)]
    all_ids = set(range(1, 1411))

    for claim in claims:
        claim_split = claim.split()
        id = int(claim_split[0].replace('#', ''))
        x, y = claim_split[2].replace(':', '').split(',')
        width, height = claim_split[3].split('x')

        x = int(x)
        y = int(y)
        width = int(width)
        height = int(height)

        for j in range(y, y + height):
            for k in range(x, x + width):
                if fabric[j][k]:
                    all_ids.discard(id)
                    all_ids.discard(fabric[j][k])
                else:
                    fabric[j][k] = id

    (unscathed,) = all_ids
    return unscathed


def main():
    claims = open("input.txt")
    nonoverlapping_claim_id = claim_fabric(claims)
    return nonoverlapping_claim_id


print(main())
