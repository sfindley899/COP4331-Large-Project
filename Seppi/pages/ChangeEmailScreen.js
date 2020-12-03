import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { openInbox } from 'react-native-email-link';

import AppTextInput from '../components/AppTextInput';
import AppButton from '../components/AppButton';
import { UserContext } from '../context';
import { buildPath, deviceHeight, deviceWidth } from '../utils';

const ChangeEmailScreen = ({ navigation }) => {
	const [state, setState] = useContext(UserContext);
	const [email, setEmail] = useState(state.email);
	const [changeEmailResult, setChangeEmailResult] = useState('');

	const changeEmail = async event => {
		setChangeEmailResult('');

		if (email.length === 0)
		{
			setChangeEmailResult('Please input a non-empty email.');
			return;
		}

		const response = await fetch(buildPath('changeEmail'), {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				email : email
			})
		}).catch((error) => console.error(error));

		let status = await response.status;

		if (status === 200)
		{
			setState(state => ({ ...state, email: email }));
			navigation.navigate('Validate Email', { data : { backgroundColor: '#EDEEF1'} });
			return;
		}
		else
		{
			setChangeEmailResult('Failed to change email due to internal server error.');
			return;
		}
	};

	return (
		<ScrollView>
			<View style={styles.container}>
				<Image style={styles.icon} source={require('../images/app-icon.png')} />
				<Text style={styles.topLabel}>Change Email</Text>

				<AppTextInput 
					style={styles.textInput}
					autoCapitalize="none"
					placeholder="New Email"
					value={email}
					onChangeText={email => setEmail(email)}
				/>

				<View style={styles.buttonGroup}>
					<AppButton 
						title="Change Email"
						onPress={changeEmail}
						buttonColor="#FA730B"
						textColor="#FFFFFF"
					/>

					<AppButton 
						buttonColor="#FFFFFF"
						textColor="#000000"
						title="Back"
						onPress={() => navigation.navigate('Profile')}
					/>
				</View>
				<Text style={styles.changeEmailResult}>{changeEmailResult}</Text>
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		width: deviceWidth,
		height: deviceHeight,
		flex: 1, 
		flexDirection: 'column',
		backgroundColor: '#EDEEF1',
		alignItems: 'center',
	},
	icon: {
		marginTop: 50,
	},
	topLabel: {
		fontFamily: 'Inter',
		fontWeight: 'bold',
		fontSize: 30,
		lineHeight: 24,
		textAlign: 'center',
		paddingTop: 35,
	},
	textInput: {
		borderWidth: 2,
		borderColor: 'gray',
		marginTop: 30,
	},
	changeEmailResult: {
		textAlign: 'center',
		width: 310,
		fontFamily: "Righteous",
		fontWeight: '700',
		fontSize: 16,
		marginVertical: 10,
	},
	buttonGroup: {
		alignItems: 'center',
		marginTop: 20
	},
});

export default ChangeEmailScreen;