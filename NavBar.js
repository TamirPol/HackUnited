import React, { useRef, useState } from 'react';
import { StyleSheet, View, PanResponder, Dimensions } from 'react-native';

const { height } = Dimensions.get('window');

export default function NavBar() {
  const [viewHeight, setViewHeight] = useState(height / 50); // Initial height of the draggable View

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
        <View style = {styles.dragdown}>


        </View>

    </View>
  );
}

const styles = StyleSheet.create({
    pullDownTab:{
        position: 'absolute',
        width  : '100%',
        height : '50%',
        backgroundColor: "gray",
        bottom : '0'
    },

 dragdown: {
    borderRadius: 50,
    height: '5%',
    width: '5%',
    backgroundColor: "red",
    alignContent: 'center',
    justifyContent: 'center'

 }
});
