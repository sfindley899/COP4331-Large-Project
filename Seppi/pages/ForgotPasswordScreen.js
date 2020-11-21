import React from 'react';
import { Text, View, StyleSheet, Image, KeyboardAvoidingView, ScrollView } from 'react-native';

import AppButton from '../components/AppButton';
import AppTextInput from '../components/AppTextInput';
import { deviceWidth, deviceHeight, buildPath } from '../utils';

const ForgotPasswordScreen = ({ navigation, route }) => {
	const [text, setText] = React.useState('');
	const [resetResult, setResetResult] = React.useState('');
	const { backgroundColor } = route.params.data;

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
		<ScrollView>
			<KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} style={StyleSheet.compose(styles.container, {backgroundColor: backgroundColor})}>
				<Image style={styles.image} source={require('../images/app-icon.png')} />
				<Text style={styles.textLarge}>Reset Password</Text>
				<Text style={styles.textSmall} >Enter the email address associated with your <Text style={{color: '#FA730B'}} >Seppi</Text> account.</Text>

				<AppTextInput 
						style = {styles.inputText}
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
				/>
				<AppButton
						style={styles.textButtons}
						buttonColor="#FFFFFF"
						textColor="#000000"
						title="Back"
						onPress={() => navigation.goBack()} >
				</AppButton>
				<Text style={styles.resetResult}>{resetResult}</Text>
			</KeyboardAvoidingView>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: deviceWidth,
		height: deviceHeight,
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
	inputText: {
		borderColor: 'gray',
		borderWidth: 2,
	},
})

export default ForgotPasswordScreen;