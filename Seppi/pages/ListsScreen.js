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
		setAddItemVisible(!addItemVisible);
	};

	const fetchGroceries = async () => {
		console.log('fetching groceries');


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

					<Text style={styles.addItemResultText}>{addItemResult}</Text>

					<AppButton
						onPress={() => console.log('add')}
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
				<Text style={styles.topText}>x Items | y Items Completed</Text>
			</View>

			<ScrollView contentContainerStyle={styles.scrollView}>
				<GroceryItem 
					itemName="Frozen Broccoli"
					itemNotes="Get the florettes!"
				/>
			</ScrollView>

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
		maxHeight: 300,
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