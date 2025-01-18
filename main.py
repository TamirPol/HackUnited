import os
from dotenv import load_dotenv
import random
import requests
import json
from concurrent.futures import ThreadPoolExecutor
import polyline
# Load environment variables
load_dotenv()

# API key and base URL
API_KEY = os.getenv('API_KEY')  # Ensure your .env file contains your API key
BASE_URL = 'https://api.openrouteservice.org/'

# Coordinates: [longitude, latitude]
origin = [-80.524495, 43.474348]  # Example: Some place in Waterloo
destination = [-80.536208, 43.470579]  # Example: Another place in Waterloo

# Function to get a route between origin and destination (Single Threaded)
# def get_route(origin, destination, waypoints=None, avoid_features=None):
#     random_routes = []
#     for waypoint in waypoints:
#         coords = ([origin] + [waypoint] + [destination])
    
#         # Define the URL for the directions API
#         url = BASE_URL + 'v2/directions/foot-walking'
        
#         # Define the payload (coordinates and options)
#         payload = {
#             'coordinates': coords,
#             'options': {
#                 'avoid_features': avoid_features or []
#             }
#         }
        
#         # Send the request with API key
#         headers = {
#             'Authorization': API_KEY
#         }
        
#         response = requests.post(url, json=payload, headers=headers)
    
#     # Parse the response
#         if response.status_code == 200:
#             random_routes.append(response)
#         else:
#             print(f"Error: {response.status_code}, {response.text}")
#     return random_routes

# Function to fetch a route for a specific waypoint
def fetch_route(origin, destination, waypoint, avoid_features=None):
    coords = [origin, waypoint, destination]  # Include the waypoint
    url = BASE_URL + 'v2/directions/foot-walking'
    payload = {
        'coordinates': coords,
        'options': {
            'avoid_features': avoid_features or []
        }
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
def generate_random_waypoints(midpoint, radius, count):
    points = []
    for _ in range(count):
        # Generate a random coordinate within the radius
        offset_lon = random.uniform(-radius, radius)
        offset_lat = random.uniform(-radius, radius)
        point = [midpoint[0] + offset_lon, midpoint[1] + offset_lat]

        # Snap the point to the road network using the Snap API
        points.append(point)
    snapped_points = snap_to_road(points, radius)
   

    return snapped_points

# Function to snap a point to the road network
def snap_to_road(points, radius=350):
    url = BASE_URL + 'v2/snap/foot-walking'
    
    body = {
        "locations": points,
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
            snapped_locations = []
            for location in snapped_point['locations']:
                print(f"Snapped Location: {location['location']}")
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
    
    waypoint = generate_random_waypoints(
        midpoint=[(origin[0] + destination[0]) / 2, (origin[1] + destination[1]) / 2],
        radius=0.001,
        count=10
    )
    routes = get_route(origin, destination, waypoints=waypoint)
        
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

# Example usage after generating routes
routes = route_generator(origin, destination)
save_routes_to_file(routes)
