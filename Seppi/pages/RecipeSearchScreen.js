import React, { useState } from 'react';
import { SearchBar } from 'react-native-elements';
import { View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Image, FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { deviceWidth, deviceHeight } from '../utils';
import Toolbar from '../components/Toolbar';

const RecipeSearchScreen = ({ navigation }) => {
	const [searchText, setSearchText] = useState('');
	const [onAllResultsTab, setOnAllResultsTab] = useState(true);

	const SearchIcons = () => {
		return (
			<View style={{flexDirection: 'row'}}>
				<TouchableOpacity activeOpacity={0.5} onPress={() => console.log('filter')}>
					<Icon 
						name="filter-variant"
						size={28}
					/>
				</TouchableOpacity>

				<TouchableOpacity activeOpacity={0.5} onPress={() => setSearchText('')}>
					<Icon 
						name="close"
						size={28}
					/>
				</TouchableOpacity>
			</View>
		);
	};

	return (
		<KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} style={styles.container}>
			<View style={styles.topBar}>
					<SearchBar 
						containerStyle={styles.searchBar}
						placeholder="Search Recipes"
						platform="android"
						onChangeText={(searchText) => setSearchText(searchText)}
						value={searchText}
						clearIcon={SearchIcons}
					/>

				<View style={styles.resultSwapper}>
					<TouchableOpacity 
						style={
							StyleSheet.compose(
								styles.allResultsTab, onAllResultsTab ? {
										borderBottomColor: '#FA730B'
									} : {
										borderBottomColor: 'gray'
									}
							)
						}
						activeOpacity={0.5} 
						onPress={() => {
							setOnAllResultsTab(true);
							// Change style text color and border color to orange
						}}
					>
						<Text style={
							StyleSheet.compose(
								styles.resultText, onAllResultsTab ? {
									color: '#FA730B'
								} : {
									color: '#000000'
								}
							)
						}>All Results</Text>
					</TouchableOpacity>

					<TouchableOpacity 
						style={
							StyleSheet.compose(
								styles.favoritesTab, !onAllResultsTab ? {
									borderBottomColor: '#FA730B'
								} : {
									borderBottomColor: 'gray'
								}
							)
						} 
						activeOpacity={0.5} 
						onPress={() => {
							setOnAllResultsTab(false);
							// Change style text color and border color to orange
						}}
					>
						<Text style={
							StyleSheet.compose(styles.resultText, !onAllResultsTab ? {
								color: '#FA730B'
							} : {
								color: '#000000'
							})
						}>Favorites</Text>
					</TouchableOpacity>
				</View>
			</View>

			<Toolbar />

		</KeyboardAvoidingView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		alignItems: 'center',
		backgroundColor: '#FFFFFF',
	},
	topBar: {
		flexDirection: 'column',
		width: '100%',
		height: '15%',
	},
	searchBar: {
		flexDirection: 'row',
		width: '100%',
		borderTopColor: '#FFFFFF',
		borderBottomColor: '#B1B1B1',
		paddingBottom: 1,
		borderBottomWidth: 1,
		borderTopWidth: 1,
	},
	allResultsTab: {
		width: '50%', 
		borderRightColor: 'gray', 
		borderBottomColor: 'gray',
		borderRightWidth: 2,
		borderBottomWidth: 2,
	},
	favoritesTab: {
		width: '50%',
		borderBottomColor: 'gray',
		borderBottomWidth: 2,
	},
	searchIcon: {
		resizeMode: 'contain',
	},
	searchInputText: {
		fontSize: 18,
		lineHeight: 24,
		fontWeight: '600',
		padding: 10,
		marginBottom: '10%',
	},
	resultSwapper: {
		flex: 1,
		width: '100%',
		height: 200,
		justifyContent: 'space-evenly',
		flexDirection: 'row',
		backgroundColor: '#FFFFFF',
	},
	resultText: {
		textAlign: 'center',
		padding: 10,
		fontWeight: 'bold',
		fontSize: 16,
		lineHeight: 19,
		alignItems: 'center',
	},
});

export default RecipeSearchScreen;