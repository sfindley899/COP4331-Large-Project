import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { deviceWidth, deviceHeight } from '../utils';

const SearchResult = (props) => {
	return (
		<View style={styles.container}>
			<Image style={styles.image} source={{uri: props.image}} />

			<View style={styles.labelContainer}>
				<Text style={styles.labelText}>{props.title}</Text>

				<View style={styles.tagContainer}>
					<Image style={styles.tagIcon} source={require('../images/recipe/tag-icon.png')} />
					<Text style={styles.tagText}>{props.tags}</Text>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		width: deviceWidth,
		borderBottomColor: '#FA730B',
		borderBottomWidth: 2,
	},
	labelContainer: {
		flexDirection: 'column',

	},
	tagContainer: {
		flexDirection: 'row',
		paddingTop: 5,
	},
	tagIcon: {
		resizeMode: 'contain',
		justifyContent: 'center',
		width: 20,
		height: 20,
		marginRight: 5,
		marginTop: 5,
	},
	tagText: {
		textAlignVertical: 'top',
		width: deviceWidth - 150,
	},
	labelText: {
		width: deviceWidth - 90,
		fontFamily: 'Roboto',
		fontSize: 22,
		lineHeight: 28,
		textAlign: 'left',
		marginTop: 10,
	},
	image: {
		width: 88,
		height: 88,
		resizeMode: 'contain',
		margin: 10,
		borderRadius: 20,
	},
});

export default SearchResult;