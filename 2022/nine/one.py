import numpy as np
import time

lines = open('input.txt')

diagram = [['X']]
hy, hx, ty, tx = 0, 0, 0, 0
t_history = set()


def shift_coord_right(coord):
    x, y = coord.split(',')
    x = int(x) + 1
    return f'{x},{y}'


def shift_coord_up(coord):
    x, y = coord.split(',')
    y = int(y) + 1
    return f'{x},{y}'


def move_tail():
    global hy, hx, ty, tx
    t_history.add(f'{tx},{ty}')

    # chase head to the right
    if hy == ty and hx - tx > 1:
        diagram[ty][tx] = '.'
        tx += 1
        diagram[ty][tx] = 'T'

    # chase head to the left
    elif hy == ty and hx - tx < -1:
        diagram[ty][tx] = '.'
        tx -= 1
        diagram[ty][tx] = 'T'

    # chase head up
    elif hx == tx and hy - ty > 1:
        diagram[ty][tx] = '.'
        ty += 1
        diagram[ty][tx] = 'T'

    # chase head down
    elif hx == tx and hy - ty < -1:
        diagram[ty][tx] = '.'
        ty -= 1
        diagram[ty][tx] = 'T'

    # chase head up and right
    elif ((hy-ty == 2) and (hx-tx == 1)) or ((hy-ty == 1) and (hx-tx == 2)):
        # need to move diagonally
        diagram[ty][tx] = '.'
        ty += 1
        tx += 1
        diagram[ty][tx] = 'T'

    # chase head up and left
    elif ((hy-ty == 1) and (hx-tx == -2)) or ((hy-ty == 2) and (hx-tx == -1)):
        diagram[ty][tx] = '.'
        ty += 1
        tx -= 1
        diagram[ty][tx] = 'T'

    # chase head down and right
    elif ((hy-ty == -1) and (hx-tx == 2)) or ((hy-ty == -2) and (hx-tx == 1)):
        # need to move diagonally
        diagram[ty][tx] = '.'
        ty -= 1
        tx += 1
        diagram[ty][tx] = 'T'

    # chase head down and left
    elif ((hy-ty == -1) and (hx-tx == -2)) or ((hy-ty == -2) and (hx-tx == -1)):
        diagram[ty][tx] = '.'
        ty -= 1
        tx -= 1
        diagram[ty][tx] = 'T'

    elif hy == ty and hx == tx:
        # overlap, do nothing
        diagram[ty][tx] = 'H'

    else:
        # diagonal, do nothing
        diagram[ty][tx] = 'T'

    t_history.add(f'{tx},{ty}')

    # printable = diagram
    # print('\n'.join([''.join([str(cell) for cell in row])
    #       for row in np.flipud(printable)]))
    # print(len(t_history))
    # print('------------------------------------------')


for line in lines:
    # time.sleep(0.1)
    direction, steps = line.split(' ')

    if direction == 'R':
        for step in range(int(steps)):
            diagram[hy][hx] = '.'
            hx += 1
            try:
                diagram[hy][hx] = 'H'
            except IndexError:
                for col in diagram:
                    col.extend(['.'])
                diagram[hy][hx] = 'H'
            move_tail()

    if direction == 'U':
        for step in range(int(steps)):
            diagram[hy][hx] = '.'
            hy += 1
            try:
                diagram[hy][hx] = 'H'
            except IndexError:
                diagram.append(['.']*(len(diagram[hy-1])))
                diagram[hy][hx] = 'H'
            move_tail()

    if direction == 'L':
        for step in range(int(steps)):
            diagram[hy][hx] = '.'
            hx -= 1
            if hx == -1:
                for col in diagram:
                    col.insert(0, '.')
                hx += 1
                tx += 1
                # shift the set record of visited coords
                t_history = set(map(shift_coord_right, t_history))

            diagram[hy][hx] = 'H'
            move_tail()

    if direction == 'D':
        for step in range(int(steps)):
            diagram[hy][hx] = '.'
            hy -= 1
            if hy == -1:
                diagram.insert(0, ['.']*(len(diagram[0])))
                hy += 1
                ty += 1
                t_history = set(map(shift_coord_up, t_history))

            diagram[hy][hx] = 'H'
            move_tail()

print(len(t_history))
