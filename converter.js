const converterCoords = (coords) => {
    return coords.map(coord => ({
      latitude: coord[0],
      longitude: coord[1],
    }));
  };

  const convertRoutes = (routes) => {
    // Convert the 'best' route coordinates
    const bestRoute = convertCoordinates(routes.best.coordinates);
  
    // Convert the 'fastest' route coordinates
    const fastestRoute = convertCoordinates(routes.fastest.coordinates);
  
    // Convert the 'alternatives' routes
    const alternativeRoutes = routes.alternatives.map(route => 
      convertCoordinates(route.coordinates)
    );
  
    // Return all the routes as a list of lists of coordinates
    return [bestRoute, fastestRoute, ...alternativeRoutes];
  };