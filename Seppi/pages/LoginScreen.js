import React, { useState } from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import {sha256} from 'react-native-sha256';

import AppButton from '../components/AppButton';
import AppTextInput from '../components/AppTextInput';
import { buildPath, validInput, storeData, getData } from '../utils';

const LoginScreen = ({ navigation }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loginResult, setLoginResult] = useState('');

	const logIn = async event => {
		event.preventDefault();

		// Email regular expression
		const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

		// Validate input data
		if (!validInput(email) || !re.test(String(email).toLowerCase())) {
			setLoginResult('Please input a valid email.');
			return;
		}
		else if (!validInput(password)) {
			setLoginResult('Please input a non-empty password.');
			return;
		}

		// Hash the password using SHA
		sha256(password).then(async (hash) => {
			// Submit the fetch request
			const response = await fetch(buildPath('login'), {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					email: email,
					password: hash
				})
			})
			.catch((error) => {console.error(error); return;});

			// 200 is OK response, continue handling user data.
			let status = await response.status;
			if (status === 200) {
				let json = JSON.parse(await response.text());

				// Async storage of user's session token from the server response.
				await storeData('@token', json.token);
				//console.log(await getData('@token'));

				setLoginResult('');
				setEmail('')
				setPassword('');
				navigation.navigate('Home');
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

		}).catch(error => {
			console.error(error);
		});

	};

	return (
		<View style={styles.container}>
			<Text style={styles.text}>Log In</Text>
			<AppTextInput value={email} onChangeText={email => setEmail(email)} placeholder='Email' />
			<AppTextInput value={password} onChangeText={password => setPassword(password)} secureTextEntry={true} placeholder='Password' />
			<Text onPress={() => {console.log("test")}} style={styles.textForgotPassword}>Forgot Password?</Text>
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