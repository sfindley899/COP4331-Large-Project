import React from 'react';
import { View, Button, StyleSheet, TouchableOpacity, Text } from 'react-native';

TouchableOpacity.defaultProps = { activeOpacity: 0.8 };

const AppButton = (props) => (
  <TouchableOpacity onPress={props.onPress} style={StyleSheet.compose(styles.appButtonContainer, {backgroundColor: props.buttonColor})}>
    <Text style={StyleSheet.compose(styles.appButtonText, {color: props.textColor})}>{props.title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  appButtonContainer: {
    elevation: 8,
    backgroundColor: "#FA730B",
    borderRadius: 20,
    width: 315,
    height: 48,
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