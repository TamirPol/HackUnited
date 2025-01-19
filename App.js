import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import MapView, { Polyline, Marker } from 'react-native-maps';
import NavBar from './NavBar';
import Searchbar from './Searchbar';
import converterCoords from './converter';
import Go from './Go';

// Get screen dimensions
const { height } = Dimensions.get('window');

const update_enabled_route = (enabled_route, index) => {
  const updatedRoute = [...enabled_route];
  updatedRoute.fill(0); // Reset all routes to 0
  updatedRoute[index] = 1; // Set the selected route to 1
  console.log(updatedRoute); // Log to check the updated enabled_route
};

export default function App() {
  const [origin, setOrigin] = useState([-79.380085, 43.654380]);
  const [arr, setArr] = useState(null);
  const [dest, setDest] = useState([-79.3883, 43.6548]);
  const [disp, setDisp] = useState(-1);

  // Handle API call and state update
  const callFlaskAPI = async (destination, origin) => {
    const apiUrl = 'https://f287-129-97-125-166.ngrok-free.app/get-routes';
    if (!origin || !destination) return null;

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json', // Explicitly set the accept header
        },
        body: JSON.stringify({ start: origin, destination }),
        credentials: 'include',
      });
      if (response.ok) {
        return await response.json();
      } else {
        console.error('Error:', response.status, await response.text());
      }
    } catch (error) {
      console.error('Error calling Flask API:', error);
    }
  };

  // Handle Search and Update Destination
  const handleSearch = async (destination) => {
    setDest(destination); // Set new destination
    const apiResult = await callFlaskAPI(destination, origin); // Call the API
    setArr(apiResult); // Update the state with the API result
    console.log('Updated arr:', apiResult);
  };

  useEffect(() => {
    console.log('Destination changed, updating map region.'); // Log changes
  }, [dest]); // Trigger on change of dest

  const enableRoute = (index) => {
    setDisp(index); // Update the selected route
  };

  return (
    <View style={styles.topHalfContainer}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: dest[1],
          longitude: dest[0],
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        region={{
          latitude: dest[1] - 0.002,
          longitude: dest[0],
          latitudeDelta: 0.00922,
          longitudeDelta: 0.00422,
        }}
      >
        <>
          <Marker coordinate={{ latitude: origin[0], longitude: origin[1] }} />
          <Marker coordinate={{ latitude: dest[0], longitude: dest[1] }} />

          {arr && arr.best && arr.best.coordinates && (
            <>
              {disp === -1 ? (
                <>
                  {arr.alternatives?.map((route, index) => (
                    <Polyline
                      key={`alt-${index}`}
                      coordinates={converterCoords(route.coordinates)}
                      strokeColor="black"
                      strokeWidth={3}
                    />
                  ))}
                  <Polyline
                    coordinates={converterCoords(arr.best.coordinates)}
                    strokeColor="blue"
                    strokeWidth={3}
                  />
                  <Polyline
                    coordinates={converterCoords(arr.fastest.coordinates)}
                    strokeColor="red"
                    strokeWidth={3}
                  />
                </>
              ) : (
                <>
                  {disp === 0 &&
                    arr.alternatives?.map((route, index) => (
                      <Polyline
                        key={`alt-${index}`}
                        coordinates={converterCoords(route.coordinates)}
                        strokeColor="black"
                        strokeWidth={3 }
                      />
                    ))}
                  {disp === 1 && (
                    <Polyline
                      coordinates={converterCoords(arr.best.coordinates)}
                      strokeColor="blue"
                      strokeWidth={3 }
                    />
                  )}
                  {disp === 2 && (
                    <Polyline
                      coordinates={converterCoords(arr.fastest.coordinates)}
                      strokeColor="red"
                      strokeWidth={3 }
                    />
                  )}
                </>
              )}
            </>
          )}
        </>

        <Searchbar onSubmit={(destination) => handleSearch(destination)} />
        <NavBar onSubmit={(buttonPressed) => setDisp(buttonPressed)} />
        <Go onClick={() => enableRoute(2)} />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  topHalfContainer: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});
