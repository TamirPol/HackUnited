import React, { useRef } from 'react';
import { StyleSheet, View, PanResponder, Dimensions } from 'react-native';
import EmergencyBut from './EmergencyBut';

const { height } = Dimensions.get('window');
import Route from './Route';

export default function NavBar({ onSubmit }) {
  // PanResponder to handle dragging
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        // Optional drag logic
      },
      onPanResponderRelease: () => {
        // Optionally do something when dragging stops
      },
    })
  ).current;

  return (
    <View style={styles.pullDownTab} {...panResponder.panHandlers}>
      {/* Buttons Container */}
      <View style={styles.buttonsContainer}>
        <Route name={'Best'} color={'blue'} onPress={() => onSubmit(1)} />
        <Route name={'Fastest'} color={'red'} onPress={() => onSubmit(2)} />
        <Route name={'Alternate'} color={'grey'} onPress={() => onSubmit(0)} />
      </View>

      {/* Emergency Button */}
      <View style={styles.emergencyContainer}>
        <EmergencyBut />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  pullDownTab: {
    position: 'absolute',
    width: '100%',
    height: '30%',
    backgroundColor: '#f1f0e4',
    bottom: 0,
    paddingHorizontal: 10, // Optional padding
    paddingVertical: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Distribute buttons horizontally
    alignItems: 'center', // Center buttons vertically
    flex: 1, // Make the row take available space
  },
  emergencyContainer: {
    alignItems: 'center', // Center the emergency button horizontally
    justifyContent: 'flex-end', // Position it at the bottom
    paddingVertical: 10, // Optional padding for spacing
  },
});
