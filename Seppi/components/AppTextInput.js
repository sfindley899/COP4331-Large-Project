import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const AppTextInput = (props) => {
	return (
		<TextInput 
			value={props.value} style={styles.appTextInput} onChangeText={props.onChangeText} 
			secureTextEntry={props.secureTextEntry} placeholder={props.placeholder} 
			autoCapitalize={props.autoCapitalize} />
	);
}

const styles = StyleSheet.create({
	appTextInput: {
		backgroundColor: '#FFFFFF',
		borderRadius: 10,
		height: 40,
		width: 315,
		paddingLeft: 10,
		marginVertical: 10,
	},
});

export default AppTextInput;