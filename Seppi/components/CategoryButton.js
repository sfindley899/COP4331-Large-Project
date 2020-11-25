import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Collapsible from 'react-native-collapsible';

import { deviceWidth, deviceHeight } from '../utils';
import CategoryItem from './CategoryItem';

const CategoryButton = (props) => {
	const [isCollapsed, setIsCollapsed] = useState(true);

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
					<CategoryItem 
						itemName="Frozen Brocolli"
						itemExpiration="Expiration Date: 12/18/2021"
					/>
					<CategoryItem
						itemName="Ice Cream"
						itemExpiration="Expiration Date: 12/19/2021"
					/>
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
});

export default CategoryButton;