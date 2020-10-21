import React from 'react';
import { Text, View, StyleSheet, Image, Button, TouchableWithoutFeedback, TextInput } from 'react-native';

import AppButton from '../components/AppButton';

const MainScreen = ({ navigation }) => {
	return (
		<View style={styles.container}>
		  <View style={styles.logo}>
		    <Image source={require('../images/app-icon.png')} />
		    <Text style={styles.text}>Seppi</Text>
		  </View>

		  <View style={styles.buttonContainer}>
			<AppButton 
				title="Log In" 
				onPress={() => navigation.navigate('Login')} />
		    <AppButton
				title="Sign Up"
				onPress={() => navigation.navigate('Register')} />
		  </View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		//justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#EFA25C',
	},
	text: {
		color: '#FFFFFF',
		fontFamily: "Righteous",
		fontSize: 48,
		lineHeight: 60,
	},
	logo: {
		top: 100,
		alignItems: 'center',
	},
	buttonContainer: {
		position: 'absolute',
		bottom: 50,
	},
})

export default MainScreen;