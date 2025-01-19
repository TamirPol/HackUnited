import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Text,Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height

export default function App() {
  const [text, setText] = useState('');


  return (
    <View>
      
      <TextInput
        style={styles.input}
        placeholder="Search..."
        value={text}
        onChangeText={(input) => setText(input)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    height: 50,
    top: '45%',
    left: '10%',
    width: '80%',
    boxShadow: '2px 2px 2px 2px #979797',
    borderRadius: 30,
    paddingHorizontal: 10,
    
    backgroundColor: '#fff',
  },
  displayText: {
    marginTop: 20,
    fontSize: 16,
    color: '#6d6d6d',
  },
});
