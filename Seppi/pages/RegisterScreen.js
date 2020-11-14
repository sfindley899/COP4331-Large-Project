import React, { useState, useContext } from 'react';
import { Text, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';

import AppButton from '../components/AppButton';
import AppTextInput from '../components/AppTextInput';
import { buildPath, validInput } from '../utils';
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
			//let json = JSON.parse(await response.text());

			console.log('registered name: ' + state.name + ' email: ' + state.email);
			setSignUpResult('Account successfully registered, please check your inbox to verify your email.');
			signUp();
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
		<KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} style={styles.container}>
				<Text style={styles.text}>Sign Up</Text>
				<AppTextInput value={state.name} onChangeText={name => setState(state => ({ ...state, name: name }))} placeholder="John Doe" />
				<AppTextInput value={state.email} onChangeText={email => setState(state => ({ ...state, email: email }))} placeholder="Email" />
				<AppTextInput onChangeText={password => setPassword(password)} secureTextEntry={true} placeholder="Password" />
				<AppTextInput onChangeText={confirmPassword => setConfirmPassword(confirmPassword)} secureTextEntry={true} placeholder="Confirm Password" />
				<AppButton
					title="Sign Up"
					onPress={register}
				/>
				<AppButton 
					title="Back"
					onPress={() => navigation.navigate('Login/Register')}
				/>
				<Text style={styles.signUpResultText}>{signUpResult}</Text>
				
		</KeyboardAvoidingView>
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
	signUpResultText: {
		width: 190,
		textAlign: 'center',
		color: '#FFFFFF',
		fontFamily: "Righteous",
	},
})

export default RegisterScreen;