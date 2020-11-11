import React, { useState, useContext } from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity } from 'react-native';

import AppButton from '../components/AppButton';
import AppTextInput from '../components/AppTextInput';
import { buildPath, validInput, storeData, getData } from '../utils';
import { AuthContext, UserContext } from '../context';

const LoginScreen = ({ navigation }) => {
	const { signIn } = useContext(AuthContext);
	const [state, setState] = useContext(UserContext);

	const [password, setPassword] = useState('');
	const [loginResult, setLoginResult] = useState('');

	const logIn = async event => {
		event.preventDefault();

		// Email regular expression
		const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


		// Validate input data
		if (!validInput(state.email) || !re.test(String(state.email).toLowerCase())) {
			setLoginResult('Please input a valid email.');
			return;
		}
		else if (!validInput(password)) {
			setLoginResult('Please input a non-empty password.');
			return;
		}

		// Submit the fetch request
		const response = await fetch(buildPath('login'), {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				email: state.email,
				password: password
			})
		})
		.catch((error) => console.error(error));

		// 200 is OK response, continue handling user data.
		let status = await response.status;
		console.log('status: ' + status);
		if (status === 200) {
			let json = JSON.parse(await response.text());

			// Async storage of user's session token from the server response.
			//await storeData('@token', json.token);
			//console.log(await getData('@token'));

			// Set the user's email and display name from the response.
			console.log('resp name: ' + json.name + 'resp email: ' + json.email);
			setState(state => ({ ...state, name: json.name, email: json.email }));

			setLoginResult('');
			setPassword('');
			signIn();
			return;
		}
		// Tell the user the email has been registered already.
		else if (status === 400) {
			setLoginResult('Email/Password combination is incorrect.');
			return;
		}
		else if (status === 401) {
			setLoginResult('Email not verified, please check your email.');
			return;
		}
		else {
			setLoginResult('Failed to login to account due to internal server error.');
			return;
		}
	};

	return (
		<View style={styles.container}>
			<Text style={styles.text}>Log In</Text>
			<AppTextInput value={state.email} onChangeText={email => setState(state => ({...state, email: email }))} placeholder='Email' />
			<AppTextInput value={state.password} onChangeText={password => setPassword(password)} secureTextEntry={true} placeholder='Password' />
			<TouchableOpacity activeOpacity={0.5} onPress={() => {console.log("test")}} >
				<Text style={styles.textForgotPassword}>Forgot Password?</Text>
			</TouchableOpacity>
			<AppButton
				title="Log In"
				onPress={logIn}
			/>
			<AppButton 
				title="Back" 
				onPress={() => navigation.navigate('Login/Register')} />
			<Text style={StyleSheet.compose(styles.textForgotPassword, {textAlign: 'center'})}>{loginResult}</Text>
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