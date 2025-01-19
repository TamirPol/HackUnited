import folium

def plot_best_route(route_data, output_file="best_route_map.html"):
    """
    Plots the best route on a Folium map and saves it as an HTML file.

    Args:
        route_data (dict): Dictionary containing the route information, including 'coordinates' as a list of [latitude, longitude] pairs.
        output_file (str): Name of the output HTML file to save the map.
    """
    # Extract the coordinates of the best route
    best_route = route_data['coordinates']

    # Validate the structure of the best route
    if not isinstance(best_route, list) or not all(isinstance(item, tuple) and len(item) == 2 for item in best_route):
        raise ValueError("'coordinates' must be a list of [latitude, longitude] pairs.")

    # Create a base map centered around the first point of the best route
    start_point = best_route[0]
    m = folium.Map(location=start_point, zoom_start=14)

    # Add the best route to the map
    folium.PolyLine(
        locations=best_route,  # Route is a list of [latitude, longitude] pairs
        color="blue",
        weight=5,
        opacity=0.8
    ).add_to(m)

    # Add markers for the start and end points of the best route
    folium.Marker(location=best_route[0], popup="Start", icon=folium.Icon(color="green")).add_to(m)
    folium.Marker(location=best_route[-1], popup="End", icon=folium.Icon(color="red")).add_to(m)

    # Save the map to an HTML file
    m.save(output_file)
    print(f"Map saved to {output_file}")
