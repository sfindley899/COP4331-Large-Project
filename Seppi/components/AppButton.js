import React from 'react';
import { View, Button, StyleSheet, TouchableOpacity, Text } from 'react-native';

TouchableOpacity.defaultProps = { activeOpacity: 0.8 };

const AppButton = ({ onPress, title}) => (
  <TouchableOpacity onPress={onPress} style={styles.appButtonContainer}>
    <Text style={styles.appButtonText}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  appButtonContainer: {
    elevation: 8,
    backgroundColor: "#FEDB41",
    borderRadius: 20,
    width: 200,
    height: 50,
    marginVertical: 10,
    padding: 12,
  },
  appButtonText: {
    fontFamily: 'Righteous',
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
  }
});

export default AppButton;