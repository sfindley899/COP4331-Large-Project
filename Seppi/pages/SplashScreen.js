import React from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';

const SplashScreen = () => (
	<View style={styles.container}>
		<Image source={require('../images/app-icon.png')} />
		<Text style={styles.text}>Seppi</Text>
	</View>
);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#EEC96F',
	},
	text: {
		color: '#FFFFFF',
		fontFamily: "Righteous",
		fontSize: 48,
		lineHeight: 60,
	},
});

export default SplashScreen;