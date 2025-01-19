import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, Text, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Requires `expo install react-native-vector-icons`
import * as Location from 'expo-location';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default function App() {
  const [text, setText] = useState(''); // User input
  const [searchResult, setSearchResult] = useState(""); // To store search result
  const [startVal, setStartVal] = useState(); // Use state for startVal
  const origin = { latitude: 43.654380, longitude: -79.380085 }
  // Request location permission before using geocoding
  // const requestLocationPermission = async () => {
  //   const { status } = await Location.requestForegroundPermissionsAsync();
  //   if (status !== 'granted') {
  //     alert('Permission to access location was denied');
  //   }
  // };

  // Convert address to latitude and longitude
  const convertToLatLong = async (address) => {
    if (address) {
      try {
        // Get geocoded location
        const result = await Location.geocodeAsync(address);
        if (result.length > 0) {
          console.log('Latitude:', result[0].latitude);
          console.log('Longitude:', result[0].longitude);
          setStartVal({ latitude: result[0].latitude, longitude: result[0].longitude }); // Update startVal using setState
          setSearchResult([result[0].longitude, result[0].latitude]); // Store the result in searchResult
        } else {
          alert('No results found for the address');
        }
      } catch (error) {
        console.error(error);
        alert('Error geocoding address');
      }
    }
  };

  // Handle search button press
  const handleSearch = async () => {
    if (text) {
      setSearchResult(text); // Store the searched result in a variable
      await convertToLatLong(text); // Await the geocoding process
      console.log('Searched:', text); // Log the search result (for debugging)
    } else {
      alert("Please enter a valid address");
    }
  };

  // Request permission on initial load
  // useEffect(() => {
  //   requestLocationPermission();
  // }, []);

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Search for an address..."
          value={text}
          onChangeText={(input) => setText(input)}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Ionicons name="search" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '80%',
    position: 'absolute',
    top: '8%',
  },
  input: {
    height: 50,
    width: '85%',
    borderRadius: 30,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    elevation: 3, // Add shadow for Android
    shadowColor: '#000', // Add shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  searchButton: {
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: -15, // Align button closer to the search bar
    shadowColor: '#000', // Add shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  displayText: {
    marginTop: 20,
    fontSize: 16,
    color: '#6d6d6d',
  },
});
