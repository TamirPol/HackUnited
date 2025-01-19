import React, { useState } from 'react';
import { Text, TouchableOpacity, StyleSheet, View } from 'react-native';

export default function App() {
  const [reportButtonText, setReportButtonText] = useState('Report Incident');
  const [emergencyButtonText, setEmergencyButtonText] = useState('Emergency');
  const [isReportDisabled, setIsReportDisabled] = useState(false);
  const [isEmergencyDisabled, setIsEmergencyDisabled] = useState(false);

  const handleReportPress = () => {
    setReportButtonText('Reported');
    setIsReportDisabled(true); // Disable the "Report Incident" button
  };

  const handleEmergencyPress = () => {
    setEmergencyButtonText('Help Requested');
    setIsEmergencyDisabled(true); // Disable the "Emergency" button
  };

  return (
    <View style={styles.container}>
      {/* Emergency Button */}
      <TouchableOpacity
        style={[styles.button, styles.emergencyButton, isEmergencyDisabled && styles.buttonDisabled]}
        onPress={handleEmergencyPress}
        disabled={isEmergencyDisabled}
      >
        <Text style={styles.buttonText}>{emergencyButtonText}</Text>
      </TouchableOpacity>

      {/* Report Button */}
      <TouchableOpacity
        style={[styles.button, styles.reportButton, isReportDisabled && styles.buttonDisabled]}
        onPress={handleReportPress}
        disabled={isReportDisabled}
      >
        <Text style={styles.buttonText}>{reportButtonText}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end', // Align buttons to the bottom of the screen
    alignItems: 'center',
    paddingBottom: 50, // Add spacing from the bottom
  },
  button: {
    position: 'absolute',
    bottom: '50%',
    paddingVertical: "7%",
    paddingHorizontal: "5%",
    borderRadius: 25,
    backgroundColor: 'darkred',
  },
  emergencyButton: {
    left: '5%', // Align the "Emergency" button to the left
  },
  reportButton: {
    right: '5%', // Align the "Report Incident" button to the right
  },
  buttonDisabled: {
    backgroundColor: '#a9a9a9', // Change the color to indicate the button is disabled
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
