import React, { useState, useContext } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, Alert, ScrollView, Platform, KeyboardAvoidingView, Button } from 'react-native';
import Modal from 'react-native-modal';

import { deviceWidth, deviceHeight, buildPath } from '../utils';
import { UserContext } from '../context';
import AppButton from '../components/AppButton';
import AppTextInput from '../components/AppTextInput';

const CategoryItem = (props) => {
	const [state, setState] = useContext(UserContext);
	const [ingredientText, setIngredientText] = useState('');
	const [expirationText, setExpirationText] = useState('');
	const [isEditModalVisible, setIsEditModalVisible] = useState(false);
	const [editResult, setEditResult] = useState('');

	const createAlert = async () => new Promise((resolve) => {
		Alert.alert(
	      "Delete Item",
	      "Are you sure you want to delete this item?",
	      [
	        {
	          text: "CANCEL",
	          onPress: () => resolve('CANCELED'),
	          style: "cancel"
	        },
	        { text: "OK", onPress: deleteIngredient }
	      ],
	      { cancelable: false }
	    );
	});

	const showAlert = async () => {
		await createAlert();
	};

	const fetchIngredients = async () => {
		const response = await fetch(buildPath('getCategories'), {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
            body: JSON.stringify({
                idToken: state.idToken
            })
		}).catch(error => console.error(error));

		let status = await response.status;

		if (status !== 200) {
			console.log('Could not fetch ingredients for categories.');
			return;
		}

		let json = JSON.parse(await response.text());
		let categoriesJson = json.categories;
		setState(state => ({ ...state, categories : categoriesJson}));
	};

	const fetchExpiring = async () => {
		const response = await fetch(buildPath('getExpiringIngredients'), {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
            body: JSON.stringify({
                idToken: state.idToken
            })
		}).catch(error => console.error(error));

		let status = await response.status;
		
		if (status !== 200) {
			console.log('Could not fetch expiring ingredients.');
			return;
		}

		let json = JSON.parse(await response.text());
		setState(state => ({ ...state, expiring: json.expiring}));
	};

	const deleteIngredient = async () => {
		const response = await fetch(buildPath('removeIngredient'), {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				ingredient: props.itemName,
				category: props.category,
				idToken: state.idToken
			})
		}).catch(error => console.error(error));

		let status = await response.status;

		if (status === 401) {
			console.log('Ingredient doesn\'t exist in the database.');
			return;
		}
		else if (status !== 200) {
			console.log('Could not delete item due to server error.');
			return;
		}

		fetchIngredients();
		fetchExpiring();
	};

	const toggleEditModal = () => {
		setEditResult('');
		setIngredientText(props.itemName);
		setExpirationText(props.itemExpiration);
		setIsEditModalVisible(!isEditModalVisible);
	};

	const editIngredient = async () => {
		let temp = expirationText;

		const re = /^(?:(?:(?:0?[13578]|1[02])(\/|-|\.)31)\1|(?:(?:0?[1,3-9]|1[0-2])(\/|-|\.)(?:29|30)\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:0?2(\/|-|\.)29\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:(?:0?[1-9])|(?:1[0-2]))(\/|-|\.)(?:0?[1-9]|1\d|2[0-8])\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;

		if (expirationText === undefined || expirationText.trim().length === 0) {
			setExpirationText('No Expiration');
			temp = 'No Expiration';
		}
		else if (!re.test(expirationText) && expirationText !== "No Expiration") {
			setEditResult('Please enter a valid date in format dd/mm/yyyy');
			return;
		}

		const response = await fetch(buildPath('editIngredient'), {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				category: props.category,
				ingredient: props.itemName,
				newIngredient: ingredientText,
				expiration: temp,
				idToken: state.idToken
			})
		}).catch(error => console.error(error));

		let status = await response.status;

		if (status === 401) {
			setEditResult('This ingredient name already exists for this category.');
			return;
		}
		else if (status !== 200) {
			setEditResult('Could not edit ingredient due to server error.');
			return;
		}

		fetchIngredients();
		fetchExpiring();
		toggleEditModal();
	};

	return (
		<View style={styles.container}>
			<Modal
				backdropTransitionOutTiming={0}
				animationType="slide"
				isVisible={isEditModalVisible}
			>
				<KeyboardAvoidingView
					style={styles.centeredView}
					behavior={Platform.OS == "ios" ? "padding" : "height"}
				    keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
				 >
					 <ScrollView contentContainerStyle={styles.centeredView}>
						<Text style={styles.overlayText}>Edit Ingredient</Text>

						<AppTextInput 
							value={ingredientText}
							onChangeText={text => setIngredientText(text)}
							placeholder="Ingredient Name"
							style={styles.overlayTextInput}
						/>

						<AppTextInput 
							value={expirationText}
							onChangeText={text => setExpirationText(text)}
							placeholder="Expiration Date (MM/DD/YYYY)"
							style={styles.overlayTextInput}
						/>

						<Text style={styles.categoryResultText}>{editResult}</Text>

						 <AppButton 
						 	onPress={editIngredient}
							title="Save Changes"
							buttonColor="#FA730B"
							textColor="#FFFFFF"
						 />

						 <AppButton 
							onPress={toggleEditModal}
							title="Cancel"
							buttonColor="#EDEEF1"
							textColor="#000000"
						 />
					 </ScrollView>
				</KeyboardAvoidingView>
			</Modal>

			<View style={styles.itemContainer}>
				<View style={styles.textContainer}>
					<Text style={styles.itemNameText}>{props.itemName}</Text>
					<Text style={styles.itemExpirationText}>{'Expiration Date: ' + props.itemExpiration}</Text>
				</View>

				<View style={styles.buttonsContainer}>
					<TouchableOpacity style={styles.iconContainer} activeOpacity={0.4} onPress={toggleEditModal}>
						<Image style={styles.icon} source={require('../images/pantry/pencil.png')} />
					</TouchableOpacity>

					<TouchableOpacity style={styles.iconContainer} activeOpacity={0.4} onPress={showAlert}>
						<Image style={styles.icon} source={require('../images/pantry/delete.png')} />
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		width: deviceWidth,
		height: 'auto',
	},
	itemContainer: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginLeft: 20,
		borderBottomColor: '#9F9F9F',
		borderBottomWidth: 1,
	},
	textContainer: {
		flexDirection: 'column',
		width: deviceWidth * 0.6,
	},
	itemNameText: {
		fontFamily: 'Inter',
		fontWeight: 'bold',
		fontSize: 16,
		lineHeight: 24,
		textAlign: 'left',
		textAlignVertical: 'center',
	},
	itemExpirationText: {
		fontFamily: 'Inter',
		fontStyle: 'normal',
		fontWeight: 'bold',
		fontSize: 12,
		lineHeight: 24,
		textAlign: 'left',
		textAlignVertical: 'center',
		color: '#B1B1B1',
	},
	icon: {
		resizeMode: 'contain',
	},
	iconContainer: {
		alignItems: 'center',
		justifyContent: 'center',
		paddingRight: 22,
		height: 40,
	},
	buttonsContainer: {
		flexDirection: 'row',
	},
	centeredView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: '#FFFFFF',
		maxHeight: 400,
		borderRadius: 30,
	},
	overlayText: {
		fontFamily: 'Inter',
		fontWeight: 'bold',
		fontSize: 20,
		lineHeight: 24,
		textAlign: 'center',
	},
	overlayTextInput: {
		marginVertical: 15,
		width: 250,
	},
	categoryResultText: {
		fontWeight: 'bold',
		textAlign: 'center',
		textAlignVertical: 'center',
	},
});

export default CategoryItem;