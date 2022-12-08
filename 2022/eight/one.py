import numpy as np

file = open('input.txt')

array2d = []

for row in file.readlines():
    array2d.append(list(map(int, list(row.strip()))))

forrest = np.array(array2d)

visible_trees = 0

for coords, tree in np.ndenumerate(forrest):

    y, x = coords

    # up
    up = forrest[0:y, x]
    if np.all(up < tree) or not len(up):
        visible_trees += 1
        continue

    # down
    down = forrest[y+1:, x]
    if np.all(down < tree) or not len(down):
        visible_trees += 1
        continue

    # left
    left = forrest[y, 0:x]
    if np.all(left < tree) or not len(left):
        visible_trees += 1
        continue

    # right
    right = forrest[y, x+1:]
    if np.all(right < tree) or not len(right):
        visible_trees += 1
        continue

print(visible_trees)
