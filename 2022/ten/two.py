lines = open('input.txt')

sprite_position = 1
sprite_row = -1
cycle = 0
screen = []


def draw_pixel():
    global sprite_row
    if not cycle % 40:
        sprite_row += 1
        screen.append([])

    if (abs(sprite_position - (cycle % 40)) < 2):
        screen[sprite_row].append('#')
    else:
        screen[sprite_row].append('.')


for line in lines:
    if line.startswith('addx'):
        _, value = line.split(' ')
        draw_pixel()
        cycle += 1
        draw_pixel()
        cycle += 1
        sprite_position += int(value)
    else:
        draw_pixel()
        cycle += 1

print('\n'.join([''.join([str(cell) for cell in row]) for row in screen]))
