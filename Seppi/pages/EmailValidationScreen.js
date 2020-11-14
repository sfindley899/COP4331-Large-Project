import React, { useContext } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { openInbox } from 'react-native-email-link';
import { UserContext } from '../context';
import { buildPath } from '../utils';

import AppButton from '../components/AppButton';

const EmailValidationScreen = ({ navigation }) => {
  const [state, setState] = useContext(UserContext);
  
  const resendEmail = async event => {	

	  const response = await fetch(buildPath('resendEmailVerification'), {

	  });
  };

	return (
		<View style={styles.container}>
		<Image 
		style={{width: 250, height: 200}}
		source={require('../images/seppi_icon.png')}/>

			<Text style={styles.textLarge}>Verify Your Email</Text>
		<Text style={styles.textSmall}>You’re almost ready to use <Text style={{color: '#FA730B'}}>Seppi!</Text> Before you get started, we need you to confirm your email address.</Text>
		<AppButton 
		  buttonColor='#FA730B'
		  textColor="#FFFFFF"
		  title="Open Email App" 
		  onPress={() => openInbox()}
		  //TODO: navigate outside of app to device's default email app
		/>
		<AppButton
		  buttonColor = '#FFFFFF'
		  textColor="#000000"
		  title="Back to Log In" 
		  onPress={() => {navigation.navigate('Login')}}
		/>

		<TouchableOpacity activeOpacity={0.5} onPress={resendEmail} >
		  <Text style={styles.textButtons}>Resend Email</Text>
		</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
	flex: 1,
	justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#EEC96F',
	},
	textLarge: {
	textAlign: 'center',
	color: '#000000',
	fontSize: 36,
	lineHeight: 60,
	fontWeight: 'bold',
  },
  textSmall: {
	textAlign: 'center',
	width: 310,
	color: '#000000',
	fontSize: 16,
	lineHeight: 24,
	paddingVertical: 20,
	fontWeight: 'bold',
  },
  textButtons: {
	padding: 10,
	textDecorationLine: 'underline',
	textAlign: 'center',
	color: '#000000',
		fontSize: 16,
	lineHeight: 24,
	fontWeight: 'bold',
  },
})

export default EmailValidationScreen;