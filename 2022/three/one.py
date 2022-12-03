rucksacks = open("input.txt")

# Lowercase item types a through z have priorities 1 through 26.
# Uppercase item types A through Z have priorities 27 through 52.
# 16 (p), 38 (L), 42 (P), 22 (v), 20 (t), and 19 (s);

sum = 0

for sack in rucksacks:
    # split the sack
    first, second = sack[:len(sack)//2], sack[len(sack)//2:]
    # find the common item
    common = ''.join(set(first).intersection(second))
    # convert to number
    ascii = ord(common)
    # adjust to priority
    priority = ascii - 96 if common.islower() else ascii - 38
    # add to sum
    sum += priority

print(sum)
