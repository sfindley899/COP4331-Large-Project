import React from 'react';
import { Text, View, StyleSheet, TextInput, Button } from 'react-native';

import AppButton from '../components/AppButton';
import AppTextInput from '../components/AppTextInput';

const ForgotPasswordScreen = ({ navigation }) => {
  const [text, setText] = React.useState('');
	return (
		<View style={styles.container}>
		  <Text style={styles.textLarge}>Forgot Your Password?</Text>

      <AppTextInput style = {styles.TextInputStyleClass}
          placeholder = "Enter Your Email"
          autoCapitalize = "none"
          onChangeText={text => setText(text)}
      />

      <AppButton 
        style={styles.buttons}
        color = '#f7be4f'
        title="Send Reset Link"
        onPress={() => alert('This email is not associated with a Seppi account\n OR\nAn email was sent to this address with a link to reset the password')}
        onPress={() => navigation.navigate('Reset Password')} //Navigation is only here for testing purposes! Users should be able to reach this with an email link ONLY
        //TODO: Let user know if the email exists in the system
        //TODO: Let user know if am email is sent
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
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#EFA25C',
	},
	textLarge: {
    textAlign: 'center',
		color: '#FFFFFF',
		fontSize: 36,
    lineHeight: 60,
    paddingBottom: 20,
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
  }
})

export default ForgotPasswordScreen;