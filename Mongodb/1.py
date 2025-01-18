# File for getting all the unique offenses and their counts from the MajorCrimes.csv file

import csv
from collections import defaultdict

def extract_offense_counts(csv_file):
    offense_counts = defaultdict(int)  # Default dictionary to store counts
    
    with open(csv_file, mode='r', encoding='utf-8') as file:
        reader = csv.DictReader(file)
        
        # Iterate over each row and update the offense count
        for row in reader:
            offense = row['OFFENCE']
            offense_counts[offense] += 1
    
    return dict(offense_counts)

# Example usage:
csv_file = 'MajorCrimes.csv'
offense_counts = extract_offense_counts(csv_file)
print(offense_counts)
