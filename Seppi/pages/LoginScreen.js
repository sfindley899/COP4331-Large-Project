import React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

import AppButton from '../components/AppButton';
import AppTextInput from '../components/AppTextInput';

const LoginScreen = ({ navigation }) => {
	return (
		<View style={styles.container}>
			<Text>This is the login page!</Text>
			<View style={styles.loginContainer} >
				<AppTextInput placeholder='Email' />
				<AppTextInput secureTextEntry={true} placeholder='Password' />
				<AppButton 
					title="Go back" 
					onPress={() => navigation.navigate('Login/Register')} />
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		backgroundColor: '#EFA25C',
	},
	loginContainer: {
		top: 10,
	},
})

export default LoginScreen;