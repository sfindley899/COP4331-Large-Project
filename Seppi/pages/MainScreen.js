import React from 'react';
import { Text, View, StyleSheet, Image, Button, TouchableWithoutFeedback, TextInput } from 'react-native';

import AppButton from '../components/AppButton';

const MainScreen = ({ navigation }) => {
	return (
		<View style={styles.container}>
		    <Image source={require('../images/seppi_icon.png')} />
		    <Text style={styles.text}>Seppi</Text>
			<View style={styles.buttons}>
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
		flexDirection: 'column',
		justifyContent: 'space-evenly',
		alignItems: 'center',
		backgroundColor: '#EFA25C',
	},
	text: {
		color: '#FFFFFF',
		fontFamily: "Righteous",
		fontSize: 48,
		lineHeight: 60,
	},
	buttons: {
		justifyContent: 'center',
	},
})

export default MainScreen;