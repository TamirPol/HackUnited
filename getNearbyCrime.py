from pymongo import MongoClient
import os
from dotenv import load_dotenv
import json
import sys
import routeAPI
load_dotenv()
username = os.getenv("DB_USERNAME")
password = os.getenv("DB_PASSWORD")

cluster = MongoClient(f"mongodb+srv://{username}:{password}@hackunited.ajckk.mongodb.net/?retryWrites=true&w=majority&appName=HackUnited")
db=cluster["GeoGuard"]
collection = db["Crime"]

#sys.path.append(os.path.abspath(os.path.join(os.path.dirname("routeAPI.py"), '../')))

def getNearbyCrime(origin, destination):
    routes = routeAPI.route_generator(origin, destination)
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
    return bigData

print(getNearbyCrime([-79.380085, 43.654380], [-79.400592, 43.664913]))