lines = open('input.txt')

register = 1
cycle = 0
signal_strength_sum = 0


def check_signal_strength():
    global signal_strength_sum
    if cycle in [20, 60, 100, 140, 180, 220]:
        signal_strength_sum += cycle * register


for line in lines:
    if line.startswith('addx'):
        _, value = line.split(' ')
        cycle += 1
        check_signal_strength()
        cycle += 1
        check_signal_strength()
        register += int(value)
    else:
        cycle += 1
        check_signal_strength()

print(signal_strength_sum)
