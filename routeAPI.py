import os
from dotenv import load_dotenv
import random
import requests
import json
from concurrent.futures import ThreadPoolExecutor
import polyline
import math
# Load environment variables
load_dotenv()

# API key and base URL
API_KEY = os.getenv('API_KEY')  # Ensure your .env file contains your API key
BASE_URL = 'https://api.openrouteservice.org/'

# Coordinates: [longitude, latitude]
# origin = [-80.524495, 43.474348]  # Example: Some place in Waterloo
# destination = [-80.536208, 43.470579]  # Example: Another place in Waterloo
origin = [-79.380085, 43.654380]  # Example: Some place in Toronto
destination = [-79.400592, 43.664913]  # Example: Another place in Toronto

def fetch_route_no_waypoints(origin, destination, avoid_features=None):
    url = BASE_URL + 'v2/directions/foot-walking'
    payload = {
        'coordinates': [origin, destination],  # Direct coordinates between origin and destination
        'options': {
            'avoid_features': avoid_features or []
        }
    }
    headers = {
        'Authorization': API_KEY
    }
    response = requests.post(url, json=payload, headers=headers)
    if response.status_code == 200:
        print(response)
        return response
    else:
        print(f"Error: {response.status_code}, {response.text}")
        return None

def fetch_route(origin, destination, waypoint, avoid_features=None):
    coords = [origin, waypoint, destination]  # Include the waypoint
    url = BASE_URL + 'v2/directions/foot-walking'
    payload = {
        'coordinates': coords,
        'options': {
            'avoid_features': avoid_features or []
        },
        "continue_straight": "true",
        "radiuses": [5,754,5],
        
    }
    headers = {
        'Authorization': API_KEY
    }
    response = requests.post(url, json=payload, headers=headers)
    if response.status_code == 200:
        return response
    else:
        print(f"Error: {response.status_code}, {response.text}")
        return None

# Function to get multiple routes in parallel
def get_route(origin, destination, waypoints, avoid_features=None):
    with ThreadPoolExecutor() as executor:
        # Submit fetch_route for each waypoint
        future_to_waypoint = {
            executor.submit(fetch_route, origin, destination, waypoint, avoid_features): waypoint
            for waypoint in waypoints
        }
        results = []
        for future in future_to_waypoint:
            try:
                response = future.result()  # Wait for the future to complete
                if response:
                    results.append(response)
            except Exception as e:
                print(f"Error fetching route for waypoint {future_to_waypoint[future]}: {e}")
    return results

# Generate random waypoints near a midpoint
def calculate_vectors(origin, destination):
    # Vector v1 (between origin and destination)
    v1 = [destination[0] - origin[0], destination[1] - origin[1]]
    
    # Perpendicular vector v2 (90-degree rotation of v1)
    v2 = [-v1[1], v1[0]]  # Rotate v1 counterclockwise 90 degrees
    
    return v1, v2

# Function to generate random waypoints inside the elliptical area
def generate_random_waypoints(midpoint, v1, v2, r1, r2, count):
    """
    Generates n points uniformly distributed along a line parallel to v2,
    passing through the midpoint, and spanning a total length of 2 * r2.

    :param midpoint: The center point of the line (the midpoint where the line intersects).
    :param v2: The direction vector of the line.
    :param r2: The semi-minor axis length (spanning from -r2 to r2).
    :param n: The number of points to generate.
    :return: A list of n points along the line.
    """
    points = []
    
    # Normalize the v2 direction vector
    length_v2 = math.hypot(v2[0], v2[1])  # Length of v2
    v2_normalized = [v2[0] / length_v2, v2[1] / length_v2]  # Unit vector in the direction of v2
    
    # Calculate the distance between points
    step_size = 2 * r2 / (count - 1)  # Evenly distribute points between -r2 and +r2
    
    # Generate the n points
    for i in range(count):
        # Calculate the distance from the midpoint for this point
        distance = -r2 + i * step_size
        
        # Calculate the new point by moving from the midpoint along the direction of v2
        x = midpoint[0] + distance * v2_normalized[0]
        y = midpoint[1] + distance * v2_normalized[1]
        
        points.append([x, y])
    
    snapped_points = snap_to_road(points)
    return snapped_points

