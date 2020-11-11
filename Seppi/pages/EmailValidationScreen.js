import React from 'react';
import { Text, View, StyleSheet, Image} from 'react-native';

import AppButton from '../components/AppButton';

const EmailValidationScreen = ({ navigation }) => {
	return (
		<View style={styles.container}>
        <Image 
        style={{width: 250, height: 200}}
        source={require('../images/seppi_icon.png')}/>

		    <Text style={styles.textLarge}>Confirm Your Email</Text>
        <Text style={styles.textSmall}>Tap the link we sent to your email</Text>
        <AppButton 
          color = '#f7be4f'
          title="Open Email App" 
          onPress={() => alert('You tried to open your email app, but this is only a simulation!')}
          //TODO: navigate outside of app to device's default email app
        />
        <AppButton
          color = '#f7be4f'
          title="Resend Email" 
          onPress={() => alert('Say if an email was successfully sent!')} //remove me later
          //TODO: API call to resend validation email
          //TODO: New page or new message to let user know the request was delivered
        />
        <Text
          style={styles.textButtons}
          onPress={() => navigation.navigate('Login')} >
          Back to Log In
        </Text>
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
	textLarge: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontSize: 36,
    lineHeight: 60,
  },
  textSmall: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontSize: 18,
    lineHeight: 30,
    paddingBottom: 20,
  },
  textButtons: {
    padding: 10,
    textDecorationLine: 'underline',
    textAlign: 'center',
    color: '#FFFFFF',
		fontSize: 18,
		lineHeight: 20,
  },
})

export default EmailValidationScreen;