import itertools

box_ids = open("input.txt")


def compare(str1, str2):
    flukes = 0
    for i, char in enumerate(str1):
        if char != str2[i]:

            flukes += 1
            if flukes > 1:
                return

    print('ONLY 1 FLUKE!')
    print(str1, str2)
    # gotta run, visual inspection here
    # TODO: cut out the nonmatchin char and return the rest of the ID


def main():

    for a, b in itertools.combinations(box_ids, 2):
        compare(a, b)


print(main())
