import React from 'react';
import { Text, View, StyleSheet, TextInput, Button } from 'react-native';

import AppButton from '../components/AppButton';
import AppTextInput from '../components/AppTextInput';

const ResetPasswordScreen = ({ navigation }) => {
  const [text, setText] = React.useState('');
	return (
		<View style={styles.container}>
		  <Text style={styles.textLarge}>Reset Password</Text>

      <AppTextInput style = {styles.TextInputStyleClass}
          underlineColorAndroid = "transparent"
          placeholder = "Enter New Password"
          placeholderTextColor = "#000000"
          autoCapitalize = "none"
          mode = 'flat'
          onChangeText={text => setText(text)}
          secureTextEntry={true}
      />
      <AppTextInput style = {styles.TextInputStyleClass}
          underlineColorAndroid = "transparent"
          placeholder = "Re-Enter Password"
          placeholderTextColor = "#000000"
          autoCapitalize = "none"
          mode = 'flat'
          onChangeText={text => setText(text)}
          secureTextEntry={true}
      />

      <AppButton 
        style={styles.buttons}
				title="Reset Password"
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
  },
  textSmall: {
    textAlign: 'center',
    color: '#FFFFFF',
		fontSize: 18,
		lineHeight: 20,
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

export default ResetPasswordScreen;