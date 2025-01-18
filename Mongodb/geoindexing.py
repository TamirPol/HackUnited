# Test file for the geoindexing of the crimes

from pymongo import MongoClient
import os
from dotenv import load_dotenv
load_dotenv()
username = os.getenv("DB_USERNAME")
password = os.getenv("DB_PASSWORD")

cluster = MongoClient(f"mongodb+srv://{username}:{password}@hackunited.ajckk.mongodb.net/?retryWrites=true&w=majority&appName=HackUnited")
db=cluster["GeoGuard"]
collection = db["Crime"]

# Define CN Tower coordinates
cn_tower_coords = [-79.3871, 43.6426]

# Perform $geoNear query
nearby_locations = collection.find({
    "location": {
        "$near": {
            "$geometry": {
                "type": "Point",
                "coordinates": cn_tower_coords
            },
            "$maxDistance": 200  # 5 km in meters
        }
    }
})

# Print results
print("Locations within 5 km of CN Tower:")
print(nearby_locations)
for location in nearby_locations:
    print(location)