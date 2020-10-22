import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import App from '../App';
import AppButton from '../components/AppButton';
import AppTextInput from '../components/AppTextInput';

const RegisterScreen = ({ navigation }) => {
	return (
		<View style={styles.container}>
			<Text style={styles.text}>Sign Up</Text>
			<AppTextInput placeholder="John Doe" />
			<AppTextInput placeholder="Email" />
			<AppTextInput secureTextEntry={true} placeholder="Password" />
			<AppTextInput secureTextEntry={true} placeholder="Confirm Password" />
			<AppButton 
				title="Sign Up"
				// TODO: make API call to signup on button press
				//onPress={}
			/>
			<AppButton 
				title="Back"
				onPress={() => navigation.navigate('Login/Register')}
			/>
			
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
		width: 200,
		textAlign: 'left',
		color: '#FFFFFF',
		fontFamily: "Righteous",
		fontSize: 30,
		lineHeight: 60,
	},
})

export default RegisterScreen;