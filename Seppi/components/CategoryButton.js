import React, { useState, useContext } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Collapsible from 'react-native-collapsible';

import { deviceWidth, deviceHeight } from '../utils';
import CategoryItem from './CategoryItem';
import { UserContext } from '../context';
import { AirbnbRating } from 'react-native-elements';

const CategoryButton = (props) => {
	const [isCollapsed, setIsCollapsed] = useState(true);
	const [state, setState] = useContext(UserContext);

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

	const deleteCategory = async () => {
		let array = state.categories;
		let index = -1;

		if (array === undefined)
			return;

		for (let i = 0; i < array.length; ++i) {
			if (array[i].category === props.header)
				index = i;
		}

		if (index !== -1) {
			array.splice(index, 1);
			setState(state => ({ ...state, categories: array}));
		}
	};

	const showAlert = async () => {
		await createAlert();
	};

	return (
		<View style={styles.collapsedContainer}>
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

				</View>
			</Collapsible>
		</View>
	);
};

const styles = StyleSheet.create({
	collapsedContainer: {
		flexDirection: 'column',
		width: deviceWidth,
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
});

export default CategoryButton;