import re
lines = open('input.txt')

root = {}
cwd = root
pwd = ''
all_paths = set()


def findTotal(dct):
    total = 0
    for key, value in dct.items():
        if isinstance(value, int):
            total += value
        if isinstance(value, dict):
            total += findTotal(value)
    return total


for line in lines:
    line = line.strip()

    if line.startswith('$ cd'):
        _, command, dir = line.split(' ')

        if command == 'cd':
            # move
            if dir == '/':
                # do nothing
                continue

            elif dir == '..':
                # go up one
                pwd = re.sub(r"\[[^\]]*\]$", '', pwd)
                # print(pwd)
                cwd = eval(f'root{pwd}')

            else:
                # move into the dir
                cwd[dir] = {}
                cwd = cwd[dir]
                pwd = f'{pwd}["{dir}"]'
                all_paths.add(pwd)

    elif line.startswith('$ ls'):
        continue

    elif line.startswith('dir'):
        # add new dict to cwd
        _, dirName = line.split(' ')
        cwd[dirName] = {}

    else:
        # line is a file
        # add new entry to cwd
        size, fileName = line.split(' ')
        cwd[fileName] = int(size)

# part one
total = 0

for path in all_paths:
    dir_size = findTotal(eval(f'root{path}'))
    if dir_size <= 100000:
        total += dir_size
print(total)

# part two
total_space = 70000000
used_space = findTotal(root)
available_space = total_space - used_space
needed_space = 30000000
space_to_free = needed_space - available_space
options = list()

for path in all_paths:
    dir_size = findTotal(eval(f'root{path}'))
    if dir_size >= space_to_free:
        options.append(dir_size)

options.sort()

print(options[0])
