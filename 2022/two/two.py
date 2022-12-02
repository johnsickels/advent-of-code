rounds = open("input.txt")

# A for Rock, B for Paper, and C for Scissors
# X means you need to lose, Y means you need to end the round in a draw, and Z means you need to win
# 1 for Rock, 2 for Paper, and 3 for Scissors
# 0 if you lost, 3 if the round was a draw, and 6 if you won

score = 0

for round in rounds:
    round = round.rstrip()

    if round == 'A X':
        # lose and scissors
        score += 3
    if round == 'A Y':
        # draw and rock
        score += (3 + 1)
    if round == 'A Z':
        # win and paper
        score += (6 + 2)
    if round == 'B X':
        # lose and rock
        score += 1
    if round == 'B Y':
        # draw and paper
        score += (3 + 2)
    if round == 'B Z':
        # win and scissors
        score += (6 + 3)
    if round == 'C X':
        # lose and paper
        score += 2
    if round == 'C Y':
        # draw and scissors
        score += (3 + 3)
    if round == 'C Z':
        # win and rock
        score += (6 + 1)


print(score)
