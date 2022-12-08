import numpy as np

file = open('input.txt')

array2d = []

for row in file.readlines():
    array2d.append(list(map(int, list(row.strip()))))

forrest = np.array(array2d)

max_scenic_score = 0


def find_viewing_distance(tree, neighbors):
    score = 0
    for neighbor in neighbors:
        if neighbor < tree:
            score += 1
        else:
            score += 1
            break
    return score


for coords, tree in np.ndenumerate(forrest):

    y, x = coords

    # up
    up = np.flip(forrest[0:y, x])
    up_score = find_viewing_distance(tree, up)

    # down
    down = forrest[y+1:, x]
    down_score = find_viewing_distance(tree, down)

    # left
    left = np.flip(forrest[y, 0:x])
    left_score = find_viewing_distance(tree, left)

    # right
    right = forrest[y, x+1:]
    right_score = find_viewing_distance(tree, right)

    scenic_score = up_score*down_score*left_score*right_score

    if scenic_score > max_scenic_score:
        max_scenic_score = scenic_score


print(max_scenic_score)
