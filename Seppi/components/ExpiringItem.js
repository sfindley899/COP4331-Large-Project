import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { AuthContext } from '../context';
import { deviceWidth } from '../utils';

const ExpiringItem = (props) => {
	const getExpiredText = () => {
		let days = Number(props.itemExpiration);
		if (days === 0) {
			return 'Expired Today';
		}
		else if (days < 0) {
			if (days === -1)
				return 'Expired ' + (-1 * days) + ' day ago';
			else
				return 'Expired ' + (-1 * days) + ' days ago'; 
		}
		else {
			if (days === 1)
				return 'Expires in ' + days + ' day';
			else
				return 'Expires in ' + days + ' days';
		}
	}

	return (
		<View style={styles.container}>
			<View style={styles.labelContainer}>
				<View style={styles.topLabelContainer}>
					<Text style={styles.itemName}>{props.itemName}</Text>
					<Text style={styles.itemCategory}>{props.category}</Text>
				</View>
				<Text style={styles.itemExpiration}>{getExpiredText()}</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		width: deviceWidth,
		height: 'auto',
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	labelContainer: {
		flexDirection: 'column',
		marginLeft: 10,
	},
	itemName: {
		fontFamily: 'Inter',
		fontWeight: 'bold',
		fontSize: 16,
		lineHeight: 24,
		width: deviceWidth * 0.75,
		textAlign: 'left',
		textAlignVertical: 'center',
	},
	itemExpiration: {
		fontFamily: 'Inter',
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
	topLabelContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignContent: 'space-between',
		width: deviceWidth,
	},
	itemCategory: {
		fontFamily: 'Inter',
		fontWeight: 'bold',
		fontSize: 12,
		lineHeight: 24,
		textAlign: 'center',
		textAlignVertical: 'center',
		color: '#B1B1B1',
		paddingRight: 25,
		paddingTop: 5,
	},
});

export default ExpiringItem;