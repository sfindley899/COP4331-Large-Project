import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert, ScrollView, KeyboardAvoidingView } from 'react-native';
import { CheckBox } from 'react-native-elements';
import Modal from 'react-native-modal';

import { deviceWidth, deviceHeight, buildPath } from '../utils';
import { UserContext } from '../context';
import AppTextInput from '../components/AppTextInput';
import AppButton from '../components/AppButton';

const GroceryItem = (props) => {
	const [isChecked, setIsChecked] = useState(props.checked);
	const [isEditModalVisible, setIsEditModalVisible] = useState(false);
	const [ingredientText, setIngredientText] = useState(props.itemName);
	const [notesText, setNotesText] = useState(props.itemNotes);
	const [editResult, setEditResult] = useState('');
	const [state, setState] = useContext(UserContext);

	const fetchGroceries = async () => {
		const response = await fetch(buildPath('getGrocery'), {
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
			console.log('Could not fetch groceries.');
			return;
		}

		let json = JSON.parse(await response.text());
		setState(state => ({ ...state, list: json}));
	};

	const deleteGrocery = async () => {
		const response = await fetch(buildPath('deleteGrocery'), {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				id: props.id,
				idToken: state.idToken
			})
		}).catch(error => console.error(error));

		let status = await response.status;

		if (status !== 200) {
			console.log('Could not delete grocery due to server error.');
			return;
		}

		fetchGroceries();
	};

	const updateGrocery = async () => {
		const response = await fetch(buildPath('updateGrocery'), {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				ingredient: props.itemName,
				note: props.itemNotes,
				check: !isChecked,
				id: props.id,
				idToken: state.idToken
			})
		}).catch(error => console.error(error));

		let status = await response.status;
		console.log(await response.text());

		if (status !== 200) {
			console.log('Could not update grocery due to server error.');
			return;
		}

		fetchGroceries();
	};

	const editGrocery = async () => {
		if (ingredientText.trim().length === 0) {
			setEditResult('Enter a non-empty ingredient name.');
			return;
		}

		const response = await fetch(buildPath('updateGrocery'), {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				ingredient: ingredientText,
				note: notesText,
				check: isChecked,
				id: props.id,
				idToken: state.idToken
			})
		}).catch(error => console.error(error));

		let status = await response.status;

		if (status !== 200) {
			console.log('Could not update grocery due to server error.');
			return;
		}

		fetchGroceries();
		toggleEditModal();
	};

	const toggleEditModal = () => {
		setEditResult('');
		setIngredientText(props.itemName);
		setNotesText(props.itemNotes);
		setIsEditModalVisible(!isEditModalVisible);
	}

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
	        { text: "OK", onPress: deleteGrocery }
	      ],
	      { cancelable: false }
	    );
	});

	const showAlert = async () => {
		await createAlert();
	};

	const toggleIsChecked = () => {
		setIsChecked(!isChecked);
	}

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
						<Text style={styles.overlayText}>Edit Grocery</Text>

						<AppTextInput 
							value={ingredientText}
							onChangeText={text => setIngredientText(text)}
							placeholder="Ingredient Name"
							style={styles.overlayTextInput}
						/>

						<AppTextInput 
							value={notesText}
							onChangeText={text => setNotesText(text)}
							placeholder="Notes (optional)"
							style={styles.overlayTextInput}
						/>

						<Text style={styles.categoryResultText}>{editResult}</Text>

						 <AppButton 
						 	onPress={editGrocery}
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

			<TouchableOpacity activeOpacity={0.5} style={styles.checkedContainer} 
				onPress={() => {
					toggleIsChecked();
					updateGrocery();
				}}
			>
				<CheckBox style={styles.icon} checked={isChecked} onPress={() => {toggleIsChecked(); updateGrocery();}} />
				<View style={styles.textContainer}>
					<Text style={styles.itemText}>{props.itemName}</Text>
					<Text style={styles.noteText}>{props.itemNotes}</Text>
				</View>
			</TouchableOpacity>

			<View style={styles.buttonsContainer}>
				<TouchableOpacity activeOpacity={0.5} onPress={toggleEditModal}>
					<Image style={styles.icon} source={require('../images/pantry/pencil.png')} />
				</TouchableOpacity>

				<TouchableOpacity activeOpacity={0.5} onPress={showAlert}>
					<Image style={styles.icon} source={require('../images/pantry/delete.png')} />
				</TouchableOpacity>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		backgroundColor: '#FFFFFF',
		width: deviceWidth,
		height: 'auto',
		justifyContent: 'space-between',
		paddingHorizontal: 5,
		borderBottomColor: '#9F9F9F',
		borderBottomWidth: 1,
	},
	checkedContainer: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
	},
	textContainer: {
		flexDirection: 'column',
		width: deviceWidth * 0.6,
		justifyContent: 'flex-start',
	},
	itemText: {
		fontFamily: 'Inter',
		fontWeight: 'bold',
		fontSize: 16,
		lineHeight: 24,
		textAlign: 'left',
	},
	noteText: {
		fontFamily: 'Inter',
		fontWeight: 'bold',
		fontSize: 12,
		lineHeight: 24,
		textAlign: 'left',
		color: '#B1B1B1',
	},
	buttonsContainer: {
		flexDirection: 'row',
		paddingTop: 10,
		paddingRight: 25,
		justifyContent: 'space-around',
	},
	icon: {
		resizeMode: 'contain',
		paddingHorizontal: 20,
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

export default GroceryItem;