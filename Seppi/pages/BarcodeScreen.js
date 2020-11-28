import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { RNCamera } from 'react-native-camera';
import BarcodeMask from 'react-native-barcode-mask';

import { deviceWidth, deviceHeight, buildPath } from '../utils';

const BarcodeScreen = ({ navigation }) => {
	const lookupBarcode = async (code) => {
		const response  = await fetch(buildPath('lookupBarcode'), {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				code: code
			})
		}).catch(error => console.error(error));

		let status = await response.status;
		console.log(status);

		// TODO: pop-up respective overlay depending on success/failrue
		if (status === 401) {
			console.log('Could not find barcode data in database!')
			return;
		}
		else if (status !== 200) {
			console.log('Could not find barcode data due to server error.');
			return;
		}

		console.log('found data!');
		let json = response.json();
		console.log(json);
	};

	return (
		<View style={styles.container}>
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
			  <TouchableOpacity activeOpacity={0.5} onPress={() => console.log('test')}>
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
});

export default BarcodeScreen;