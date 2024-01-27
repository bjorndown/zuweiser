import csv
import random

new_rows = []

with open('parts.csv') as csvfile:
    rows = csv.reader(csvfile, delimiter='\t')
    for row in rows:
        row.extend(random.sample([str(i) for i in range(1,11) if str(i) not in row[3:]], 2))
        new_rows.append(row)

with open('parts_extended.csv', 'w') as csvfile:
    writer = csv.writer(csvfile, delimiter='\t')
    writer.writerows(new_rows)
