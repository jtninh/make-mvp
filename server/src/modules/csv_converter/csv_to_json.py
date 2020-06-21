import csv
import json

def convert_csv_to_json(file):
    data = []
    for row in csv.DictReader(file):
        obj = {}
        for key, value in row.items():
            obj[key] = value
        data.append(obj)

    return data
