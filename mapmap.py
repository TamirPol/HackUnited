import folium
import json

# Load the JSON file with route data
with open("routes.json", "r") as file:
    routes = json.load(file)

# New snapped locations
snapped_locations = [
   [-79.388781, 43.662876],
[-79.3891, 43.661971],
[-79.389944, 43.660655],
[-79.390361, 43.659642],
[-79.390949, 43.658464],
[-79.391328, 43.6575],
[-79.392177, 43.656086]
]

# Create a base map centered around the first route's starting point
start_point = routes[0][0]  # First route's first point
m = folium.Map(location=start_point, zoom_start=14)

# Add each route to the map
for route in routes:
    folium.PolyLine(
        locations=route,  # Route is a list of [latitude, longitude] pairs
        color="blue",
        weight=3,
        opacity=0.8
    ).add_to(m)

    # Optionally, add markers for the start and end points
    folium.Marker(location=route[0], popup="Route Start", icon=folium.Icon(color="green")).add_to(m)
    folium.Marker(location=route[-1], popup="Route End", icon=folium.Icon(color="red")).add_to(m)

# Add snapped locations to the map
for loc in snapped_locations:
    folium.Marker(
        location=[loc[1], loc[0]],  # Folium expects [latitude, longitude]
        popup=f"Snapped Location: {loc}",
        icon=folium.Icon(color="purple", icon="info-sign")
    ).add_to(m)

# Save the map to an HTML file
m.save("routes_and_new_snapped_locations_map.html")
print("Map saved to routes_and_new_snapped_locations_map.html")
