# A file that connects to the MongoDB database and inserts the data from the MajorCrimes.csv file into the database.

from pymongo import MongoClient
from dotenv import load_dotenv
import os
import datetime
import csv
import json

load_dotenv()
username = os.getenv("DB_USERNAME")
password = os.getenv("DB_PASSWORD")

cluster = MongoClient(f"mongodb+srv://{username}:{password}@hackunited.ajckk.mongodb.net/?retryWrites=true&w=majority&appName=HackUnited")
db=cluster["GeoGuard"]
collection = db["Crime"]
collection.delete_many({})
print("Deleted all documents in the collection.")
# Document description:
    # location: GeoJSON Point
        # type: Point
        # coordinates: [longitude, latitude]
    # datetime: datetime
    # crime: string
    # dangerousness: int

crimeseverity = "crime_severity_weights.json"
with open(crimeseverity, "r") as json_file:
    crime_severity = json.load(json_file)

documents = []

dateTimeFormat = "%m/%d/%Y %I:%M:%S %p"
with open("MajorCrimes.csv", "r") as csv_file:
    reader = csv.reader(csv_file)
    next(reader)
    for i, row in enumerate(reader):
        crime_id = row[0]
        occDate = datetime.datetime.strptime(row[3], dateTimeFormat)
        crime = row[21]
        long = float(row[27])
        lat = float(row[28])
        dangerousness = crime_severity[crime]
        if lat != 0 and long != 0:
            document = {
                "location": {
                    "type": "Point",
                    "coordinates": [long, lat]
                },
                "datetime": occDate,
                "crime": crime,
                "dangerousness": dangerousness
            }
            documents.append(document)

# Bulk insert all documents at once
if documents:
    collection.insert_many(documents)
    print(f"Inserted {len(documents)} documents successfully!")
else:
    print("No data to insert.")