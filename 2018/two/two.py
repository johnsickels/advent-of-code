import itertools

box_ids = open("input.txt")


def compare(str1, str2):
    flukes = 0
    matching = ''

    for i, char in enumerate(str1):

        if char == str2[i]:
            matching += char
        else:
            flukes += 1
            if flukes > 1:
                return

    return matching


def main():

    for a, b in itertools.combinations(box_ids, 2):
        match = compare(a, b)
        if match:
            return match


print(main())
