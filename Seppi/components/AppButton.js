import React from 'react';
import { View, Button, StyleSheet, TouchableOpacity, Text } from 'react-native';

TouchableOpacity.defaultProps = { activeOpacity: 0.8 };

const AppButton = (props) => (
  <TouchableOpacity onPress={props.onPress} style={styles.appButtonContainer}>
    <Text style={styles.appButtonText}>{props.title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  appButtonContainer: {
    elevation: 8,
    backgroundColor: "#F7C64C",
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