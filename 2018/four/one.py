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
            sleep_dict[current_guard_id]['total_minutes_asleep'] = sleep_dict[current_guard_id].get(
                'total_minutes_asleep', 0) + 1

            if min in sleep_dict[current_guard_id]:
                sleep_dict[current_guard_id][min] += 1

            else:
                sleep_dict[current_guard_id][min] = 1
        # sleep_dict[current_guard_id]

print(sleep_dict)

sleepiest_id, sleepiest_dict = sorted(sleep_dict.items(),
                                      key=lambda x: x[1]['total_minutes_asleep'])[-1]

del sleepiest_dict['total_minutes_asleep']

most_frequent_minute_asleep = max(sleepiest_dict, key=sleepiest_dict.get)

print(sleepiest_dict)
print(sleepiest_id)
print(most_frequent_minute_asleep)
print(sleepiest_id * most_frequent_minute_asleep)
