import React from 'react';
import { Text, StyleSheet, View } from 'react-native';

const Route = ({ name }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flexbox',
    left: '10%',
    position: 'flexbox',
    backgroundColor: 'darkred', // Corrected 'colour' to 'backgroundColor'
    width: '25%',
    height: '10%',
    justifyContent: 'center',
     // Corrected 'alignContent' to 'alignItems'
    borderRadius: 25
  },
  text: {
    fontSize: 12,
    color: 'white',
    fontWeight: 'bold'
  },
});

export default Route;
