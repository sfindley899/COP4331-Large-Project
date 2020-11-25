import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';

import { deviceWidth, deviceHeight } from '../utils';

const CategoryItem = (props) => {

	return (
		<View style={styles.container}>
			<View style={styles.itemContainer}>
				<View style={styles.textContainer}>
					<Text style={styles.itemNameText}>{props.itemName}</Text>
					<Text style={styles.itemExpirationText}>{props.itemExpiration}</Text>
				</View>

				<View style={styles.buttonsContainer}>
					<TouchableOpacity style={styles.iconContainer} activeOpacity={0.4} onPress={() => console.log('edit pressed')}>
						<Image style={styles.icon} source={require('../images/pantry/pencil.png')} />
					</TouchableOpacity>

					<TouchableOpacity style={styles.iconContainer} activeOpacity={0.4} onPress={() => console.log('delete pressed')}>
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
});

export default CategoryItem;