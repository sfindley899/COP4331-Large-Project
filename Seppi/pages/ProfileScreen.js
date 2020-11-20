import React, { useContext } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import Toolbar from '../components/Toolbar';
import { UserContext } from '../context';
import { deviceWidth, deviceHeight, buildPath } from '../utils';
import ProfileButton from '../components/ProfileButton';
import { AuthContext } from '../context';

const icons = {
	nameIcon: require('../images/profile/name-icon.png'),
	emailIcon: require('../images/profile/email-icon.png'),
	passwordIcon: require('../images/profile/password-icon.png'),
	signOutIcon: require('../images/profile/signout-icon.png'),
}

const ProfileScreen = ({ navigation }) => {
	const [state, setState] = useContext(UserContext);
	const { signOut } = React.useContext(AuthContext);

	return (
		<View style={styles.container}>
			<View style={styles.greetingContainer}>
				<Text style={styles.greetingTopText}>Hello, {state.name}!</Text>
				<Text style={styles.greetingBottomText}>{state.email}</Text>
			</View>

			<ScrollView>
				<View style={styles.buttonGroup}>
					<ProfileButton 
						icon={icons.nameIcon}
						topLabel="Change Display Name"
						bottomLabel="Update your display name. This will not affect your login." 
					/>

					<ProfileButton 
						icon={icons.emailIcon}
						topLabel="Change Email Address"
						bottomLabel="Change the email address associated with your account." 
					/>

					<ProfileButton 
						icon={icons.passwordIcon}
						topLabel="Change Password"
						bottomLabel="Change your password, effective immediately." 
						labelContainerStyles={{borderBottomColor: '#FFFFFF', borderBottomWidth: 0}}
					/>
				</View>

				<View style={styles.signOutButton}>
					<ProfileButton 
						icon={icons.signOutIcon}
						topLabel="Sign Out"
						bottomLabel="Logout out of your Seppi account. See you later!" 
						labelContainerStyles={{borderBottomColor: '#FFFFFF', borderBottomWidth: 0}}
						onPress={signOut}
					/>
				</View>
			</ScrollView>

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
		backgroundColor: '#ECECEC',
		width: '100%',
		height: deviceHeight * 0.4,
		marginVertical: 30,

	},
	buttonGroup: {
		width: deviceWidth,
		borderTopColor: 'gray',
		borderTopWidth: 2,
		borderBottomColor: 'gray',
		borderBottomWidth: 2,
		marginTop: 50,
	},
	signOutButton: {
		marginTop: 30,
		borderTopColor: 'gray',
		borderTopWidth: 2,
		borderBottomColor: 'gray',
		borderBottomWidth: 2,
	},
})

export default ProfileScreen;