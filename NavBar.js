import React, { useRef, useState } from 'react';
import { StyleSheet, View, PanResponder, Dimensions } from 'react-native';
import EmergencyBut from './EmergencyBut';
const { height } = Dimensions.get('window');
import Route from './Route';
export default function NavBar() {
  

  // PanResponder to handle dragging
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,//temp false
      onMoveShouldSetPanResponder: () => true,// temp false
      onPanResponderMove: (_, gestureState) => {
        const newHeight = Math.max(50, viewHeight + gestureState.dy); // Minimum height is 50
        setViewHeight(newHeight);
      },
      onPanResponderRelease: () => {
        // Optionally do something when dragging stops
      },
    })
  ).current;

  return (
    <View style = {styles.pullDownTab}>
      <Route name={'Best'}/>
                  <Route name={'Fastest'}/>
                  <Route name={'Alternate'}/>
    <EmergencyBut/>
    </View>
  );
}

const styles = StyleSheet.create({
    pullDownTab:{
        position: 'absolute',
        width  : '100%',
        height : '30%',
        backgroundColor: "#f1f0e4",
        bottom : '0',
        
    },

 dragdown: {
  
    borderRadius: 50,
    height: '5%',
    width: '5%',
    left : '50% - width',
    backgroundColor: "red",
    alignContent: 'center',
    justifyContent: 'center',
    position: 'relative'

 }
});
