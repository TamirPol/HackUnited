import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import NavBar from './NavBar';
import Searchbar from './Searchbar'

// Get screen dimensions
const { height } = Dimensions.get('window');

export default function App() {
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
          <Searchbar></Searchbar>
          <Marker coordinate={{ latitude: 43.6548, longitude: -79.3883 }} />
          <NavBar/>
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
