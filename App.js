import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import MapView, { Polyline, Marker } from 'react-native-maps';
import NavBar from './NavBar';
import Searchbar from './Searchbar'
import ReportBut from './ReportBut';

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
          {/* <Polyline
    coordinates={[
      {latitude: 37.8025259, longitude: -122.4351431},
      {latitude: 37.7896386, longitude: -122.421646},
      {latitude: 37.7665248, longitude: -122.4161628},
      {latitude: 37.7734153, longitude: -122.4577787},
      {latitude: 37.7948605, longitude: -122.4596065},
      {latitude: 37.8025259, longitude: -122.4351431},
    ]}
    strokeColor="#000" // fallback for when `strokeColors` is not supported by the map-provider
    strokeColors={[
      'black',
    ]}
    strokeWidth={6}
  /> */}
          <Searchbar></Searchbar>
          <Marker coordinate={{ latitude: 43.6548, longitude: -79.3883 }} />
          <NavBar>
          <ReportBut/>
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
