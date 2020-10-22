import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const AppTextInput = ({ secureTextEntry, placeholder }) => {
	return (
		<TextInput style={styles.appTextInput} secureTextEntry={secureTextEntry} placeholder={placeholder} />
	);
}

const styles = StyleSheet.create({
	appTextInput: {
		backgroundColor: '#FEDB41',
		opacity: 0.5,
		borderRadius: 104,
		height: 40,
		width: 200,
		paddingLeft: 10,
		marginVertical: 10,
	},
});

export default AppTextInput;