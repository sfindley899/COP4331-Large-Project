import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { deviceWidth, deviceHeight } from '../utils';

const SearchResult = (props) => {
	const renderStarImage = () => {
		if (props.bookmarked) {
			return (
				<View style={styles.favoritedContainer}>
					<Image source={require('../images/recipe/star-icon.png')} />
				</View>
			);
		};
	};

	const renderMealInfo = () => {
		return (
			<View>
				<Text style={styles.tagText}><Text style={styles.tagLabelText}>Cuisine Type:</Text> {props.cuisineType}</Text>
				<Text style={styles.tagText}><Text style={styles.tagLabelText}>Meal Type:</Text> {props.mealType}</Text>
				<Text style={styles.tagText}><Text style={styles.tagLabelText}>Dish Type:</Text> {props.dishType}</Text>
			</View>
		);
	}

	return (
		<View style={styles.container}>
			<Image style={styles.image} source={{uri: props.image}} />

			<View style={styles.labelContainer}>
				<View style={styles.topTextContainer}>
					<Text style={styles.labelText}>{props.title}</Text>
					{renderStarImage()}
				</View>
				{renderMealInfo()}
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
	tagLabelText: {
		textAlignVertical: 'top',
		width: deviceWidth - 150,
		fontWeight: 'bold',
	},
	labelText: {
		width: 'auto',
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
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 7,
		marginLeft: 5,
	},	
	favoritedText: {
		textAlignVertical: 'top',
		lineHeight: 24,
		paddingLeft: 5,
		fontWeight: 'bold',
	},
	topTextContainer: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		width: '100%',
	},
});

export default SearchResult;