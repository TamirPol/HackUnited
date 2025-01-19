import json
import requests

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