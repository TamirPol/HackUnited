import os
from dotenv import load_dotenv
import openrouteservice
import random

# Initialize the client with your API key
load_dotenv()
client = openrouteservice.Client(key=os.getenv('API_KEY'))

# Coordinates: [longitude, latitude]
origin = [-80.524495, 43.474348]  # Example: Some place in Waterloo
destination = [ -80.536208, 43.470579]  # Example: Another place in Waterloo

# Get route between origin and destination
def get_route(origin, destination, waypoints=None, avoid_features=None): 
    coords = [origin] + (waypoints or []) + [destination]
    route = client.directions(
        coordinates=coords,
        profile='foot-walking', 
        format='geojson',
        options={
            "avoid_features": avoid_features or []
        }
    )
    return route

# Generate random waypoints near a midpoint
def generate_random_waypoints(midpoint, radius, count):
    waypoints = []
    for _ in range(count):
        offset_lon = random.uniform(-radius, radius)
        offset_lat = random.uniform(-radius, radius)
        waypoints.append([midpoint[0] + offset_lon, midpoint[1] + offset_lat])
    return waypoints

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
        routes.append(route)
    return routes

# Print routes for debugging purposes
def print_routes(routes): 
    for i, route in enumerate(routes):
        duration = route['features'][0]['properties']['segments'][0]['duration'] # self-explanatory
        geometry = route['features'][0]['geometry']['coordinates'] # Extracts route geometry (coordinates)
        print(f"Route {i + 1} duration: {duration / 60:.2f} minutes")
        start_coords = geometry[0]
        end_coords = geometry[-1]
        print(f"Start Coordinates: {start_coords}")
        print(f"End Coordinates: {end_coords}")
        distance = route['features'][0]['properties']['segments'][0]['distance']  # Distance in meters
        print(f"Route Distance: {distance / 1000:.2f} km")

print_routes(route_generator(origin, destination))
