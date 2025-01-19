from pymongo import MongoClient
import os
from dotenv import load_dotenv
import json
load_dotenv()
username = os.getenv("DB_USERNAME")
password = os.getenv("DB_PASSWORD")

cluster = MongoClient(f"mongodb+srv://{username}:{password}@hackunited.ajckk.mongodb.net/?retryWrites=true&w=majority&appName=HackUnited")
db=cluster["GeoGuard"]
collection = db["Crime"]

with open(os.path.join(os.path.dirname(__file__), '..', 'routes.json')) as f:
    routes = json.load(f)
#print(len(routes))
#print(routes[0])
bigData = []
for route in routes:
        for point in route:
            nearby_locations = collection.find({
                "location": {
                    "$near": {
                        "$geometry": {
                            "type": "Point",
                            "coordinates": point[::-1]
                        },
                        "$maxDistance": 50  # 200 meters
                    }
                }
            })
            bigData.append([point[::-1], nearby_locations])
