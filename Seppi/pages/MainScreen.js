import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';

import AppButton from '../components/AppButton';
import { deviceWidth, deviceHeight } from '../utils';

const MainScreen = ({ navigation }) => {
	return (
		<View style={styles.container}>
			<View style={styles.topBar} >
				<Image style={styles.banner} source={require('../images/home/banner.png')} />
			</View>
			<Image style={styles.image} source={require('../images/main-picture.png')} />

			<View style={styles.buttons}>
				<AppButton 
					buttonColor="#FA730B"
					textColor="#FFFFFF"
					title="Sign In" 
					onPress={() => navigation.navigate('Login')} />
				<AppButton
					buttonColor="#FFFFFF"
					textColor="#000000"
					title="Create Account"
					onPress={() => navigation.navigate('Register')} />
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'space-between',
		alignItems: 'center',
		backgroundColor: '#EEC96F',
	},
	text: {
		color: '#FFFFFF',
		fontFamily: "Righteous",
		fontSize: 48,
		lineHeight: 60,
	},
	buttons: {
		justifyContent: 'center',
		marginBottom: '10%',
	},
	topBar: {
		marginTop: '-5%',
		width: '100%',
		height: '20%',
	},
	banner: {
		flex: 1,
		flexGrow: 1,
		width: '100%',
		resizeMode: 'contain',
		position: 'relative',
	},
	image: {
		width: deviceWidth,
		height: deviceHeight * 0.45,
		resizeMode: 'contain',
	},
})

export default MainScreen;