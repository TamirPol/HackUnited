import React from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';

const Route = ({ name, color, onPress }) => {
  return (
    <TouchableOpacity style={[styles.container, { backgroundColor: color }]} onPress={onPress}>
      <Text style={styles.text}>{name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    position: 'relative', // Remove 'flexbox' and 'position' properties, these were incorrect
    width: '33%',
    height: '30%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    margin: 5, // Optional: Adds spacing between buttons
  },
  text: {
    fontSize: 12,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Route;
