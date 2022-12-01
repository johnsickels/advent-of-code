lines = open("input.txt")

calories_by_elf = list()

curr = 0

for line in lines:
    try:
        curr += int(line)
    except:
        calories_by_elf.append(curr)
        curr = 0

print(sum(sorted(calories_by_elf)[-3:]))
