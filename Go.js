import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';

const MyButton = ({ onPress, title }) => {
  return (
    <TouchableOpacity 
      style={styles.button} 
      onPress={onPress} // Function to be called when button is pressed
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const App = () => {
  const handlePress = () => {
    console.log('Button pressed!');
  };

  return (
    <View style={styles.container}>
      <MyButton onPress={handlePress} title="GO" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    left:"70%",
    width:"25%",
    bottom:"27%",
  },
  button: {
    backgroundColor: '#4CAF50', // Green background
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
    shadowColor: '#000', // Add shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 26,
    fontWeight: 'bold',
  },
});

export default App;
