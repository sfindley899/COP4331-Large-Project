import React, { useState, useContext } from 'react';
import { Text, View, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';

import AppButton from '../components/AppButton';
import AppTextInput from '../components/AppTextInput';
import { buildPath, deviceHeight, deviceWidth } from '../utils';
import { UserContext } from '../context';

const ChangeUsernameScreen = ({ navigation }) => {
	const [state, setState] = useContext(UserContext);
	const [name, setName] = useState(state.name);
	const [changeUsernameResult, setChangeUsernameResult] = useState('');

	const changeUsername = async event => {
		setChangeUsernameResult('');

		if (name.length === 0)
		{
			setChangeUsernameResult('Please input a non-empty name.');
			return;
		}

		const response = await fetch(buildPath('changeDisplayName'), {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				name: name
			})
		}).catch((error) => console.error(error));

		let status = await response.status;	
		if (status === 200)
		{
			let json = JSON.parse(await response.text());
			setChangeUsernameResult('Successfully changed your display name to ' + json.name + '.');
			setState(state => ({ ...state, name: json.name }));
		}
		else
		{
			setChangeUsernameResult('Could not change your display name due to internal server error.');
			return;
		}
	};

	return (
		<View>
			<ScrollView>
				<View style={styles.usernameOverlayContainer}>
					<Image style={styles.icon} source={require('../images/app-icon.png')} />
					<Text style={styles.usernameOverlayTopLabel}>Change Display Name</Text>
					
					<AppTextInput 
						value={name}
						onChangeText={name => setName(name)}
						placeholder='New Display Name'
						autoCapitalize={"words"}
						style={styles.textInput}
					/>
					<View style={styles.buttonGroup}>
						<AppButton 
							buttonColor='#FA730B'
							textColor='#FFFFFF'
							title="Change Display Name"
							onPress={changeUsername}
						/>
						<AppButton 
							buttonColor="#FFFFFF"
							textColor="#000000"
							title="Back"
							onPress={() => navigation.navigate('Profile')}
						/>
					</View>
					<Text style={styles.changeUsernameResult}>{changeUsernameResult}</Text>
				</View>
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	usernameOverlay: {
		flex: 1, 
		flexDirection: 'column',
		backgroundColor: '#EDEEF1',
		width: deviceWidth,
		height: deviceHeight,
		alignItems: 'center',
	},
	usernameOverlayTopLabel: {
		fontFamily: 'Inter',
		fontWeight: 'bold',
		fontSize: 30,
		lineHeight: 24,
		textAlign: 'center',
		paddingTop: 35,
	},
	usernameOverlayContainer: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	icon: {
		marginTop: 50,
	},
	textInput: {
		borderWidth: 2,
		borderColor: 'gray',
		marginTop: 30,
	},
	changeNameButton: {
		marginTop: 10,
	},
	changeUsernameResult: {
		textAlign: 'center',
		width: 310,
		fontFamily: "Righteous",
		fontWeight: '700',
		fontSize: 16,
		marginVertical: 10,
	},
	buttonGroup: {
		alignItems: 'center',
		marginTop: 20,
	},
});

export default ChangeUsernameScreen;