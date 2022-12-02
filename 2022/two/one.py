rounds = open("input.txt")

# A for Rock, B for Paper, and C for Scissors
# X for Rock, Y for Paper, and Z for Scissors
# 1 for Rock, 2 for Paper, and 3 for Scissors
# 0 if you lost, 3 if the round was a draw, and 6 if you won

score = 0

for round in rounds:
    round = round.rstrip()

    # if win
    if round in ['A Y', 'B Z', 'C X']:
        score += 6

    # if draw
    if round in ['A X', 'B Y', 'C Z']:
        score += 3

    shape = round[2]

    if shape == 'X':
        score += 1

    if shape == 'Y':
        score += 2

    if shape == 'Z':
        score += 3

print(score)
