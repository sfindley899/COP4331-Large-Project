import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';

import AppButton from '../components/AppButton';
import AppTextInput from '../components/AppTextInput';
import { buildPath } from '../utils';

const ForgotPasswordScreen = ({ navigation }) => {
	const [text, setText] = React.useState('');
	const [resetResult, setResetResult] = React.useState('');

	const resetPassword = async event => {
		event.preventDefault();

		const response = await fetch(buildPath('resetPassword'), {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				email: text,
			})
		})
		.catch((error) => console.log(error));

		let status = await response.status;
		console.log('status: ' + status);

		if (status === 200)
		{
			setResetResult('Email to reset your password was sent.');
			return;
		}
		else
		{
			setResetResult('This email is not associated with a Seppi account.');
			return;
		}
	};
	
	return (
		<View style={styles.container}>
			<Image style={styles.image} source={require('../images/app-icon.png')} />
			<Text style={styles.textLarge}>Reset Password</Text>
			<Text style={styles.textSmall} >Enter the email address associated with your <Text style={{color: '#FA730B'}} >Seppi</Text> account.</Text>

			<AppTextInput 
					style = {styles.TextInputStyleClass}
					placeholder = "Enter Your Email"
					autoCapitalize = "none"
					onChangeText={text => setText(text)}
			/>

			<AppButton 
				style={styles.buttons}
				buttonColor='#FA730B'
				textColor="#FFFFFF"
				title="Send Reset Link"
				onPress={resetPassword}
				//onPress={() => navigation.navigate('Reset Password')} //Navigation is only here for testing purposes! Users should be able to reach this with an email link ONLY
				//TODO: Let user know if the email exists in the system
				//TODO: Let user know if am email is sent
			/>
			<AppButton
					style={styles.textButtons}
					buttonColor="#FFFFFF"
					textColor="#000000"
					title="Back"
					onPress={() => navigation.navigate('Login')} >
			</AppButton>
			<Text style={styles.resetResult}>{resetResult}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#EEC96F',
	},
	textLarge: {
		width: 250,
		textAlign: 'center',
		color: '#000000',
		fontFamily: "Inter",
		fontWeight: 'bold',
		fontSize: 30,
		lineHeight: 60,
		marginVertical: 15,
	},
	textSmall: {
		textAlign: 'center',
		justifyContent: 'center',
		color: '#FFFFFF',
		fontSize: 18,
		lineHeight: 20,
	},
	textButtons: {
		textDecorationLine: 'underline',
		color: '#FFFFFF',
		fontSize: 18,
		lineHeight: 20,
		paddingTop: 10,
	},
	image: {
		resizeMode: 'contain',
	},
	textSmall: {
		width: 320,
		height: 53,
		fontFamily: 'Inter',
		fontStyle: 'normal',
		fontWeight: 'bold',
		fontSize: 16,
		lineHeight: 24,
		textAlign: 'center',
		marginBottom: 10,
	},
	resetResult: {
		width: 310,
		textAlign: 'center',
		color: '#000000',
		fontFamily: "Righteous",
		fontWeight: '700',
		fontSize: 16,
		marginVertical: 10,
	},
})

export default ForgotPasswordScreen;