import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, KeyboardAvoidingView, TouchableOpacity, Image } from 'react-native';
import Modal from 'react-native-modal';

import { deviceHeight, deviceWidth, buildPath } from '../utils';
import Toolbar from '../components/Toolbar';
import GroceryItem from '../components/GroceryItem';
import AppButton from '../components/AppButton';
import AppTextInput from '../components/AppTextInput';
import { UserContext } from '../context';

const ListsScreen = ({ navigation }) => {
	const [addItemVisible, setAddItemVisible] = useState(false);
	const [itemText, setItemText] = useState('');
	const [notesText, setNotesText] = useState('');
	const [addItemResult, setAddItemResult] = useState('');
	const [state, setState] = useContext(UserContext);

	const toggleAddItemModal = () => {
		setItemText('');
		setNotesText('');
		setAddItemResult('');
		setAddItemVisible(!addItemVisible);
	};

	const addGrocery = async() => {
		if (itemText.trim().length === 0) {
			setAddItemResult('Please input a non-empty ingredient name.');
			return;
		}

		const response = await fetch(buildPath('addGrocery'), {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				ingredient: itemText,
				note: notesText,
				idToken: state.idToken
			})
		}).catch(error => console.error(error));

		let status = await response.status;

		if (status !== 200) {
			setAddItemResult('Could not add grocery item due to server error.');
			return;
		}

		fetchGroceries();
		toggleAddItemModal();
	};

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
		console.log(json);
		setState(state => ({ ...state, list: json}));
	};

	const renderGroceries = () => {
		return (
			<ScrollView contentContainerStyle={styles.scrollView}>
				{state.list.response !== undefined ? state.list.response.map((item) => <GroceryItem key={item.id} id={item.id} itemName={item.ingredient} itemNotes={item.note} checked={item.check} />)
													: <View></View>}
			</ScrollView>
		);
	};

	return (
		<KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} style={styles.container}>
			<Modal
				backdropTransitionOutTiming={0}
				animationType="slide"
				isVisible={addItemVisible}
			>
				<View style={styles.centeredView}>
					<Text style={styles.overlayText}>Add Grocery Ingredient</Text>
					<AppTextInput
						value={itemText}
						onChangeText={text => setItemText(text)}
						placeholder="Ingredient Name"
						style={styles.overlayTextInput}
					/>
					<AppTextInput
						value={notesText}
						onChangeText={text => setNotesText(text)}
						placeholder="Notes (optional)"
						style={styles.overlayTextInput}
					/>

					<Text style={styles.addItemResultText}>{addItemResult}</Text>

					<AppButton
						onPress={addGrocery}
						title="Add"
						buttonColor="#FA730B"
						textColor="#FFFFFF"
					/>

					<AppButton
						onPress={toggleAddItemModal}
						title="Cancel"
						buttonColor="#EDEEF1"
						textColor="#000000"
					/>
				</View>
			</Modal>

			<View style={styles.topBar}>
				<Text style={styles.topText}>{state.list.response !== undefined ? state.list.response.length : 0} Items | {state.list.numChecked} Items Completed</Text>
			</View>

			{renderGroceries()}				

			<TouchableOpacity onPress={toggleAddItemModal} style={styles.addButtonContainer} activeOpacity={0.6}>
				<Image source={require('../images/lists/add-button.png')} />
			</TouchableOpacity>

			<Toolbar />
		</KeyboardAvoidingView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: deviceWidth,
		height: deviceHeight,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#FFFFFF',
	},
	topBar: {
		backgroundColor: '#E7E7E7',
		width: deviceWidth,
		height: 40,
		justifyContent: 'center',
		alignItems: 'center',
	},
	topText: {
		fontFamily: 'Inter',
		fontWeight: 'bold',
		fontSize: 18,
		lineHeight: 24,
		textAlign: 'center',
	},
	addButtonContainer: {
		position: 'absolute',
		bottom: 90,
		right: 10,
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
		marginVertical: 20,
		width: 250,
	},
	addItemResultText: {
		fontWeight: 'bold',
		textAlign: 'center',
		textAlignVertical: 'center',
	},
	scrollView: {
		paddingBottom: 100,
	},
});

export default ListsScreen;