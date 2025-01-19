const converterCoords = (coords) => {
    return coords.map(coord => ({
      latitude: coord[0],
      longitude: coord[1],
    }));
};

const convertRoutes = (routes) => {
    const bestRoute = convertCoordinates(routes.best.coordinates);
    const fastestRoute = convertCoordinates(routes.fastest.coordinates);
    const alternativeRoutes = routes.alternatives.map(route => 
      convertCoordinates(route.coordinates)
    );
    return [bestRoute, fastestRoute, ...alternativeRoutes];
};

// Export converterCoords as the default export
export default converterCoords;
