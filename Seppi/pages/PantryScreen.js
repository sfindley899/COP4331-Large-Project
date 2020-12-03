import React, { useState, useContext } from 'react';
import { View, Image, Text, StyleSheet, ScrollView, KeyboardAvoidingView, TouchableOpacity, Button, TextInput } from 'react-native';
import Collapsible from 'react-native-collapsible';
import Modal from 'react-native-modal';

import Toolbar from '../components/Toolbar';
import AppTextInput from '../components/AppTextInput';
import AppButton from '../components/AppButton';
import CategoryButton from '../components/CategoryButton';
import { UserContext } from '../context';
import { deviceWidth, deviceHeight, buildPath } from '../utils';
import ExpiringItem from '../components/ExpiringItem';

const PantryScreen = ({ navigation }) => {
	const [isExpiredCollapsed, setIsExpiredCollapsed] = useState(true);
	const [isCategoriesCollapsed, setIsCategoriesCollapsed] = useState(false);
	const [addCategoryVisible, setAddCategoryVisible] = useState(false);

	const [categoryText, setCategoryText] = useState('');
	const [categoryResult, setCategoryResult] = useState('');
	const [state, setState] = useContext(UserContext);

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

	const toggleAddCategory = () => {
		setAddCategoryVisible(!addCategoryVisible);
	};

	const toggleIsCategoriesCollapsed = () => {
		setIsCategoriesCollapsed(!isCategoriesCollapsed);
	};

	const createCategory = async () => {
		setCategoryResult('');

		if (categoryText === undefined || categoryText.length === 0 || categoryText.trim().length == 0) {
			setCategoryResult('Please enter a valid category name.');
			return;
		}

		// Submit the request to the server to add the category to the db.
		const response = await fetch(buildPath('addCategory'), {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				category: categoryText,
				idToken: state.idToken
			})
		}).catch(error => console.error(error));

		let status = await response.status;

		if (status === 401) {
			setCategoryResult('You already have a category with that name.');
			return;
		}
		else if (status !== 200) {
			setCategoryResult('Failed to add category due to server error.');
			return;
		}

		state.categories[categoryText] = [];
		setState(state => ({ ...state, categories: state.categories}));
		setCategoryText('');
		toggleAddCategory();
	};

	const renderCategories = () => {
		return (
			<View>
				{Object.entries(state.categories) !== undefined ? Object.entries(state.categories).map((item, index) => <CategoryButton items={item[1]} header={item[0]} key={item[0]} />) :
																  <View></View>}
			</View>
		);
	};

	const renderExpiringItems = () => {
		return (
			<View>
				{state.expiring.map((item, index) => <ExpiringItem key={item.ingredient} category={item.category} itemName={item.ingredient} itemExpiration={item.daysExpired} />)}
			</View>
		);
	};

	return (
		<KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} style={styles.container}>
			<Modal
				backdropTransitionOutTiming={0}
				animationType="slide"
				isVisible={addCategoryVisible}
			>
				<View style={styles.centeredView}>
					<Text style={styles.overlayText}>Add New Category</Text>
					<AppTextInput 
						value={categoryText}
						onChangeText={text => setCategoryText(text)}
						placeholder="Category Name"
						style={styles.overlayTextInput}
					/>

					<Text style={styles.categoryResultText}>{categoryResult}</Text>

					<AppButton
						onPress={createCategory}
						title="Add"
						buttonColor="#FA730B"
						textColor="#FFFFFF"
					/>

					<AppButton
						onPress={toggleAddCategory}
						title="Cancel"
						buttonColor="#EDEEF1"
						textColor="#000000"
					/>
				</View>
			</Modal>

			<ScrollView contentContainerStyle={styles.scrollView}>
				<View style={styles.collapsedContainer}>
					<TouchableOpacity style={styles.header} onPress={() => {fetchExpiring(); setIsExpiredCollapsed(!isExpiredCollapsed);}}>
						<Text style={styles.headerText}>Expiring Soon/Expired</Text>
						<Image 
							style={styles.icon} 
							source={isExpiredCollapsed ? 
									require('../images/pantry/right-arrow-white.png') : 
									require('../images/pantry/down-arrow-white.png')} 
						/>
					</TouchableOpacity>

					<Collapsible
						collapsed={isExpiredCollapsed}
					>
						<View>
							{renderExpiringItems()}
						</View>
					</Collapsible>
				</View>

				<View style={styles.collapsedContainer}>
					<TouchableOpacity style={styles.header} onPress={toggleIsCategoriesCollapsed}>
						<Text style={styles.headerText}>Categories</Text>
						<Image 
							style={styles.icon} 
							source={isCategoriesCollapsed ? 
									require('../images/pantry/right-arrow-white.png') : 
									require('../images/pantry/down-arrow-white.png')} 
						/>
					</TouchableOpacity>

					<Collapsible
						collapsed={isCategoriesCollapsed}
					>
						<View>
							<TouchableOpacity style={styles.newCategoryButton} activeOpacity={0.6} onPress={toggleAddCategory}>
								<Image style={styles.plusIcon} source={require('../images/pantry/add-icon.png')} />
								<Text style={styles.categoryText}>New Category</Text>
							</TouchableOpacity>

							{renderCategories()}
							
						</View>
					</Collapsible>
				</View>
			</ScrollView>

			<TouchableOpacity onPress={() => navigation.navigate('Barcode')} style={styles.barcodeButtonContainer} activeOpacity={0.6}>
				<Image source={require('../images/pantry/barcode-button.png')} />
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
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		width: deviceWidth,
		height: 36,
		backgroundColor: '#FA730B',
		borderColor: 'gray',
		borderWidth: 1,
	},
	headerText: {
		fontFamily: 'Inter',
		fontWeight: 'bold',
		fontSize: 22,
		lineHeight: 24,
		textAlign: 'left',
		paddingVertical: 10,
		paddingLeft: 10,
		color: '#FFFFFF',
	},
	icon: {
		resizeMode: 'contain',
		marginRight: 20,
	},
	barcodeButtonContainer: {
		position: 'absolute',
		bottom: 90,
		right: 10,
	},
	newCategoryButton: {
		alignItems: 'center',
		width: deviceWidth,
		height: 60,
		flexDirection: 'row',
		backgroundColor: '#F5F5F5',
	},
	categoryText: {
		fontFamily: 'Inter',
		fontWeight: 'bold',
		fontSize: 16,
		lineHeight: 20,
		textAlign: 'left',
		textAlignVertical: 'center',
		paddingHorizontal: 5,
	},
	plusIcon: {
		resizeMode: 'contain',
		marginLeft: 10,
		marginRight: 10,
	},
	collapsedContainer: {
		width: deviceWidth,
		flexDirection: 'column',
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
	categoryResultText: {
		fontWeight: 'bold',
		textAlign: 'center',
		textAlignVertical: 'center',
	},
	scrollView: {
		paddingBottom: 100,
	},
});

export default PantryScreen;