import re
lines = open('input.txt')

root = {}
cwd = root
pwd = ''
all_paths = set()
total = 0


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


for path in all_paths:
    dir_size = findTotal(eval(f'root{path}'))
    if dir_size <= 100000:
        total += dir_size

print(total)
