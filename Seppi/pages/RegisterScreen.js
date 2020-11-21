import React, { useState, useContext } from 'react';
import { Text, StyleSheet, KeyboardAvoidingView, Platform, Image, ScrollView } from 'react-native';

import AppButton from '../components/AppButton';
import AppTextInput from '../components/AppTextInput';
import { deviceWidth, deviceHeight, buildPath, validInput } from '../utils';
import { AuthContext, UserContext } from '../context';

const RegisterScreen = ({ navigation }) => {
	const { signUp } = React.useContext(AuthContext);
	const [state, setState] = useContext(UserContext);
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [signUpResult, setSignUpResult] = useState('');

	const register = async event => {
		event.preventDefault();

		// Email regular expression
		const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


		// Validate input data
		if (!validInput(state.name)) {
			setSignUpResult('Please input a non-empty name.');
			return;
		}
		else if (!validInput(state.email) || !re.test(String(state.email).toLowerCase())) {
			setSignUpResult('Please input a valid email.');
			return;
		}
		else if (!validInput(password) || !validInput(confirmPassword)) {
			setSignUpResult('Please input a non-empty password.');
			return;
		}
		else if (password !== confirmPassword) {
			setSignUpResult('Passwords don\'t match.');
			return;
		}

		// Submit the fetch request
		const response = await fetch(buildPath('register'), {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				name: state.name,
				email: state.email,
				password: password
			})
		})
		.catch((error) => console.error(error));

		// 200 is OK response, continue handling user data.
		let status = await response.status;
		if (status === 200) {
			signUp();
			navigation.navigate('Email Validation', { data : { backgroundColor: '#EEC96F' } });
			return;
		}
		// Tell the user the email has been registered already.
		else if (status === 400) {
			setSignUpResult('This email is already registered.');
			return;
		}
		else {
			setSignUpResult('Failed to create account due to internal server error.');
			return;
		}

	};

	return (
		<ScrollView>
			<KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} style={styles.container}>
					<Image style={styles.image} source={require('../images/app-icon.png')} />
					<Text style={styles.text}>Create Account</Text>
					<AppTextInput 
						value={state.name} 
						onChangeText={name => setState(state => ({ ...state, name: name }))} 
						placeholder="Your Name" />
					<AppTextInput 
						value={state.email} 
						autoCapitalize="none"
						onChangeText={email => setState(state => ({ ...state, email: email }))} 
						placeholder="Email" />
					<AppTextInput 
						onChangeText={password => setPassword(password)} 
						secureTextEntry={true} 
						autoCapitalize="none"
						placeholder="Password" />
					<AppTextInput 
						onChangeText={confirmPassword => setConfirmPassword(confirmPassword)} 
						secureTextEntry={true} 
						autoCapitalize="none"
						placeholder="Confirm Password" />
					<AppButton
						title="Create Account"
						buttonColor="#FA730B"
						textColor="#FFFFFF"
						onPress={register}
					/>
					<AppButton 
						title="Back"
						buttonColor="#FFFFFF"
						textColor="#000000"
						onPress={() => navigation.navigate('Login/Register')}
					/>
					<Text style={styles.signUpResultText}>{signUpResult}</Text>
					
			</KeyboardAvoidingView>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: deviceWidth,
		height: deviceHeight,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#EEC96F',
	},
	text: {
		width: 250,
		textAlign: 'center',
		color: '#000000',
		fontFamily: "Inter",
		fontWeight: 'bold',
		fontSize: 30,
		lineHeight: 60,
	},
	signUpResultText: {
		width: 310,
		textAlign: 'center',
		color: '#000000',
		fontFamily: "Righteous",
		fontWeight: '700',
		fontSize: 16,
		marginVertical: 10,
	},
	image: {
		resizeMode: 'contain',
	},
})

export default RegisterScreen;