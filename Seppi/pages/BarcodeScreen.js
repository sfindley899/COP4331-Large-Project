import React, { useState, useContext } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Platform, ScrollView, KeyboardAvoidingView, ToastAndroid } from 'react-native';
import { RNCamera } from 'react-native-camera';
import BarcodeMask from 'react-native-barcode-mask';
import Modal from 'react-native-modal';

import { deviceWidth, deviceHeight, buildPath } from '../utils';
import AppButton from '../components/AppButton';
import AppTextInput from '../components/AppTextInput';
import { UserContext } from '../context';

const BarcodeScreen = ({ navigation }) => {
	const [isManualEntryVisible, setIsManualEntryVisible] = useState(false);
	const [codeText, setCodeText] = useState('');
	const [expirationText, setExpirationText] = useState('');
	const [categoryText, setCategoryText] = useState('');
	const [itemName, setItemName] = useState('');
	const [manualEntryResult, setManualEntryResult] = useState('');
	const [isItemFoundVisible, setIsItemFoundVisible] = useState(false);
	const [itemFoundResult, setItemFoundResult] = useState('');
	const [state, setState] = useContext(UserContext);

	const showToast = (text) => {
    	ToastAndroid.show(text, ToastAndroid.SHORT);
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

	const addIngredient = async () => {
		const re = /^(?:(?:(?:0?[13578]|1[02])(\/|-|\.)31)\1|(?:(?:0?[1,3-9]|1[0-2])(\/|-|\.)(?:29|30)\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:0?2(\/|-|\.)29\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:(?:0?[1-9])|(?:1[0-2]))(\/|-|\.)(?:0?[1-9]|1\d|2[0-8])\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;

		if (categoryText === undefined || categoryText.trim().length === 0) {
			setItemFoundResult('Please enter a non-empty category.');
			return;
		}
		else if (expirationText === undefined || expirationText.trim().length === 0) {
			setExpirationText('No Expiration');
		}
		else if (!re.test(expirationText)) {
			setItemFoundResult('Please enter a valid date in format dd/mm/yyyy');
			return;
		}

		const response = await fetch(buildPath('addIngredient'), {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				category: categoryText,
				ingredient: itemName,
				expiration: expirationText,
				idToken: state.idToken
			})
		}).catch(error => console.error(error));

		let status = await response.status;

		if (status === 401) {
			setItemFoundResult('Ingredient already exists for this category.');
			return;
		}
		else if (status !== 200) {
			setItemFoundResult('Could not add ingredient due to server error.');
			return;
		}

		showToast('Ingredient successfully added to pantry.')
		fetchIngredients();
		fetchExpiring();
		setIsItemFoundVisible(false);
	};

	const lookupBarcode = async (code) => {
		setManualEntryResult('');
		setCategoryText('');
		setExpirationText('');
		setItemName('');

		if (code === undefined || code.trim().length === 0) {
			setManualEntryResult('Please input a non-empty barcode number.');
			return;
		}

		const response  = await fetch(buildPath('lookupBarcode'), {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				code: code,
				idToken: state.idToken
			})
		}).catch(error => console.error(error));

		let status = await response.status;

		// Failure Overlay toast pop-up
		if (status === 401) {
			console.log('Could not find barcode data in database!')
			showToast("No results from barcode found.");
			return;
		}
		else if (status !== 200) {
			console.log('Could not find barcode data due to server error.');
			showToast("Could not find barcode data due to network error.")
			return;
		}

		let json = JSON.parse(await response.text());

		// Success overlay pop-up
		if (json.hints !== undefined & json.hints.length > 0)
		{
			console.log(json.hints[0].food.label);
			setItemName(json.hints[0].food.label);
			setIsItemFoundVisible(true);
		}
		
		setIsManualEntryVisible(false);
	};

	const toggleManualEntryVisible = () => {
		setIsManualEntryVisible(!isManualEntryVisible);
	};

	const toggleItemFoundVisible = () => {
		setIsItemFoundVisible(!isItemFoundVisible);
	};

	return (
		<View style={styles.container}>
			<Modal
				backdropTransitionOutTiming={0}
				animationType="slide-up"
				isVisible={isManualEntryVisible}
			>
				<KeyboardAvoidingView
					style={styles.centeredView}
					behavior={Platform.OS == "ios" ? "padding" : "height"}
				    keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
				 >
					<ScrollView contentContainerStyle={styles.centeredView}>
						<Text style={styles.overlayText}>Enter the number located at the bottom of the barcode.</Text>
						<AppTextInput 
							style={{marginTop: 30}}
							placeholder="Barcode Number"
							onChangeText={text => setCodeText(text)}
						/>

						<Text style={styles.resultText}>{manualEntryResult}</Text>
						<AppButton 
							title="Submit"
							onPress={() => lookupBarcode(codeText)}
							buttonColor="#FA730B"
							textColor="#FFFFFF"
						/>
						<AppButton 
							title="Cancel"
							onPress={toggleManualEntryVisible}
							buttonColor="#EDEEF1"
							textColor="#000000"
						/>
					</ScrollView>
				</KeyboardAvoidingView>
			</Modal>

			<Modal
				backdropTransitionOutTiming={0}
				animationType="slide-up"
				isVisible={isItemFoundVisible}
			>
				<KeyboardAvoidingView
					style={styles.centeredView}
					behavior={Platform.OS == "ios" ? "padding" : "height"}
				    keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
				 >
					<ScrollView contentContainerStyle={styles.centeredView}>
						<Text style={styles.overlayText}>{itemName}</Text>
						<AppTextInput 
							style={{marginTop: 30}}
							placeholder="Expiration Date (MM/DD/YYYY)"
							onChangeText={text => setExpirationText(text)}
						/>
						<AppTextInput 
							placeholder="Category"
							onChangeText={text => setCategoryText(text)}
						/>
						<Text style={styles.resultText}>{itemFoundResult}</Text>
						<AppButton 
							title="Add To Ingredients"
							onPress={addIngredient}
							buttonColor="#FA730B"
							textColor="#FFFFFF"
						/>
						<AppButton 
							title="Cancel"
							onPress={toggleItemFoundVisible}
							buttonColor="#EDEEF1"
							textColor="#000000"
						/>
					</ScrollView>
				</KeyboardAvoidingView>
			</Modal>

			<RNCamera
	          style={styles.preview}
	          type={RNCamera.Constants.Type.back}
	          flashMode={RNCamera.Constants.FlashMode.on}
	          androidCameraPermissionOptions={{
	            title: 'Permission to use camera',
	            message: 'We need your permission to use your camera',
	            buttonPositive: 'Ok',
	            buttonNegative: 'Cancel',
			  }}
			  captureAudio={false}
	          onGoogleVisionBarcodesDetected={({ barcodes }) => {
				if (barcodes === undefined || barcodes.length === 0)
					return;
				else if (barcodes[0].type !== 'PRODUCT')
					return;

				let code = barcodes[0].data;
				lookupBarcode(code);
	          }}
	        >
				<BarcodeMask width={300} height={150} />
			</RNCamera>

			<View style={styles.lowerSection}>
			  <Text style={styles.scannerText}>Scanner</Text>
			  <Text style={styles.scannerDescription}>Scan an item barcode to add it to your pantry!</Text>
			  <TouchableOpacity activeOpacity={0.5} onPress={toggleManualEntryVisible}>
			  	<Text style={styles.enterManuallyText}>Enter barcode number manually</Text>
			  </TouchableOpacity>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
  lowerSection: {
	flexDirection: 'column',
	width: deviceWidth,
	height: 110,
	backgroundColor: '#FFFFFF',
	justifyContent: 'center',
	alignItems: 'center',
  },
  scannerText: {
	fontFamily: 'Inter',
	fontWeight: 'bold',
	fontSize: 24,
	lineHeight: 24,
	textAlign: 'center',
	textAlignVertical: 'center',
  },
  scannerDescription: {
	fontFamily: 'Inter',
	fontWeight: 'bold',
	fontSize: 16,
	lineHeight: 24,
	textAlign: 'center',
	textAlignVertical: 'center',
  },
  enterManuallyText: {
	fontFamily: 'Inter',
	fontWeight: 'bold',
	fontSize: 14,
	lineHeight: 24,
	textAlign: 'center',
	textAlignVertical: 'center',
	textDecorationLine: 'underline',
	paddingTop: 10,
	color: '#B1B1B1',
  },
  centeredView: {
	maxHeight: 400,
	width: 350,
	height: 400,
	backgroundColor: '#FFFFFF',
	justifyContent: 'center',
	alignItems: 'center',
  },
  overlayText: {
	fontFamily: 'Inter',
	fontWeight: 'bold',
	fontSize: 20,
	lineHeight: 24,
	textAlign: 'center'
  },
  resultText: {
	fontWeight: 'bold',
	textAlign: 'center',
	textAlignVertical: 'center',
  },
});

export default BarcodeScreen;