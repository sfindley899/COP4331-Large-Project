import React from 'react';
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const RegisterScreen = ({ navigation }) => {
	return (
		<View style={styles.container}>
			<View style={styles.topBar}>
				<Image style={styles.banner} source={require('../images/home/banner.png')} />	
			</View>

			<Text>Test</Text>

			<View style={styles.bottomBar}>

			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		alignItems: 'center',
		backgroundColor: '#FBD67C',
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
	},
	bottomBar: {
		backgroundColor: '#FA730B',
		width: '100%',
		height: '10%',
		marginTop: 'auto',
	},
});

export default RegisterScreen;