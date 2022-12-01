units = open("input.txt").read()
# units = open("test.txt").read()


def main(units):
    i = 0

    while i < len(units) - 1:
        if units[i] == units[i+1].swapcase():
            units = units[:i] + units[i+2:]
            i -= 1
        else:
            i += 1

    return len(units)


print(main(units))
