import React from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

import AppButton from '../components/AppButton';
import AppTextInput from '../components/AppTextInput';

const LoginScreen = ({ navigation }) => {
	return (
		<View style={styles.container}>
			<Text style={styles.text}>Log In</Text>
			<AppTextInput placeholder='Email' />
			<AppTextInput secureTextEntry={true} placeholder='Password' />
			<Text onPress={() => {console.log("test")}} style={styles.textForgotPassword}>Forgot Password?</Text>
			<AppButton
				title="Log In"
				// TODO: make API call to login on button press
				//onPress={}
			/>
			<AppButton 
				title="Back" 
				onPress={() => navigation.navigate('Login/Register')} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#EFA25C',
	},
	text: {
		width: 190,
		textAlign: 'left',
		color: '#FFFFFF',
		fontFamily: "Righteous",
		fontSize: 30,
		lineHeight: 60,
	},
	textForgotPassword: {
		width: 190,
		textAlign: 'left',
		color: '#FFFFFF',
		fontFamily: "Righteous",
	},
})

export default LoginScreen;