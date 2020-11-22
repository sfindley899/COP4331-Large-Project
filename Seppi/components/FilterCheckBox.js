import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { CheckBox } from 'react-native-elements'
import { UserContext } from '../context';

const FilterCheckBox = (props) => {
	const [state, setState] = useContext(UserContext);

	return (
		<TouchableOpacity style={styles.container} onPress={props.onPress}>
			<CheckBox style={styles.icon} checked={props.isChecked} onPress={props.onPress} />
			<Text style={styles.text}>{props.title}</Text>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'flex-start',
		paddingHorizontal: 15,
		paddingVertical: 10,
		borderBottomColor: '#929292',
		borderBottomWidth: 1,
	},
	text: {
		textAlign: 'left',
		textAlignVertical: 'center',
		fontFamily: 'Inter',
		fontWeight: 'bold',
		fontSize: 16,
		lineHeight: 24,
	},
	icon: {
		resizeMode: 'contain',
	},
	iconContainer: {
		justifyContent: 'center',
		alignItems: 'center',
	},
});

export default FilterCheckBox;