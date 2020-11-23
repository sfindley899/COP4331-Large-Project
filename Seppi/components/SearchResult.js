import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { deviceWidth, deviceHeight } from '../utils';

const SearchResult = (props) => {
	const renderStarImage = () => {
		if (props.bookmarked) {
			return (
				<View style={styles.favoritedContainer}>
					<Image source={require('../images/recipe/star-icon.png')} />
					<Text style={styles.favoritedText}>Favorited</Text>
				</View>
			);
		};
	};

	return (
		<View style={styles.container}>
			<Image style={styles.image} source={{uri: props.image}} />

			<View style={styles.labelContainer}>
				<Text style={styles.labelText}>{props.title}</Text>
				{renderStarImage()}

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
		flex: 1,
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
		width: deviceWidth - 100,
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
	favoritedContainer: {
		flexDirection: 'row',
	},	
	favoritedText: {
		textAlignVertical: 'top',
		lineHeight: 24,
		paddingLeft: 5,
	}
});

export default SearchResult;