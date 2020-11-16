import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import Toolbar from '../components/Toolbar';
import { UserContext } from '../context';
import { deviceWidth, deviceHeight, buildPath } from '../utils';

const ProfileScreen = ({ navigation }) => {
	const [state, setState] = useContext(UserContext);

	return (
		<View style={styles.container}>
			<View style={styles.greetingContainer}>
				<Text style={styles.greetingTopText}>Hello, {state.name}!</Text>
				<Text style={styles.greetingBottomText}>{state.email}</Text>
			</View>

			<View style={styles.accountDiv} >
				<TouchableOpacity activeOpacity={0.5} onPress={() => console.log('test')}>
					<Text>Change Display Name</Text>
				</TouchableOpacity>

				<TouchableOpacity activeOpacity={0.5} onPress={() => console.log('test')}>
					<Text>Change Email</Text>
				</TouchableOpacity>

				<TouchableOpacity activeOpacity={0.5} onPress={() => console.log('test')}>
					<Text>Change Password</Text>
				</TouchableOpacity>
			</View>

			<Toolbar />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: deviceWidth,
		height: deviceHeight,
		flexDirection: 'column',
		alignItems: 'center',
	},
	greetingContainer: {
		width: 411,
		height: 117,
		backgroundColor: '#FA730B',
		justifyContent: 'center',
	},
	greetingTopText: {
		color: '#FFFFFF',
		fontWeight: 'bold',
		fontSize: 36,
		textAlign: 'center',
	},
	greetingBottomText: {
		color: '#FFFFFF',
		fontWeight: 'bold',
		fontSize: 18,
		textAlign: 'center'
	},
	accountDiv: {
		flex: 1,
		flexDirection: 'column',
		//backgroundColor: '#FF0000',
		backgroundColor: '#ECECEC',
		width: '100%',
		height: deviceHeight * 0.4,
		marginVertical: 30,

	},
})

export default ProfileScreen;