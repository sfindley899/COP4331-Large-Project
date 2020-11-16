import React, { useState } from 'react';
import { SearchBar } from 'react-native-elements';
import { View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, FlatList, SafeAreaView, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Modal from 'react-native-modal';

import { deviceWidth, deviceHeight } from '../utils';
import Toolbar from '../components/Toolbar';
import SearchResult from '../components/SearchResult';

const RecipeSearchScreen = ({ navigation }) => {
	const [searchText, setSearchText] = useState('');
	const [onAllResultsTab, setOnAllResultsTab] = useState(true);
	const [searchData, setSearchData] = useState([]);
	const [filterVisible, setFilterVisible] = useState(false);

	const searchRecipe = async () => {
		const query = '';
		const response = await fetch(query);

		let json = JSON.parse(await response.text());

		console.log(json.q);
		setSearchData(json.hits);
	};

	function getTags(item) {
		let tags = '';
		let healthLabelsLen = item.recipe.healthLabels.length;
		let dietLabelsLen = item.recipe.dietLabels.length;

		for (let i = 0; i < healthLabelsLen; ++i)
		{
			tags += item.recipe.healthLabels[i];

			if (i + 1 === healthLabelsLen && dietLabelsLen === 0)
				break;
			
			tags += ', ';
		}

		for (let i = 0; i < dietLabelsLen; ++i)
			tags += item.recipe.dietLabels[i] + (i + 1 === item.recipe.dietLabels.size ? ', ' : '');

		return tags;
	};

	const toggleFilterVisible = () => {
		setFilterVisible(!filterVisible);
	};

	const FilterOverlay = () => {
		return (
			<View>
				<Modal isVisible={filterVisible}>
					<View style={styles.filterContainer}>
						<View style={styles.filterTopBar}>
							<TouchableOpacity activeOpacity={0.5} style={styles.filterCancelContainer} onPress={toggleFilterVisible}>
								<Text style={styles.filterCancelText}>CANCEL</Text>
							</TouchableOpacity>

							<View style={styles.applyResetContainer}>
								<TouchableOpacity activeOpacity={0.5} style={styles.filterCancelContainer} onPress={() => console.log('Reset')}>
									<Text style={styles.filterCancelText}>RESET</Text>
								</TouchableOpacity>

								<TouchableOpacity activeOpacity={0.5} style={styles.filterApplyContainer} onPress={() => console.log('test')}>
									<Text style={styles.filterApplyText}>Apply</Text>
								</TouchableOpacity>
							</View>

						</View>


					</View>
				</Modal>
			</View>
		);
	};

	const renderSearchResult = ({ item, index }) => (
		<TouchableHighlight
			activeOpacity={0.6}
			underlayColor="#f9c35e"
			onPress={() => alert('Pressed!')}
		>
			<SearchResult 
				tags={getTags(item)} 
				ingredients={item.recipe.ingredientLines} 
				image={item.recipe.image} 
				title={item.recipe.label} 
			/>
		</TouchableHighlight>
	);

	const SearchIcons = () => {
		return (
			<View style={{flexDirection: 'row'}}>
				<TouchableOpacity activeOpacity={0.5} onPress={searchRecipe}>
					<Icon 
						name="arrow-right"
						size={28}
					/>
				</TouchableOpacity>

				<TouchableOpacity activeOpacity={0.5} onPress={toggleFilterVisible}>
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

			<SafeAreaView>
				<FlatList 
					style={{width: '100%', marginBottom: 200}}
					data={searchData}
					renderItem={renderSearchResult}
					keyExtractor={(item) => item.recipe.uri}
				/>
			</SafeAreaView>

			<FilterOverlay />
			
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
		height: deviceHeight * 0.15,
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
		justifyContent: 'center',
		borderRightColor: 'gray', 
		borderBottomColor: 'gray',
		borderRightWidth: 2,
		borderBottomWidth: 2,
	},
	favoritesTab: {
		width: '50%',
		justifyContent: 'center',
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
	filterContainer: {
		flex: 1, 
		flexDirection: 'column',
		backgroundColor: '#FFFFFF',
	},
	filterTopBar: {
		backgroundColor: '#F3F3F3',
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'space-between',
		borderBottomColor: 'gray',
		borderBottomWidth: 2,
	},
	filterApplyContainer: {
		backgroundColor: '#FA730B',
		elevation: 8,
		borderRadius: 24,
		width: 95,
		height: 40,
		marginVertical: 10,
		padding: 12,
		marginRight: 10,
		justifyContent: 'center',
	},
	filterApplyText: {
		color: '#FFFFFF',
		textAlign: 'center',
		fontFamily: 'Inter',
		fontWeight: 'bold',
		fontSize: 16,
		lineHeight: 24,
	},
	filterCancelContainer: {
		justifyContent: 'center',
		padding: 12,
	},
	filterCancelText: {
		color: '#646464',
		fontFamily: 'Inter',
		fontWeight: 'bold',
		fontSize: 16,
		lineHeight: 24,
		textAlign: 'center',
	},
	applyResetContainer: {
		flexDirection: 'row',
	},
});

export default RecipeSearchScreen;