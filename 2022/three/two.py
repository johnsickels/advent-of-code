rucksacks = open("input.txt")

sum = 0

groups = zip(*(iter(rucksacks),) * 3)

for group in groups:
    common = set.intersection(*map(set, group))
    common.discard('\n')
    common = common.pop()
    ascii = ord(common)
    priority = ascii - 96 if common.islower() else ascii - 38
    sum += priority

print(sum)
