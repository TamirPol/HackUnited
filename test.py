import json

# Load the JSON file
with open('routes.json', 'r') as file:
    data = json.load(file)  # Use json.load to parse the file content

# Extract the first and last value from each sub-array
first_and_last = [(item[0], item[-1]) for item in data if len(item) >= 2]

# Print the result
print(first_and_last)
