import re
lines = open("input.txt")


test_dict = {
    '1': ['Z', 'N'],
    '2': ['M', 'C', 'D'],
    '3': ['P']
}

dict = {
    '1': ['V', 'C', 'D', 'R', 'Z', 'G', 'B', 'W'],
    '2': ['G', 'W', 'F', 'C', 'B', 'S', 'T', 'V'],
    '3': ['C', 'B', 'S', 'N', 'W'],
    '4': ['Q', 'G', 'M', 'N', 'J', 'V', 'C', 'P'],
    '5': ['T', 'S', 'L', 'F', 'D', 'H', 'B'],
    '6': ['J', 'V', 'T', 'W', 'M', 'N'],
    '7': ['P', 'F', 'L', 'C', 'S', 'T', 'G'],
    '8': ['B', 'D', 'Z'],
    '9': ['M', 'N', 'Z', 'W']
}

crates_on_top = ''


for line in lines:
    # if line starts with move
    # first number is quantity
    # second number is from_crate
    # third number is to_crate
    if line.startswith('move'):
        qty, from_stack, to_stack = re.findall(r'\d+', line)
        print(qty)
        for i in range(int(qty)):
            crate = dict[from_stack].pop(-1)
            dict[to_stack].append(crate)

for i in range(len(dict.keys())):
    crate_on_top = dict[str(i+1)].pop()
    crates_on_top += crate_on_top

print(crates_on_top)
