import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';



export default function  ReportBut(){
const [buttonText, setButtonText] = useState('Report');

const handlePress = () => {
    setButtonText('Reported');
  };

  return (
    
        <TouchableOpacity style={styles.button}>
            <Text style = {styles.buttonText}> {buttonText}</Text>
        </TouchableOpacity>
    
  )
}

const styles = StyleSheet.create({
    button: {
        bottom: 0,
        right: 0,
        backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
      }

})