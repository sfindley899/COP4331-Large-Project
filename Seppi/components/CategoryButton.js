import React, { useState, useContext } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert, Button, ScrollView, KeyboardAvoidingView, Platform, PanResponder } from 'react-native';
import Collapsible from 'react-native-collapsible';
import Modal from 'react-native-modal';

import { deviceWidth, deviceHeight, buildPath } from '../utils';
import CategoryItem from './CategoryItem';
import { UserContext } from '../context';
import AppButton from '../components/AppButton';
import AppTextInput from '../components/AppTextInput';

const CategoryButton = (props) => {
	const [isCollapsed, setIsCollapsed] = useState(true);
	const [state, setState] = useContext(UserContext);
	const [ingredientText, setIngredientText] = useState('');
	const [expirationText, setExpirationText] = useState('');
	const [addItemModalVisible, setAddItemModalVisible] = useState(false);
	const [addIngredientResult, setAddIngredientResult] = useState('');

	const createAlert = async () => new Promise((resolve) => {
		Alert.alert(
	      "Delete Category",
	      "Are you sure you want to delete this category and all its items?",
	      [
	        {
	          text: "CANCEL",
	          onPress: () => resolve('CANCELED'),
	          style: "cancel"
	        },
	        { text: "OK", onPress: deleteCategory }
	      ],
	      { cancelable: false }
	    );
	});

	const toggleAddItemModal = () => {
		setIngredientText('');
		setExpirationText('');
		setAddItemModalVisible(!addItemModalVisible);
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

	const addIngredient = async () => {
		setAddIngredientResult('');

		const re = /^(?:(?:(?:0?[13578]|1[02])(\/|-|\.)31)\1|(?:(?:0?[1,3-9]|1[0-2])(\/|-|\.)(?:29|30)\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:0?2(\/|-|\.)29\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:(?:0?[1-9])|(?:1[0-2]))(\/|-|\.)(?:0?[1-9]|1\d|2[0-8])\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;

		if (ingredientText === undefined || ingredientText.trim().length === 0) {
			setAddIngredientResult('Please enter a non-empty ingredient name.');
			return;
		}
		else if (expirationText === undefined || expirationText.trim().length === 0) {
			setExpirationText('No Expiration');
		}
		else if (!re.test(expirationText)) {
			setAddIngredientResult('Please enter a valid date in format dd/mm/yyyy');
			return;
		}

		const response = await fetch(buildPath('addIngredient'), {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				category: props.header,
				ingredient: ingredientText,
				expiration: expirationText,
				idToken: state.idToken
			})
		}).catch(error => console.error(error));

		let status = await response.status;

		if (status === 401) {
			setAddIngredientResult('You already have this ingredient in this category.');
			return;
		}
		else if (status !== 200) {
			setAddIngredientResult('Can\'t add ingredient due to server error.');
			return;
		}

		const response2 = await fetch(buildPath('getCategories'), {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
            body: JSON.stringify({
                idToken: state.idToken
            })
		}).catch(error => console.error(error));

		let status2 = await response2.status;

		if (status2 !== 200) {
			console.log('Could not fetch ingredients for categories.');
			return;
		}

		let json = JSON.parse(await response2.text());
		let categoriesJson = json.categories;
		setState(state => ({ ...state, categories : categoriesJson}));

		fetchExpiring();
		setAddItemModalVisible(!addItemModalVisible);
	}

	const deleteCategory = async () => {
		let categoriesJson = state.categories;

		if (categoriesJson === undefined)
			return;

		const response = await fetch(buildPath('removeCategory'), {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				category: props.header,
				idToken: state.idToken
			})
		}).catch(error => console.error(error));

		let status = await response.status;

		if (status !== 200) {
			console.log('Failed to delete category due to server error.');
			return;
		}

		delete categoriesJson[props.header];
		setState(state => ({ ...state, categories: categoriesJson}));
	};

	const showAlert = async () => {
		await createAlert();
	};

	return (
		<View style={styles.collapsedContainer}>
			<Modal
				backdropTransitionOutTiming={0}
				animationType="slide"
				isVisible={addItemModalVisible}
			>
				<KeyboardAvoidingView
					style={styles.centeredView}
					behavior={Platform.OS == "ios" ? "padding" : "height"}
				    keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
				 >
					 <ScrollView contentContainerStyle={styles.centeredView}>
						<Text style={styles.overlayText}>Add Ingredient</Text>
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

						<Text style={styles.categoryResultText}>{addIngredientResult}</Text>

						<AppButton
							onPress={addIngredient}
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
					</ScrollView>
				</KeyboardAvoidingView>
			</Modal>

			<TouchableOpacity style={styles.header} onPress={() => setIsCollapsed(!isCollapsed)}>
				<Text style={styles.headerText}>{props.header}</Text>
				<Image 
					style={styles.icon} 
					source={isCollapsed ? require('../images/pantry/right-arrow.png') : require('../images/pantry/down-arrow.png')} />
			</TouchableOpacity>

			<Collapsible
				collapsed={isCollapsed}
			>

				<View>
					<TouchableOpacity style={styles.deleteCategoryButton} activeOpacity={0.6} onPress={showAlert}>
						<Image style={styles.deleteIcon} source={require('../images/pantry/remove-circle.png')} />
						<Text style={styles.headerText}>Delete Category</Text>
					</TouchableOpacity>

					<TouchableOpacity style={styles.deleteCategoryButton} activeOpacity={0.6} onPress={toggleAddItemModal}>
						<Image style={styles.deleteIcon} source={require('../images/pantry/add-icon-circle.png')} />
						<Text style={styles.headerText}>Add Item</Text>
					</TouchableOpacity>

					{props.items !== undefined ? props.items.map((item, index) => <CategoryItem key={item.ingredient} category={props.header} itemName={item.ingredient} itemExpiration={item.expiration} />) :
												<View></View>}
				</View>
			</Collapsible>
		</View>
	);
};

const styles = StyleSheet.create({
	collapsedContainer: {
		flexDirection: 'column',
		width: deviceWidth,
		height: 'auto',
	},
	header: {
		flexDirection: 'row',
		width: deviceWidth,
		alignItems: 'center',
		justifyContent: 'space-between',
		borderBottomColor: '#FA730B',
		borderBottomWidth: 1,
		height: 60,
	},
	headerText: {
		fontFamily: 'Inter',
		fontWeight: 'bold',
		fontSize: 16,
		lineHeight: 24,
		textAlign: 'left',
		width: deviceWidth * 0.8,
		textAlignVertical: 'center',
		marginLeft: 15,
	},
	icon: {
		resizeMode: 'contain',
		marginRight: 26,
	},
	deleteIcon: {
		resizeMode: 'contain',
	},
	deleteCategoryButton: {
		alignItems: 'center',
		paddingLeft: 15,
		width: deviceWidth,
		height: 60,
		flexDirection: 'row',
		backgroundColor: '#F5F5F5'
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

export default CategoryButton;