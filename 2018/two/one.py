box_ids = open("input.txt")


def count_chars(str):
    dict = {}
    twos = 0
    threes = 0

    for char in str:
        if char in dict:
            dict[char] += 1
        else:
            dict[char] = 1

    if (2 in dict.values()):
        twos = 1
    if (3 in dict.values()):
        threes = 1

    return (twos, threes)


def main():
    two_count = 0
    three_count = 0

    for id in box_ids:
        twos, threes = count_chars(id.rstrip())
        two_count += twos
        three_count += threes

    return two_count * three_count


print(main())
