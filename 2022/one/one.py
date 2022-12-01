lines = open("input.txt")

max = 0
curr = 0

for line in lines:
    try:
        curr += int(line)
    except:
        max = curr if curr > max else max
        curr = 0

print(max)
