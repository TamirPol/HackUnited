import React, { use, useState } from 'react';
import { StyleSheet, View, Dimensions, Text } from 'react-native';
import MapView, { Polyline, Marker } from 'react-native-maps';
import NavBar from './NavBar';
import Searchbar from './Searchbar'
import converterCoords from './converter'
import Route from './Route';

// Get screen dimensions
const { height } = Dimensions.get('window');

export default function App() {
  const callFlaskAPI = async (destination, origin) => {
    // Check if both origin and destination are provided
    if (!origin || !destination) {
        console.error("Origin or destination is missing.");
        return null;
    }

    try {
        const response = await fetch("http://127.0.0.1:5000/get-routes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ 'start': origin, 'destination': destination }),
        });

        // Check if the response is successful
        if (response.ok) {
            const data = await response.json();
            console.log("Response from Flask:", data);
            return data; // Return the data for further use
        } else {
            // Handle errors if the response status is not OK
            console.error("Error: ", response.status, await response.text());
        }

    } catch (error) {
        // Catch any network or connection errors
        console.error("Error calling Flask API:", error);
    }
};
const handleSearch = async (destination) => {
  setDest(destination);
  console.log('onSubmit reached');
  console.log(destination);
  console.log(origin);

  // Call the API and wait for the response
  const apiResult = await callFlaskAPI(destination, origin);
  
  // Update the state with the API result
  setArr(apiResult);
  
  // Log the updated array after state is updated (React batches state updates)
  console.log('Updated arr:', apiResult);
};

  const [origin, setOrigin] = useState([43.654380,-79.380085])
  const [arr, setArr] = useState(null)
  const [dest, setDest] = useState([])
  return (
    
      
      <View style={styles.topHalfContainer}>
        <MapView
          style={styles.map}
          initialRegion={{
            
            latitude: 43.6548,
            longitude: -79.3883,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          
          {arr && (
  <>
    <Polyline
      // best
      coordinates={converterCoords(arr.best.coordinates)}
      strokeColor="black" // fallback for when `strokeColors` is not supported by the map-provider
      strokeColors={['black']}
      strokeWidth={3}
    />
    <Polyline
      // fastest
      coordinates={converterCoords(arr.fastest.coordinates)}
      strokeColor="green" // fallback for when `strokeColors` is not supported by the map-provider
      strokeColors={['green']}
      strokeWidth={3}
    />
    {arr.alternatives?.map((route, index) => (
      <Polyline
        // alt
        key={index} // Use a unique key for each Polyline
        coordinates={route.coordinates}
        strokeColor="blue"
        strokeWidth={3}
      />
    ))}
  </>
)}


          <Searchbar onSubmit={(destination) => handleSearch(destination)} />

          <Marker coordinate={{ latitude: origin[0], longitude: origin[1]}}/>
          {dest && dest.length === 2 && (
          <Marker
            coordinate={{ latitude: dest[0], longitude: dest[1] }}
            pinColor="green"
          />
        )}

          <NavBar>
          
          </NavBar>
          
          
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
