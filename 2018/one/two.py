starting_frequency = 0
starting_frequencies = {0}


def main(current_frequency, frequencies):
    f = open("input.txt")
    for x in f:
        current_frequency += int(x)
        if current_frequency in frequencies:
            print(current_frequency)
            return current_frequency
        frequencies.add(current_frequency)

    main(current_frequency, frequencies)


main(starting_frequency, starting_frequencies)