# Function to snap a point to the road network
def snap_to_road(points, radius=350):
    url = BASE_URL + 'v2/snap/foot-walking'
    
    body = {
        "locations": points,
        "radius": radius, 
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
            snapped_locations = []
            for location in snapped_point['locations']:
                print(f"{location['location']},")
                snapped_locations.append(location['location'])
            return snapped_locations
        else:
            print(f"Failed to snap point: {points}")
            return None
    else:
        print(f"Error: {response.status_code}, {response.text}")
        return None

# Generate an arbitrary number of routes
def route_generator(origin, destination):
    v1, v2 = calculate_vectors(origin, destination)
    midpoint = [(origin[0] + destination[0]) / 2, (origin[1] + destination[1]) / 2]
    waypoint = generate_random_waypoints(
        midpoint=midpoint,
        v1=v1,
        v2=v2,
        r1=0.001,
        r2 = 0.004,
        count=7
    )
    routes = get_route(origin, destination, waypoints=waypoint)
    # print(routes)
    routes.append(fetch_route_no_waypoints(origin, destination))
    return routes

# Print routes for debugging purposes
def print_routes(routes):
    for i, route_response in enumerate(routes):
        if route_response:
            try:
                # Parse the JSON response content
                route_data = route_response.json()
                
                # Ensure 'routes' is in the response
                if 'routes' not in route_data or not route_data['routes']:
                    print(f"Route {i + 1}: No routes found in the response.")
                    continue
                
                # Accessing route summary for distance and duration
                summary = route_data['routes'][0]['summary']
                duration = summary['duration']  # Total duration in seconds
                distance = summary['distance']  # Total distance in meters
                print(f"Route {i + 1} duration: {duration / 60:.2f} minutes")
                print(f"Route Distance: {distance / 1000:.2f} km")

                # Accessing the segments for detailed steps
                for segment_index, segment in enumerate(route_data['routes'][0]['segments']):
                    print(f"Segment {segment_index + 1}:")
                    for step in segment['steps']:
                        instruction = step['instruction']
                        print(f"  - {instruction}")

            except KeyError as e:
                # Handle missing keys gracefully
                print(f"Error accessing route data: Missing key {e} in route {i + 1}")
                print(route_response.json())  # Print the full parsed route to help diagnose the issue
            except json.JSONDecodeError:
                # Handle invalid JSON response
                print(f"Error decoding JSON for route {i + 1}")
                print(route_response.text)

# Example usage for debugging purposes
# print_routes(route_generator(origin, destination))

# Function to save route data to a file
def save_routes_to_file(routes, filename="routes.json"):
    route_data = []
    for route in routes:
        try:
            routes = route.json()
            # Extract the coordinates
            geometry = routes["routes"][0]["geometry"]
            coordinates = polyline.decode(geometry)
            route_data.append(coordinates)
            #route_data.append(geometry)
        except KeyError as e:
            print(f"Error extracting route data: {e}")
            print(route)  # Log problematic route for debugging
        except TypeError as e:
            print(f"Error: Route data format is incorrect: {e}")
            print(route)  # Log problematic route for debugging
    
    # Save to a JSON file
    with open(filename, "w") as file:
        json.dump(route_data, file)
    print(f"Route data saved to {filename}")

def route_reader_for_index(routes, filename="test.json"):
    route_data = []
    for route in routes:
        bigSet = {}
        try: 
            route_response = route.json()
            # Extract detailed directions
            directions = []
            segments = route_response['routes'][0]['segments']
            for segment in segments:
                for step in segment['steps']:
                    # Format the string with key information
                    instruction = step.get('instruction', 'No instruction available')
                    distance = step.get('distance', 0)  # Distance in meters
                    duration = step.get('duration', 0)  # Duration in seconds
                    road_name = step.get('name', 'Unknown road')
                    
                    # Build a readable sentence
                    if distance != 0 and duration != 0:
                        direction_text = (
                            f"{instruction} {f'onto {road_name}' if not road_name else ''}"
                            f"in {distance:.0f} meters "
                            f"({duration:.0f} seconds)."
                        )
                        directions.append(direction_text)

            # Extract the coordinates
            geometry = route_response["routes"][0]["geometry"]
            coordinates = polyline.decode(geometry)
            summary = route_response['routes'][0]['summary']
            duration = summary['duration']  # Total duration in seconds
            distance = summary['distance']  # Total distance in meters

            bigSet["duration"] = duration
            bigSet["distance"] = distance
            bigSet["coordinates"] = coordinates
            bigSet["directions"] = directions
        except KeyError as e:
            print(f"Error extracting route data: {e}")
            print(route)  # Log problematic route for debugging
        except TypeError as e:
            print(f"Error: Route data format is incorrect: {e}")
            print(route)  # Log problematic route for debugging
        route_data.append(bigSet)

    return route_data
