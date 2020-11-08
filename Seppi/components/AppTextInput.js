import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const AppTextInput = (props) => {
	return (
		<TextInput value={props.value} style={styles.appTextInput} onChangeText={props.onChangeText} secureTextEntry={props.secureTextEntry} placeholder={props.placeholder} />
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