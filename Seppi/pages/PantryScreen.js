import React, { useState } from 'react';
import { View, Image, Text, StyleSheet, ScrollView, KeyboardAvoidingView, TouchableOpacity, Button, TextInput } from 'react-native';
import Collapsible from 'react-native-collapsible';

import Modal from 'react-native-modal';

import Toolbar from '../components/Toolbar';
import AppTextInput from '../components/AppTextInput';
import AppButton from '../components/AppButton';
import CategoryButton from '../components/CategoryButton';
import { deviceWidth, deviceHeight, buildPath } from '../utils';

const PantryScreen = ({ navigation }) => {
	const [isExpiredCollapsed, setIsExpiredCollapsed] = useState(false);
	const [isCategoriesCollapsed, setIsCategoriesCollapsed] = useState(false);
	const [addCategoryVisible, setAddCategoryVisible] = useState(false);

	const [categoryText, setCategoryText] = useState('');
	const [categoryResult, setCategoryResult] = useState('');

	const toggleAddCategory = () => {
		setAddCategoryVisible(!addCategoryVisible);
	};

	const createCategory = () => {
		setCategoryResult('');

		if (categoryText === undefined || categoryText.length === 0) {
			setCategoryResult('Please enter a valid category name.');
			return;
		}

		console.log('good category');
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
						title="Submit"
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

			<ScrollView>
				<View style={styles.collapsedContainer}>
					<TouchableOpacity style={styles.header} onPress={() => setIsExpiredCollapsed(!isExpiredCollapsed)}>
						<Text style={styles.headerText}>Expired</Text>
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
							
						</View>
					</Collapsible>
				</View>

				<View style={styles.collapsedContainer}>
					<TouchableOpacity style={styles.header} onPress={() => setIsCategoriesCollapsed(!isCategoriesCollapsed)}>
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

							<CategoryButton 
								header="Freezer"
							/>
							
						</View>
					</Collapsible>
				</View>
			</ScrollView>

			<TouchableOpacity style={styles.barcodeButtonContainer} activeOpacity={0.6}>
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
		marginLeft: 'auto',
		margin: 10,
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
});

export default PantryScreen;