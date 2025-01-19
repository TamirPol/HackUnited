import React, { useState } from 'react';
import { StyleSheet, View, Dimensions, Text } from 'react-native';
import MapView, { Polyline, Marker } from 'react-native-maps';
import NavBar from './NavBar';
import Searchbar from './Searchbar'
import convertRoutes from './converter'

// Get screen dimensions
const { height } = Dimensions.get('window');

export default function App() {
  
  const [origin, setOrigin] = useState([43.654380,-79.380085])
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
          
          { <Polyline //best
    coordinates={[
      {'latitude': 43.65438, 'longitude': -79.38009}, {'latitude': 43.65477, 'longitude': -79.38025}, {'latitude': 43.65475, 'longitude': -79.38037}, {'latitude': 43.65594, 'longitude': -79.38088}, {'latitude': 43.65622, 'longitude': -79.381}, {'latitude': 43.65631, 'longitude': -79.38104}, {'latitude': 43.65638, 'longitude': -79.38107}, {'latitude': 43.65634, 'longitude': -79.38131}, {'latitude': 43.65609, 'longitude': -79.38239}, {'latitude': 43.65588, 'longitude': -79.3834}, {'latitude': 43.65587, 'longitude': -79.38353}, {'latitude': 43.65585, 'longitude': -79.38363}, {'latitude': 43.65582, 'longitude': -79.38377}, {'latitude': 43.65579, 'longitude': -79.3839}, {'latitude': 43.65605, 'longitude': -79.384}, {'latitude': 43.65618, 'longitude': -79.38405}, {'latitude': 43.65633, 'longitude': -79.3841}, {'latitude': 43.65641, 'longitude': -79.38414}, {'latitude': 43.65649, 'longitude': -79.38417}, {'latitude': 43.65693, 'longitude': -79.38435}, {'latitude': 43.65715, 'longitude': -79.38444}, {'latitude': 43.65719, 'longitude': -79.38448}, {'latitude': 43.65719, 'longitude': -79.38453}, {'latitude': 43.65708, 'longitude': -79.38508}, {'latitude': 43.65694, 'longitude': -79.38572}, {'latitude': 43.657, 'longitude': -79.38574}, {'latitude': 43.65709, 'longitude': -79.38577}, {'latitude': 43.65775, 'longitude': -79.38606}, {'latitude': 43.65779, 'longitude': -79.38607}, {'latitude': 43.65786, 'longitude': -79.3861}, {'latitude': 43.6581, 'longitude': -79.3862}, {'latitude': 43.65813, 'longitude': -79.38624}, {'latitude': 43.65821, 'longitude': -79.38627}, {'latitude': 43.65829, 'longitude': -79.38631}, {'latitude': 43.65871, 'longitude': -79.38655}, {'latitude': 43.65938, 'longitude': -79.38683}, {'latitude': 43.66043, 'longitude': -79.38727}, {'latitude': 43.66042, 'longitude': -79.38736}, {'latitude': 43.66041, 'longitude': -79.38745}, {'latitude': 43.6605, 'longitude': -79.3875}, {'latitude': 43.6606, 'longitude': -79.38755}, {'latitude': 43.66104, 'longitude': -79.38769}, {'latitude': 43.6611, 'longitude': -79.38796}, {'latitude': 43.66107, 'longitude': -79.38824}, {'latitude': 43.66108, 'longitude': -79.38828}, {'latitude': 43.66178, 'longitude': -79.38858}, {'latitude': 43.66192, 'longitude': -79.38867}, {'latitude': 43.66198, 'longitude': -79.38869}, {'latitude': 43.66206, 'longitude': -79.38872}, {'latitude': 43.66202, 'longitude': -79.38888}, {'latitude': 43.66208, 'longitude': -79.38893}, {'latitude': 43.66213, 'longitude': -79.38902}, {'latitude': 43.66216, 'longitude': -79.38913}, {'latitude': 43.66216, 'longitude': -79.38931}, {'latitude': 43.66229, 'longitude': -79.38935}, {'latitude': 43.66241, 'longitude': -79.38936}, {'latitude': 43.6625, 'longitude': -79.38923}, {'latitude': 43.66261, 'longitude': -79.38916}, {'latitude': 43.66264, 'longitude': -79.3891}, {'latitude': 43.66264, 'longitude': -79.38898}, {'latitude': 43.66274, 'longitude': -79.38896}, {'latitude': 43.66288, 'longitude': -79.38901}, {'latitude': 43.6629, 'longitude': -79.38896}, {'latitude': 43.66288, 'longitude': -79.38878}, {'latitude': 43.6629, 'longitude': -79.38896}, {'latitude': 43.66288, 'longitude': -79.38901}, {'latitude': 43.66302, 'longitude': -79.38904}, {'latitude': 43.66308, 'longitude': -79.38909}, {'latitude': 43.6631, 'longitude': -79.38911}, {'latitude': 43.6632, 'longitude': -79.38917}, {'latitude': 43.66325, 'longitude': -79.38917}, {'latitude': 43.66331, 'longitude': -79.38911}, {'latitude': 43.66342, 'longitude': -79.3891}, {'latitude': 43.66383, 'longitude': -79.38927}, {'latitude': 43.66357, 'longitude': -79.39047}, {'latitude': 43.66356, 'longitude': -79.39049}, {'latitude': 43.66354, 'longitude': -79.39059}, {'latitude': 43.66352, 'longitude': -79.39067}, {'latitude': 43.66352, 'longitude': -79.3907}, {'latitude': 43.66353, 'longitude': -79.39071}, {'latitude': 43.66358, 'longitude': -79.39073}, {'latitude': 43.66364, 'longitude': -79.39076}, {'latitude': 43.66367, 'longitude': -79.39079}, {'latitude': 43.66373, 'longitude': -79.39096}, {'latitude': 43.66376, 'longitude': -79.39103}, {'latitude': 43.66405, 'longitude': -79.39177}, {'latitude': 43.66421, 'longitude': -79.39206}, {'latitude': 43.66432, 'longitude': -79.39222}, {'latitude': 43.66434, 'longitude': -79.3923}, {'latitude': 43.66431, 'longitude': -79.39232}, {'latitude': 43.66429, 'longitude': -79.39236}, {'latitude': 43.66429, 'longitude': -79.39242}, {'latitude': 43.66432, 'longitude': -79.39249}, {'latitude': 43.66437, 'longitude': -79.39256}, {'latitude': 43.66448, 'longitude': -79.3926}, {'latitude': 43.66456, 'longitude': -79.39259}, {'latitude': 43.66479, 'longitude': -79.39331}, {'latitude': 43.6649, 'longitude': -79.39355}, {'latitude': 43.66493, 'longitude': -79.39363}, {'latitude': 43.66496, 'longitude': -79.39375}, {'latitude': 43.66496, 'longitude': -79.39381}, {'latitude': 43.66496, 'longitude': -79.3939}, {'latitude': 43.66495, 'longitude': -79.39403}, {'latitude': 43.66492, 'longitude': -79.39402}, {'latitude': 43.66492, 'longitude': -79.39421}, {'latitude': 43.6647, 'longitude': -79.39527}, {'latitude': 43.66462, 'longitude': -79.39567}, {'latitude': 43.6646, 'longitude': -79.39575}, {'latitude': 43.66467, 'longitude': -79.39578}, {'latitude': 43.66476, 'longitude': -79.39582}, {'latitude': 43.66469, 'longitude': -79.39608}, {'latitude': 43.66453, 'longitude': -79.39686}, {'latitude': 43.66451, 'longitude': -79.39694}, {'latitude': 43.6645, 'longitude': -79.397}, {'latitude': 43.66437, 'longitude': -79.39761}, {'latitude': 43.66421, 'longitude': -79.39838}, {'latitude': 43.66424, 'longitude': -79.39839}, {'latitude': 43.66419, 'longitude': -79.39848}, {'latitude': 43.66414, 'longitude': -79.39856}, {'latitude': 43.66483, 'longitude': -79.39883}, {'latitude': 43.66482, 'longitude': -79.39893}, {'latitude': 43.66513, 'longitude': -79.39905}, {'latitude': 43.66517, 'longitude': -79.39913}, {'latitude': 43.66525, 'longitude': -79.39956}, {'latitude': 43.66522, 'longitude': -79.39971}, {'latitude': 43.66511, 'longitude': -79.40021}, {'latitude': 43.66504, 'longitude': -79.40055}, {'latitude': 43.66502, 'longitude': -79.40065}, {'latitude': 43.66491, 'longitude': -79.40061}]}
    strokeColor="blue" // fallback for when `strokeColors` is not supported by the map-provider
    strokeColors={[
      'blue',
    ]}
    strokeWidth={3}
  /> }
          { <Polyline //fastest
            coordinates={[
              {'latitude': 43.65438, 'longitude': -79.38009}, {'latitude': 43.65477, 'longitude': -79.38025}, {'latitude': 43.65475, 'longitude': -79.38037}, {'latitude': 43.65594, 'longitude': -79.38088}, {'latitude': 43.65622, 'longitude': -79.381}, {'latitude': 43.65631, 'longitude': -79.38104}, {'latitude': 43.65638, 'longitude': -79.38107}, {'latitude': 43.65634, 'longitude': -79.38131}, {'latitude': 43.65609, 'longitude': -79.38239}, {'latitude': 43.65588, 'longitude': -79.3834}, {'latitude': 43.65587, 'longitude': -79.38353}, {'latitude': 43.65585, 'longitude': -79.38363}, {'latitude': 43.65582, 'longitude': -79.38377}, {'latitude': 43.65579, 'longitude': -79.3839}, {'latitude': 43.65605, 'longitude': -79.384}, {'latitude': 43.65618, 'longitude': -79.38405}, {'latitude': 43.65633, 'longitude': -79.3841}, {'latitude': 43.65641, 'longitude': -79.38414}, {'latitude': 43.65649, 'longitude': -79.38417}, {'latitude': 43.65693, 'longitude': -79.38435}, {'latitude': 43.65715, 'longitude': -79.38444}, {'latitude': 43.65719, 'longitude': -79.38448}, {'latitude': 43.65719, 'longitude': -79.38453}, {'latitude': 43.65708, 'longitude': -79.38508}, {'latitude': 43.65694, 'longitude': -79.38572}, {'latitude': 43.657, 'longitude': -79.38574}, {'latitude': 43.65709, 'longitude': -79.38577}, {'latitude': 43.65775, 'longitude': -79.38606}, {'latitude': 43.65779, 'longitude': -79.38607}, {'latitude': 43.65786, 'longitude': -79.3861}, {'latitude': 43.6581, 'longitude': -79.3862}, {'latitude': 43.65813, 'longitude': -79.38624}, {'latitude': 43.65821, 'longitude': -79.38627}, {'latitude': 43.65829, 'longitude': -79.38631}, {'latitude': 43.65871, 'longitude': -79.38655}, {'latitude': 43.65938, 'longitude': -79.38683}, {'latitude': 43.66043, 'longitude': -79.38727}, {'latitude': 43.66042, 'longitude': -79.38736}, {'latitude': 43.66041, 'longitude': -79.38745}, {'latitude': 43.6605, 'longitude': -79.3875}, {'latitude': 43.6606, 'longitude': -79.38755}, {'latitude': 43.66104, 'longitude': -79.38769}, {'latitude': 43.6611, 'longitude': -79.38796}, {'latitude': 43.66107, 'longitude': -79.38824}, {'latitude': 43.66108, 'longitude': -79.38828}, {'latitude': 43.66178, 'longitude': -79.38858}, {'latitude': 43.66192, 'longitude': -79.38867}, {'latitude': 43.66198, 'longitude': -79.38869}, {'latitude': 43.66206, 'longitude': -79.38872}, {'latitude': 43.66202, 'longitude': -79.38888}, {'latitude': 43.66208, 'longitude': -79.38893}, {'latitude': 43.66213, 'longitude': -79.38902}, {'latitude': 43.66216, 'longitude': -79.38913}, {'latitude': 43.66216, 'longitude': -79.38931}, {'latitude': 43.66229, 'longitude': -79.38935}, {'latitude': 43.66241, 'longitude': -79.38936}, {'latitude': 43.6625, 'longitude': -79.38923}, {'latitude': 43.66261, 'longitude': -79.38916}, {'latitude': 43.66264, 'longitude': -79.3891}, {'latitude': 43.66264, 'longitude': -79.38898}, {'latitude': 43.66274, 'longitude': -79.38896}, {'latitude': 43.66288, 'longitude': -79.38901}, {'latitude': 43.6629, 'longitude': -79.38896}, {'latitude': 43.66288, 'longitude': -79.38878}, {'latitude': 43.6629, 'longitude': -79.38896}, {'latitude': 43.66288, 'longitude': -79.38901}, {'latitude': 43.66302, 'longitude': -79.38904}, {'latitude': 43.66308, 'longitude': -79.38909}, {'latitude': 43.6631, 'longitude': -79.38911}, {'latitude': 43.6632, 'longitude': -79.38917}, {'latitude': 43.66325, 'longitude': -79.38917}, {'latitude': 43.66331, 'longitude': -79.38911}, {'latitude': 43.66342, 'longitude': -79.3891}, {'latitude': 43.66383, 'longitude': -79.38927}, {'latitude': 43.66357, 'longitude': -79.39047}, {'latitude': 43.66356, 'longitude': -79.39049}, {'latitude': 43.66354, 'longitude': -79.39059}, {'latitude': 43.66352, 'longitude': -79.39067}, {'latitude': 43.66352, 'longitude': -79.3907}, {'latitude': 43.66353, 'longitude': -79.39071}, {'latitude': 43.66358, 'longitude': -79.39073}, {'latitude': 43.66364, 'longitude': -79.39076}, {'latitude': 43.66367, 'longitude': -79.39079}, {'latitude': 43.66373, 'longitude': -79.39096}, {'latitude': 43.66376, 'longitude': -79.39103}, {'latitude': 43.66405, 'longitude': -79.39177}, {'latitude': 43.66421, 'longitude': -79.39206}, {'latitude': 43.66432, 'longitude': -79.39222}, {'latitude': 43.66434, 'longitude': -79.3923}, {'latitude': 43.66431, 'longitude': -79.39232}, {'latitude': 43.66429, 'longitude': -79.39236}, {'latitude': 43.66429, 'longitude': -79.39242}, {'latitude': 43.66432, 'longitude': -79.39249}, {'latitude': 43.66437, 'longitude': -79.39256}, {'latitude': 43.66448, 'longitude': -79.3926}, {'latitude': 43.66456, 'longitude': -79.39259}, {'latitude': 43.66479, 'longitude': -79.39331}, {'latitude': 43.6649, 'longitude': -79.39355}, {'latitude': 43.66493, 'longitude': -79.39363}, {'latitude': 43.66496, 'longitude': -79.39375}, {'latitude': 43.66496, 'longitude': -79.39381}, {'latitude': 43.66496, 'longitude': -79.3939}, {'latitude': 43.66495, 'longitude': -79.39403}, {'latitude': 43.66492, 'longitude': -79.39402}, {'latitude': 43.66492, 'longitude': -79.39421}, {'latitude': 43.6647, 'longitude': -79.39527}, {'latitude': 43.66462, 'longitude': -79.39567}, {'latitude': 43.6646, 'longitude': -79.39575}, {'latitude': 43.66467, 'longitude': -79.39578}, {'latitude': 43.66476, 'longitude': -79.39582}, {'latitude': 43.66469, 'longitude': -79.39608}, {'latitude': 43.66453, 'longitude': -79.39686}, {'latitude': 43.66451, 'longitude': -79.39694}, {'latitude': 43.6645, 'longitude': -79.397}, {'latitude': 43.66437, 'longitude': -79.39761}, {'latitude': 43.66421, 'longitude': -79.39838}, {'latitude': 43.66424, 'longitude': -79.39839}, {'latitude': 43.66419, 'longitude': -79.39848}, {'latitude': 43.66414, 'longitude': -79.39856}, {'latitude': 43.66483, 'longitude': -79.39883}, {'latitude': 43.66482, 'longitude': -79.39893}, {'latitude': 43.66513, 'longitude': -79.39905}, {'latitude': 43.66517, 'longitude': -79.39913}, {'latitude': 43.66525, 'longitude': -79.39956}, {'latitude': 43.66522, 'longitude': -79.39971}, {'latitude': 43.66511, 'longitude': -79.40021}, {'latitude': 43.66504, 'longitude': -79.40055}, {'latitude': 43.66502, 'longitude': -79.40065}, {'latitude': 43.66491, 'longitude': -79.40061}]}
            strokeColor="blue" // fallback for when `strokeColors` is not supported by the map-provider
            strokeColors={[
              'blue',
            ]}
            strokeWidth={3}
          /> }
          {coordinatesArray.map((lineCoordinates, index) => (
            <Polyline //alt
              key={index} // Use a unique key for each Polyline
              coordinates={lineCoordinates}
              strokeColor="blue"
              strokeWidth={3}
            />
          ))}
          <Searchbar></Searchbar>
          <Marker coordinate={{ latitude: origin[0], longitude: origin[1]}}/>
          <Marker coordinate={{ latitude: 43.66491, longitude: -79.40061 }}
                  pinColor='green' />
          
                  
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
