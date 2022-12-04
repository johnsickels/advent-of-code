pairs = open("input.txt")

ctr = 0

for pair in pairs:
    elf_one, elf_two = pair.split(',')
    elf_one_start, elf_one_finish = elf_one.split('-')
    elf_two_start, elf_two_finish = elf_two.split('-')

    a = int(elf_one_start)
    b = int(elf_one_finish)
    c = int(elf_two_start)
    d = int(elf_two_finish)

    if a <= d and b >= c:
        ctr += 1

print(ctr)
