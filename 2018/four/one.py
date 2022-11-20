import re

f = sorted(open("input.txt"))

sleep_dict = {}
current_guard_id = None
fell_asleep_at = None

{
    '2707': {
        'total_minutes_asleep': 35,
        '22': 1,
        '23': 1,
        '24': 1,
        '25': 1,
        '26': 1,
        '27': 1,
        # ....
    }
}

for log in f:

    if 'begins shift' in log:
        gaurd_id_regex = r"(?<=\#).+?(?=\s)"
        current_guard_id = int(re.search(gaurd_id_regex, log).group())

    elif 'falls asleep' in log:
        minute_regex = r"(?<=\:).+?(?=\])"
        fell_asleep_at = int(re.search(minute_regex, log).group())

    elif 'wakes up' in log:
        minute_regex = r"(?<=\:).+?(?=\])"
        wakes_up_at = int(re.search(minute_regex, log).group())

        # print(fell_asleep_at, wakes_up_at,
        #       f'total minutes asleep {int(wakes_up_at)-int(fell_asleep_at)}')

        if current_guard_id not in sleep_dict:
            sleep_dict[current_guard_id] = {}

        for min in range(fell_asleep_at, wakes_up_at):
            # PART ONE
            # sleep_dict[current_guard_id]['total_minutes_asleep'] = sleep_dict[current_guard_id].get(
            #     'total_minutes_asleep', 0) + 1

            if min in sleep_dict[current_guard_id]:
                sleep_dict[current_guard_id][min] += 1

            else:
                sleep_dict[current_guard_id][min] = 1

print(sleep_dict)

###########
# PART ONE
###########
# sleepiest_id, sleepiest_dict = sorted(sleep_dict.items(),
#                                       key=lambda x: x[1]['total_minutes_asleep'])[-1]

# del sleepiest_dict['total_minutes_asleep']

# most_frequent_minute_asleep = max(sleepiest_dict, key=sleepiest_dict.get)

# print(sleepiest_id * most_frequent_minute_asleep)


###########
# PART TWO
###########
# print(max(dict["City"].items(), key=lambda x: x[1]['n_trips'])[0])
# print(max(sleep_dict.items(), key=lambda x: x[1]['n_trips'])[0])
max_amount = 0
sleepiest_guard = None
sleepiest_minute = None
for gaurd_id, minute_dict in sleep_dict.items():
    for minute, amount in minute_dict.items():
        if amount > max_amount:
            max_amount = amount
            sleepiest_guard = gaurd_id
            sleepiest_minute = minute
print(sleepiest_guard * sleepiest_minute)
