units = open("input.txt").read()


def main(units):
    i = 0
    reactions = 0

    while i < len(units) - 1:
        if units[i] == units[i+1].swapcase():
            units = units[:i] + units[i+2:]
            reactions += 1
        i += 1

    if not reactions:
        return len(units)
    else:
        return main(units)


print(main(units))
