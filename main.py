import os
from dotenv import load_dotenv
import random
import requests
import json

# Load environment variables
load_dotenv()

# API key and base URL
API_KEY = os.getenv('API_KEYS')  # Ensure your .env file contains your API key
BASE_URL = 'https://api.openrouteservice.org/'

# Coordinates: [longitude, latitude]
origin = [-80.524495, 43.474348]  # Example: Some place in Waterloo
destination = [-80.536208, 43.470579]  # Example: Another place in Waterloo

# Function to get a route between origin and destination
def get_route(origin, destination, waypoints=None, avoid_features=None):
    coords = [origin] + (waypoints or []) + [destination]
    
    # Define the URL for the directions API
    url = BASE_URL + 'v2/directions/foot-walking'
    
    # Define the payload (coordinates and options)
    payload = {
        'coordinates': coords,
        'options': {
            'avoid_features': avoid_features or []
        }
    }
    
    # Send the request with API key
    headers = {
        'Authorization': API_KEY
    }
    
    response = requests.post(url, json=payload, headers=headers)
    
    # Parse the response
    if response.status_code == 200:
        return response.json()
    else:
        print(f"Error: {response.status_code}, {response.text}")
        return None

# Generate random waypoints near a midpoint
def generate_random_waypoints(midpoint, radius, count):
    waypoints = []
    for _ in range(count):
        # Generate a random coordinate within the radius
        offset_lon = random.uniform(-radius, radius)
        offset_lat = random.uniform(-radius, radius)
        point = [midpoint[0] + offset_lon, midpoint[1] + offset_lat]

        # Snap the point to the road network using the Snap API
        snapped_point = snap_to_road(point, radius)
        if snapped_point:
            waypoints.append(snapped_point)

    return waypoints

# Function to snap a point to the road network
def snap_to_road(point, radius=350):
    url = BASE_URL + 'v2/snap/foot-walking'
    
    body = {
        "locations": [point],
        "radius": 350
    }
    
    headers = {
        'Accept': 'application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8',
        'Authorization': API_KEY,
        'Content-Type': 'application/json; charset=utf-8'
    }

    response = requests.post(url, json=body, headers=headers)
    
    if response.status_code == 200:
        snapped_point = response.json()
        if 'locations' in snapped_point and snapped_point['locations']:
            snapped_location = snapped_point['locations'][0]['location']
            print(f"Snapped Location: {snapped_location}")
            return snapped_location
        else:
            print(f"Failed to snap point: {point}")
            return None
    else:
        print(f"Error: {response.status_code}, {response.text}")
        return None

# Generate an arbitrary number of routes
def route_generator(origin, destination, count=10):
    routes = []
    for _ in range(count):
        waypoint = generate_random_waypoints(
            midpoint=[(origin[0] + destination[0]) / 2, (origin[1] + destination[1]) / 2],
            radius=0.01,
            count=1
        )
        route = get_route(origin, destination, waypoints=waypoint)
        if route:
            routes.append(route)
    return routes

# Print routes for debugging purposes
def print_routes(routes):
    for i, route in enumerate(routes):
        if route:
            try:
                # Accessing route summary for distance and duration
                summary = route['routes'][0]['summary']
                duration = summary['duration']  # Total duration in seconds
                distance = summary['distance']  # Total distance in meters
                print(f"Route {i + 1} duration: {duration / 60:.2f} minutes")
                print(f"Route Distance: {distance / 1000:.2f} km")

                # Accessing the segments for detailed steps
                for segment_index, segment in enumerate(route['routes'][0]['segments']):
                    print(f"Segment {segment_index + 1}:")
                    for step in segment['steps']:
                        instruction = step['instruction']
                        print(f"  - {instruction}")

            except KeyError as e:
                # Handle missing keys gracefully
                print(f"Error accessing route data: Missing key {e} in route {i + 1}")
                print(route)  # Print the full route to help diagnose the issue


# Example usage
print_routes(route_generator(origin, destination))
