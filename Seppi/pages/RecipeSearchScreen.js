import React, { useState, useContext } from 'react';
import { SearchBar } from 'react-native-elements';

import { 
	View,
	Text, 
	StyleSheet, 
	TouchableOpacity, 
	KeyboardAvoidingView, 
	FlatList, 
	SafeAreaView, 
	TouchableHighlight,
	Image,
	ScrollView,
	Button
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Modal from 'react-native-modal';

import { buildPath, deviceWidth, deviceHeight } from '../utils';
import { UserContext } from '../context';
import Toolbar from '../components/Toolbar';
import SearchResult from '../components/SearchResult';
import FilterButton from '../components/FilterButton';
import FilterCheckBox from '../components/FilterCheckBox';

const RecipeSearchScreen = ({ navigation }) => {
	const [searchText, setSearchText] = useState('');
	const [onAllResultsTab, setOnAllResultsTab] = useState(true);
	const [searchData, setSearchData] = useState([]);
	const [filterVisible, setFilterVisible] = useState(false);
	const [recipeVisible, setRecipeVisible] = useState(false);
	const [currentItem, setCurrentItem] = useState({recipe : {}});

	const [state, setState] = useContext(UserContext);

	const searchRecipe = async () => {
		const query = searchText;
		const response = await fetch(buildPath('searchRecipe'), {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				search: searchText,
			})
		})
		.catch((error) => console.error(error));

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
		if (state.filterStack.length === 0)
		{
			setFilterVisible(!filterVisible);
			return;
		}
		
		// Pop the current overlay off the stack.
		state.filterStack.pop();
		setState(state => ({ ...state, filterStack: state.filterStack}));
	};

	const renderFilterScrollView = () => {
		let lastIndex = state.filterStack.length - 1;
		if (state.filterStack.length === 0)
		{
			return (
				<ScrollView>
					<FilterButton title="Meal & Course" />
					<FilterButton title="Dish Type" />
					<FilterButton title="Health & Diet" />
					<FilterButton title="Cuisine" />
				</ScrollView>
			);
		}
		else if (state.filterStack[lastIndex] === "Meal & Course")
		{
			return (
				<ScrollView>
					<FilterCheckBox title="Lunch" />
					<FilterCheckBox title="Dinner" />
					<FilterCheckBox title="Breakfast" />
					<FilterCheckBox title="Snack" />
				</ScrollView>
			);
		}
		else if (state.filterStack[lastIndex] === "Dish Type")
		{
			return (
				<ScrollView>
					<FilterCheckBox title="Alcohol-cocktail" />
					<FilterCheckBox title="Biscuits and cookies" />
					<FilterCheckBox title="Bread" />
					<FilterCheckBox title="Cereals" />
					<FilterCheckBox title="Condiments and sauces" />
				</ScrollView>
			);
		}
		else if (state.filterStack[lastIndex] === "Health & Diet")
		{
			return (
				<ScrollView>
					<FilterButton title="Diet" />
					<FilterButton title="Health" />
				</ScrollView>
			);
		}
		else if (state.filterStack[lastIndex] === "Health")
		{
			return (
				<ScrollView>
					<FilterCheckBox title="Alcohol-free" />
					<FilterCheckBox title="Immune-Supportive" />
					<FilterCheckBox title="Celery-free" />
					<FilterCheckBox title="Crustacean-free" />
					<FilterCheckBox title="Dairy" />
				</ScrollView>
			);
		}
		else if (state.filterStack[lastIndex] === "Diet")
		{
			return (
				<ScrollView>
					<FilterCheckBox title="Balanced" />
					<FilterCheckBox title="High-Fiber" />
					<FilterCheckBox title="High-Protein" />
					<FilterCheckBox title="Low-Carb" />
					<FilterCheckBox title="Low-Fat" />
				</ScrollView>
			);
		}
		else if (state.filterStack[lastIndex] === "Cuisine")
		{
			return (
				<ScrollView>
					<FilterCheckBox title="American" />
					<FilterCheckBox title="Asian" />
					<FilterCheckBox title="British" />
					<FilterCheckBox title="Caribbean" />
					<FilterCheckBox title="Central Europe" />
				</ScrollView>
			);
		}
		else
		{
			return (
				<Text>Test</Text>
			);
		}
	};

	const FilterOverlay = () => {
		return (
			<View>
				<Modal isVisible={filterVisible}>
					<View style={styles.filterContainer}>
						<View style={styles.filterTopBar}>
							<TouchableOpacity activeOpacity={0.5} style={styles.filterCancelContainer} onPress={toggleFilterVisible}>
								<Text style={styles.filterCancelText}>BACK</Text>
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

						{renderFilterScrollView()}
					</View>
				</Modal>
			</View>
		);
	};

	const RecipeOverlay = () => {
		return (
			<View>
				<Modal style={styles.recipeOverlayContainer} isVisible={recipeVisible}>
					<ScrollView>
						<View style={styles.recipeLabelImageContainer}>
							<Image style={styles.recipeOverlayImage} source={{uri: currentItem.recipe.image}} />
							<Text style={styles.recipeOverlayLabel}>{currentItem.recipe.label}</Text>
							
						</View>

						<View style={styles.recipeIngredientsContainer}>
							<Text style={styles.ingredientLine}>Ingredients:</Text>
							
							{(currentItem.recipe.ingredientLines !== undefined) ? 
							currentItem.recipe.ingredientLines.map((item, index) => <Text key={index} style={styles.ingredientLine}>{index + 1}. {item}</Text>) :
							<View></View> }
						</View>
					</ScrollView>
					
					<View style={styles.recipeOverlayBottomButtons}>
						<TouchableOpacity activeOpacity={0.5} style={styles.filterCancelContainer} onPress={() => setRecipeVisible(!recipeVisible)}>
								<Text style={styles.filterCancelText}>BACK</Text>
						</TouchableOpacity>

						<TouchableOpacity activeOpacity={0.5} style={styles.filterApplyContainer} onPress={() => console.log('test')}>
							<Text style={styles.filterApplyText}>Favorite</Text>
						</TouchableOpacity>
					</View>
				</Modal>
			</View>
		);
	};

	const renderSearchResult = ({ item, index }) => (
		<TouchableHighlight
			activeOpacity={0.6}
			underlayColor="#f9c35e"
			onPress={() => {setCurrentItem(item); setRecipeVisible(!recipeVisible);}}
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
				{onAllResultsTab ? (
					<FlatList 
						style={{width: '100%', marginBottom: 200}}
						data={searchData}
						renderItem={renderSearchResult}
						keyExtractor={(item) => item.recipe.uri}
					/> 
				) : (
					<Text>Favorites Tab</Text>
				)}
			</SafeAreaView>

			<FilterOverlay />

			<RecipeOverlay />
			
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
	recipeOverlayContainer: {
		flex: 1, 
		flexDirection: 'column',
		backgroundColor: '#FFFFFF',
	},
	recipeOverlayImage: {
		width: 300,
		height: 300,
		resizeMode: 'contain',
		marginVertical: 10,
		borderRadius: 10,
	},
	recipeOverlayLabel: {
		fontSize: 24,
		textAlign: 'center',
		lineHeight: 24,
		paddingBottom: 15,
	},
	recipeIngredientsContainer: {
		backgroundColor: '#eaede8',
		borderWidth: 2,
		borderColor: 'gray',
		marginBottom: 15,
	},
	recipeLabelImageContainer: {
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
	},	
	ingredientLine: {
		fontSize: 16,
		padding: 10,
		width: '90%',
	},
	recipeOverlayBottomButtons: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		backgroundColor: '#F3F3F3',
		borderTopColor: 'gray',
		borderTopWidth: 2,
	},
});

export default RecipeSearchScreen;