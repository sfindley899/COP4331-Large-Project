import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';

const ProfileButton = (props) => {

	return (
		<TouchableOpacity style={styles.container} activeOpacity={0.5} onPress={props.onPress}>
			<Image style={StyleSheet.compose(styles.icon, props.iconStyles)} source={props.icon} />

			<View style={StyleSheet.compose(styles.labelContainer, props.labelContainerStyles)}>
				<Text style={styles.topLabel}>{props.topLabel}</Text>
				<Text style={styles.bottomLabel}>{props.bottomLabel}</Text>
			</View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		width: '100%',
		height: 68,
		backgroundColor: '#ECECEC',
		paddingTop: 15,
	},
	icon: {
		resizeMode: 'contain',
		marginHorizontal: 10,
		width: 60,
		height: 40,
	},
	labelContainer: {
		width: '100%',
		flexDirection: 'column',
		borderBottomColor: 'gray',
		borderBottomWidth: 2,
	},
	topLabel: {
		textAlign: 'left',
		fontWeight: 'bold',
		fontFamily: 'Inter',
		width: '100%',
		fontSize: 17,
		lineHeight: 20,
	},
	bottomLabel: {
		width: '78%',
		textAlign: 'left',
		fontFamily: 'Inter',
		fontSize: 12,
		lineHeight: 20,
		color: '#9e969d',
	},
});

export default ProfileButton;