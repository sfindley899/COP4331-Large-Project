import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { CheckBox } from 'react-native-elements'

import { deviceWidth } from '../utils';
import { UserContext } from '../context';

const GroceryItem = (props) => {
	const [state, setState] = useContext(UserContext);

	return (
		<View style={styles.container}>
			<TouchableOpacity activeOpacity={0.5} style={styles.checkedContainer} onPress={() => console.log('checked pressed')}>
				<CheckBox style={styles.icon} checked={props.isChecked} onPress={props.onPress} />
				<View style={styles.textContainer}>
					<Text style={styles.itemText}>{props.itemName}</Text>
					<Text style={styles.noteText}>{props.itemNotes}</Text>
				</View>
			</TouchableOpacity>

			<View style={styles.buttonsContainer}>
				<TouchableOpacity activeOpacity={0.5} onPress={() => console.log('edit')}>
					<Image style={styles.icon} source={require('../images/pantry/pencil.png')} />
				</TouchableOpacity>

				<TouchableOpacity activeOpacity={0.5} onPress={() => console.log('delete')}>
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
	}
});

export default GroceryItem;