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
	const [filterText, setFilterText] = useState('');
	const [onAllResultsTab, setOnAllResultsTab] = useState(true);
	const [searchData, setSearchData] = useState([]);
	const [favoritesData, setFavoritesData] = useState([]);
	const [filterVisible, setFilterVisible] = useState(false);
	const [recipeVisible, setRecipeVisible] = useState(false);
	const [currentItem, setCurrentItem] = useState({recipe : {}});

	// Meal filters
	const defaultMealFilters = {
		lunch: false,
		dinner: false,
		breakfast: false,
		snack: false,
		teaTime: false,
	};
	const [mealTypeFilters, setMealTypeFilters] = useState(defaultMealFilters);

	// Dish filters
	const defaultDishFilters = {
		alcoholCocktail: false,
        biscuitsAndCookies: false,
        bread: false,
        cereals: false,
	};
	const [dishTypeFilters, setDishTypeFilters] = useState(defaultDishFilters);

	// Diet filters
	const defaultDietFilters = {
		balanced: false,
        highFiber: false,
        highProtein: false,
        lowCarb: false,
        lowFat: false,
	};
	const [dietFilters, setDietFilters] = useState(defaultDietFilters);

	// Health filters
	const defaultHealthFilters = {
		alcoholFree: false,
        immuneSupportive: false,
        celeryFree: false,
        crustaceanFree: false,
        dairy: false,
	};
	const [healthFilters, setHealthFilters] = useState(defaultHealthFilters);

	// Cuisine filters
	const defaultCuisineFilters = {
		american: false,
        asian: false,
        british: false,
        caribbean: false,
        centralEurope: false,
        chinese: false,
        easternEurope: false,
        french: false,
        indian: false,
        italian: false,
        japanese: false,
        kosher: false,
        mediterranean: false,
        mexican: false,
        middleEastern: false,
        nordic: false,
        southAmerican: false,
        southEastAsian: false,
	};
	const [cuisineTypeFilters, setCuisineTypeFilters] = useState(defaultCuisineFilters);

	const [state, setState] = useContext(UserContext);

	const searchRecipe = async () => {
		const response = await fetch(buildPath('searchRecipe'), {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				search: searchText,
				filters: filterText,
				idToken: state.idToken
			})
		})
		.catch((error) => console.error(error));

		let json = JSON.parse(await response.text());

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

	function keyToApiParameter(key) {
		// Convert key strings for diet
		if (key === 'highFiber')
			return 'high-fiber';
		if (key === 'highProtein')
			return 'high-protein';
		if (key === 'lowCarb')
			return 'low-carb';
		if (key === 'lowFat')
			return 'low-fat';
		
		// Convert key strings for health
		if (key === 'alcoholFree')
			return 'alcohol-free';
		if (key === 'immuneSupportive')
			return 'immuno-supportive';
		if (key === 'celeryFree')
			return 'celery-free';
		if (key === 'crustaceanFree')
			return 'crustacean-free';
		if (key === 'dairy')
			return 'dairy-free';
	};

	const resetFilters = () => {
		setFilterText(filterText => '');
		setMealTypeFilters(mealTypeFilters => defaultMealFilters);
		setDishTypeFilters(dishTypeFilters => defaultDishFilters);
		setHealthFilters(healthFilters => defaultHealthFilters);
		setDietFilters(dietFilters => defaultDietFilters);
		setCuisineTypeFilters(cuisineTypeFilters => defaultCuisineFilters);
	};
	
	const applyFilters = () => {
		setFilterText(filterText => '');
		let firstFoundKey = true;

		for (var key of Object.keys(mealTypeFilters)) {
			let str = '';
			if (mealTypeFilters[key]) {
				if (firstFoundKey) {
					str += 'mealType=';
					firstFoundKey = false;
				}
				if (keyToApiParameter(key) === undefined)
					str += key + '&';
				else 
					str += keyToApiParameter(key) + '&';
				setFilterText(filterText => filterText + str);
			}
		}

		firstFoundKey = true;
		for (var key of Object.keys(dishTypeFilters)) {
			let str = '';
			if (dishTypeFilters[key]) {
				if (firstFoundKey) {
					str += 'dishType=';
					firstFoundKey = false;
				}
				if (keyToApiParameter(key) === undefined)
					str += key + '&';
				else 
					str += keyToApiParameter(key) + '&';
				setFilterText(filterText => filterText + str);
			}
		}

		firstFoundKey = true;
		for (var key of Object.keys(healthFilters)) {
			let str = '';
			if (healthFilters[key]) {
				if (firstFoundKey) {
					str += 'health=';
					firstFoundKey = false;
				}
				if (keyToApiParameter(key) === undefined)
					str += key + '&';
				else 
					str += keyToApiParameter(key) + '&';
				setFilterText(filterText => filterText + str)
			}
		}

		firstFoundKey = true;
		for (var key of Object.keys(dietFilters)) {
			let str = '';
			if (dietFilters[key]) {
				if (firstFoundKey) {
					str += 'diet=';
					firstFoundKey = false;
				}
				if (keyToApiParameter(key) === undefined)
					str += key + '&';
				else 
					str += keyToApiParameter(key) + '&';
				setFilterText(filterText => filterText + str)
			}
		}

		firstFoundKey = true;
		for (var key of Object.keys(cuisineTypeFilters)) {
			let str = '';
			if (cuisineTypeFilters[key]) {
				if (firstFoundKey) {
					str += 'cuisineType=';
					firstFoundKey = false;
				}
				if (keyToApiParameter(key) === undefined)
					str += key + '&';
				else 
					str += keyToApiParameter(key) + '&';
				setFilterText(filterText => filterText + str)
			}
		}

		setFilterVisible(!filterVisible);
		setState(state => ({ ...state, filterStack: []}));
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
					<FilterCheckBox
						onPress={() => setMealTypeFilters(mealTypeFilters => ({ ...mealTypeFilters, lunch : !mealTypeFilters.lunch}))}
						isChecked={mealTypeFilters.lunch}
						title="Lunch" 
					/>
					<FilterCheckBox 
						onPress={() => setMealTypeFilters(mealTypeFilters => ({ ...mealTypeFilters, dinner : !mealTypeFilters.dinner}))}
						isChecked={mealTypeFilters.dinner}
						title="Dinner" 
					/>
					<FilterCheckBox 
						title="Breakfast"
						onPress={() => setMealTypeFilters(mealTypeFilters => ({ ...mealTypeFilters, breakfast : !mealTypeFilters.breakfast}))}
						isChecked={mealTypeFilters.breakfast}
					/>
					<FilterCheckBox 
						title="Snack" 
						onPress={() => setMealTypeFilters(mealTypeFilters => ({ ...mealTypeFilters, snack : !mealTypeFilters.snack}))}
						isChecked={mealTypeFilters.snack}
					/>
					<FilterCheckBox 
						title="Teatime" 
						onPress={() => setMealTypeFilters(mealTypeFilters => ({ ...mealTypeFilters, teaTime : !mealTypeFilters.teaTime}))}
						isChecked={mealTypeFilters.teaTime}
					/>
				</ScrollView>
			);
		}
		else if (state.filterStack[lastIndex] === "Dish Type")
		{
			return (
				<ScrollView>
					<FilterCheckBox 
						title="Alcohol-cocktail" 
						onPress={() => setDishTypeFilters(dishTypeFilters => ({ ...dishTypeFilters, alcoholCocktail : !dishTypeFilters.alcoholCocktail}))}
						isChecked={dishTypeFilters.alcoholCocktail}
					/>
					<FilterCheckBox 
						title="Biscuits and cookies" 
						onPress={() => setDishTypeFilters(dishTypeFilters => ({ ...dishTypeFilters, biscuitsAndCookies : !dishTypeFilters.biscuitsAndCookies}))}
						isChecked={dishTypeFilters.biscuitsAndCookies}
					/>
					<FilterCheckBox 
						title="Bread"
						onPress={() => setDishTypeFilters(dishTypeFilters => ({ ...dishTypeFilters, bread : !dishTypeFilters.bread}))}
						isChecked={dishTypeFilters.bread}
					/>
					<FilterCheckBox 
						title="Cereals"
						onPress={() => setDishTypeFilters(dishTypeFilters => ({ ...dishTypeFilters, cereals : !dishTypeFilters.cereals}))}
						isChecked={dishTypeFilters.cereals}
					/>
					<FilterCheckBox 
						title="Condiments and sauces" 
						onPress={() => setDishTypeFilters(dishTypeFilters => ({ ...dishTypeFilters, condimentsAndSauces : !dishTypeFilters.condimentsAndSauces}))}
						isChecked={dishTypeFilters.condimentsAndSauces}
					/>
					<FilterCheckBox 
						title="Drinks" 
						onPress={() => setDishTypeFilters(dishTypeFilters => ({ ...dishTypeFilters, drinks : !dishTypeFilters.drinks}))}
						isChecked={dishTypeFilters.drinks}
					/>
					<FilterCheckBox 
						title="Desserts" 
						onPress={() => setDishTypeFilters(dishTypeFilters => ({ ...dishTypeFilters, desserts : !dishTypeFilters.desserts}))}
						isChecked={dishTypeFilters.desserts}
					/>
					<FilterCheckBox 
						title="Egg" 
						onPress={() => setDishTypeFilters(dishTypeFilters => ({ ...dishTypeFilters, egg : !dishTypeFilters.egg}))}
						isChecked={dishTypeFilters.egg}
					/>
					<FilterCheckBox 
						title="Main course" 
						onPress={() => setDishTypeFilters(dishTypeFilters => ({ ...dishTypeFilters, mainCourse : !dishTypeFilters.mainCourse}))}
						isChecked={dishTypeFilters.mainCourse}
					/>
					<FilterCheckBox 
						title="Omelet" 
						onPress={() => setDishTypeFilters(dishTypeFilters => ({ ...dishTypeFilters, omelet : !dishTypeFilters.omelet}))}
						isChecked={dishTypeFilters.omelet}
					/>
					<FilterCheckBox 
						title="Pancake" 
						onPress={() => setDishTypeFilters(dishTypeFilters => ({ ...dishTypeFilters, pancake : !dishTypeFilters.pancake}))}
						isChecked={dishTypeFilters.pancake}
					/>
					<FilterCheckBox 
						title="Preps" 
						onPress={() => setDishTypeFilters(dishTypeFilters => ({ ...dishTypeFilters, egg : !dishTypeFilters.egg}))}
						isChecked={dishTypeFilters.egg}
					/>
					<FilterCheckBox 
						title="Preserve"
						onPress={() => setDishTypeFilters(dishTypeFilters => ({ ...dishTypeFilters, preserve : !dishTypeFilters.preserve}))}
						isChecked={dishTypeFilters.preserve}
					/>
					<FilterCheckBox 
						title="Salad" 
						onPress={() => setDishTypeFilters(dishTypeFilters => ({ ...dishTypeFilters, salad : !dishTypeFilters.salad}))}
						isChecked={dishTypeFilters.salad}
					/>
					<FilterCheckBox 
						title="Sandwiches" 
						onPress={() => setDishTypeFilters(dishTypeFilters => ({ ...dishTypeFilters, sandwiches : !dishTypeFilters.sandwiches}))}
						isChecked={dishTypeFilters.sandwiches}
					/>
					<FilterCheckBox 
						title="Soup" 
						onPress={() => setDishTypeFilters(dishTypeFilters => ({ ...dishTypeFilters, soup : !dishTypeFilters.soup}))}
						isChecked={dishTypeFilters.soup}
					/>
					<FilterCheckBox 
						title="Starter" 
						onPress={() => setDishTypeFilters(dishTypeFilters => ({ ...dishTypeFilters, starter : !dishTypeFilters.starter}))}
						isChecked={dishTypeFilters.starter}
					/>
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
					<FilterCheckBox 
						title="Alcohol-free" 
						onPress={() => setHealthFilters(healthFilters => ({ ...healthFilters, alcoholFree : !healthFilters.alcoholFree}))}
						isChecked={healthFilters.alcoholFree}
					/>
					<FilterCheckBox 
						title="Immune-Supportive" 
						onPress={() => setHealthFilters(healthFilters => ({ ...healthFilters, immuneSupportive : !healthFilters.immuneSupportive}))}
						isChecked={healthFilters.immuneSupportive}
					/>
					<FilterCheckBox 
						title="Celery-free" 
						onPress={() => setHealthFilters(healthFilters => ({ ...healthFilters, celeryFree : !healthFilters.celeryFree}))}
						isChecked={healthFilters.celeryFree}
					/>
					<FilterCheckBox 
						title="Crustacean-free" 
						onPress={() => setHealthFilters(healthFilters => ({ ...healthFilters, crustaceanFree : !healthFilters.crustaceanFree}))}
						isChecked={healthFilters.crustaceanFree}
					/>
					<FilterCheckBox 
						title="Dairy" 
						onPress={() => setHealthFilters(healthFilters => ({ ...healthFilters, dairy : !healthFilters.dairy}))}
						isChecked={healthFilters.dairy}
					/>
				</ScrollView>
			);
		}
		else if (state.filterStack[lastIndex] === "Diet")
		{
			return (
				<ScrollView>
					<FilterCheckBox
						onPress={() => setDietFilters(dietFilters => ({ ...dietFilters, balanced : !dietFilters.balanced}))}
						isChecked={dietFilters.balanced}
						title="Balanced" 
					/>
					<FilterCheckBox 
						title="High-Fiber" 
						onPress={() => setDietFilters(dietFilters => ({ ...dietFilters, highFiber : !dietFilters.highFiber}))}
						isChecked={dietFilters.highFiber}
					/>
					<FilterCheckBox 
						title="High-Protein"
						onPress={() => setDietFilters(dietFilters => ({ ...dietFilters, highProtein : !dietFilters.highProtein}))}
						isChecked={dietFilters.highProtein}
					 />
					<FilterCheckBox 
						title="Low-Carb" 
						onPress={() => setDietFilters(dietFilters => ({ ...dietFilters, lowCarb : !dietFilters.lowCarb}))}
						isChecked={dietFilters.lowCarb}
					/>
					<FilterCheckBox 
						title="Low-Fat"
						onPress={() => setDietFilters(dietFilters => ({ ...dietFilters, lowFat : !dietFilters.lowFat}))}
						isChecked={dietFilters.lowFat}
					/>
				</ScrollView>
			);
		}
		else if (state.filterStack[lastIndex] === "Cuisine")
		{
			return (
				<ScrollView>
					<FilterCheckBox 
						title="American" 
						onPress={() => setCuisineTypeFilters(cuisineTypeFilters => ({ ...cuisineTypeFilters, american : !cuisineTypeFilters.american}))}
						isChecked={cuisineTypeFilters.american}
					/>
					<FilterCheckBox 
						title="Asian" 
						onPress={() => setCuisineTypeFilters(cuisineTypeFilters => ({ ...cuisineTypeFilters, asian : !cuisineTypeFilters.asian}))}
						isChecked={cuisineTypeFilters.asian}
					/>
					<FilterCheckBox 
						title="British" 
						onPress={() => setCuisineTypeFilters(cuisineTypeFilters => ({ ...cuisineTypeFilters, british : !cuisineTypeFilters.british}))}
						isChecked={cuisineTypeFilters.british}
					/>
					<FilterCheckBox 
						title="Caribbean" 
						onPress={() => setCuisineTypeFilters(cuisineTypeFilters => ({ ...cuisineTypeFilters, caribbean : !cuisineTypeFilters.caribbean}))}
						isChecked={cuisineTypeFilters.caribbean}
					/>
					<FilterCheckBox 
						title="Central Europe"
						onPress={() => setCuisineTypeFilters(cuisineTypeFilters => ({ ...cuisineTypeFilters, centralEurope : !cuisineTypeFilters.centralEurope}))}
						isChecked={cuisineTypeFilters.centralEurope}
					/>
					<FilterCheckBox 
						title="Chinese" 
						onPress={() => setCuisineTypeFilters(cuisineTypeFilters => ({ ...cuisineTypeFilters, chinese : !cuisineTypeFilters.chinese}))}
						isChecked={cuisineTypeFilters.chinese}
					/>
					<FilterCheckBox 
						title="Eastern Europe" 
						onPress={() => setCuisineTypeFilters(cuisineTypeFilters => ({ ...cuisineTypeFilters, easternEurope : !cuisineTypeFilters.easternEurope}))}
						isChecked={cuisineTypeFilters.easternEurope}
					/>
					<FilterCheckBox 
						title="French" 
						onPress={() => setCuisineTypeFilters(cuisineTypeFilters => ({ ...cuisineTypeFilters, french : !cuisineTypeFilters.french}))}
						isChecked={cuisineTypeFilters.french}
					/>
					<FilterCheckBox 
						title="Indian" 
						onPress={() => setCuisineTypeFilters(cuisineTypeFilters => ({ ...cuisineTypeFilters, indian : !cuisineTypeFilters.indian}))}
						isChecked={cuisineTypeFilters.indian}
					/>
					<FilterCheckBox 
						title="Italian" 
						onPress={() => setCuisineTypeFilters(cuisineTypeFilters => ({ ...cuisineTypeFilters, italian : !cuisineTypeFilters.italian}))}
						isChecked={cuisineTypeFilters.italian}
					/>
					<FilterCheckBox 
						title="Japanese" 
						onPress={() => setCuisineTypeFilters(cuisineTypeFilters => ({ ...cuisineTypeFilters, japanese : !cuisineTypeFilters.japanese}))}
						isChecked={cuisineTypeFilters.japanese}
					/>
					<FilterCheckBox 
						title="Kosher" 
						onPress={() => setCuisineTypeFilters(cuisineTypeFilters => ({ ...cuisineTypeFilters, kosher : !cuisineTypeFilters.kosher}))}
						isChecked={cuisineTypeFilters.kosher}
					/>
					<FilterCheckBox 
						title="Mediterranean" 
						onPress={() => setCuisineTypeFilters(cuisineTypeFilters => ({ ...cuisineTypeFilters, mediterranean : !cuisineTypeFilters.mediterranean}))}
						isChecked={cuisineTypeFilters.mediterranean}
					/>
					<FilterCheckBox 
						title="Mexican" 
						onPress={() => setCuisineTypeFilters(cuisineTypeFilters => ({ ...cuisineTypeFilters, mexican : !cuisineTypeFilters.mexican}))}
						isChecked={cuisineTypeFilters.mexican}
					/>
					<FilterCheckBox 
						title="Middle Eastern" 
						onPress={() => setCuisineTypeFilters(cuisineTypeFilters => ({ ...cuisineTypeFilters, middleEastern : !cuisineTypeFilters.middleEastern}))}
						isChecked={cuisineTypeFilters.middleEastern}
					/>
					<FilterCheckBox 
						title="Nordic" 
						onPress={() => setCuisineTypeFilters(cuisineTypeFilters => ({ ...cuisineTypeFilters, nordic : !cuisineTypeFilters.nordic}))}
						isChecked={cuisineTypeFilters.nordic}
					/>
					<FilterCheckBox 
						title="South American" 
						onPress={() => setCuisineTypeFilters(cuisineTypeFilters => ({ ...cuisineTypeFilters, southAmerican : !cuisineTypeFilters.southAmerican}))}
						isChecked={cuisineTypeFilters.southAmerican}
					/>
					<FilterCheckBox 
						title="South East Asian" 
						onPress={() => setCuisineTypeFilters(cuisineTypeFilters => ({ ...cuisineTypeFilters, southEastAsian : !cuisineTypeFilters.southEastAsian}))}
						isChecked={cuisineTypeFilters.southEastAsian}
					/>
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

	const getFavorites = async () => {
		const response = await fetch(buildPath('getFavorites'), {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				idToken: state.idToken
			})
		})
		.catch((error) => console.error(error));

		let status = await response.status;

		if (status === 200)
		{
			let json = JSON.parse(await response.text());
			setFavoritesData(json.favorites);
			return;
		}
		else
		{
			console.log('could not fetch favorites');
			return;
		}
	};

	const addFavorite = async () => {
		currentItem.bookmarked = true;
		for (let i = 0; i < searchData.length; ++i) {
			if (searchData[i].recipe.uri === currentItem.recipe.uri) {
				searchData[i].bookmarked = true;
				setSearchData(state => searchData);
				break;
			}
		}

		currentItem['idToken'] = state.idToken;

		const response = await fetch(buildPath('addFavorite'), {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(currentItem)
		}).catch((error) => console.error(error));

		let status = await response.status;

		if (status === 200)
		{
			console.log('added favorite');
			return;
		}
		else
		{
			console.log('failed to add favorite');
			return;
		}
	};

	const removeFavorite = async () => {
		// Update search data state.
		currentItem.bookmarked = false;
		for (let i = 0; i < searchData.length; ++i) {
			if (searchData[i].recipe.uri === currentItem.recipe.uri) {
				searchData[i].bookmarked = false;
				setSearchData(state => searchData);
				break;
			}
		}

		const response = await fetch(buildPath('removeFavorite'), {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				uri: currentItem.recipe.uri,
				idToken: state.idToken
			})
		}).catch((error) => console.error(error));

		let status = await response.status;

		if (status === 200)
		{
			let json = JSON.parse(await response.text());
			setFavoritesData(json.favorites);
			setRecipeVisible(!recipeVisible);
			return;
		}
		else
		{
			console.log('failed to remove favorite');
			return;
		}
	};

	const RecipeOverlay = () => {
		return (
				<Modal backdropTransitionOutTiming={0} style={styles.recipeOverlayContainer} isVisible={recipeVisible}>
					<ScrollView>
						<View style={styles.recipeLabelImageContainer}>
							<Image style={styles.recipeOverlayImage} source={{uri: currentItem.recipe.image}} />
							<Text style={styles.recipeOverlayLabel}>{currentItem.recipe.label}</Text>
							
						</View>

						<View style={styles.recipeIngredientsContainer}>
							<Text style={styles.ingredientLine}>Ingredients:</Text>
							
							{(currentItem.recipe.ingredientLines !== undefined) ? 
							currentItem.recipe.ingredientLines.map((item, index) => <Text key={index} style={styles.ingredientLine}>{'\u2B24'}{item}</Text>) :
							<View></View> }
						</View>
					</ScrollView>
					
					<View style={styles.recipeOverlayBottomButtons}>
						<TouchableOpacity activeOpacity={0.5} style={styles.filterCancelContainer} onPress={() => setRecipeVisible(!recipeVisible)}>
								<Text style={styles.filterCancelText}>BACK</Text>
						</TouchableOpacity>

						<TouchableOpacity 
							activeOpacity={0.5} 
							style={styles.filterApplyContainer} 
							onPress={() => {
								currentItem.bookmarked ? 
								removeFavorite() : addFavorite();
								setRecipeVisible(!recipeVisible);
							}}
						>
							{currentItem.bookmarked ? (
								<Text style={styles.filterApplyText}>Unfavorite</Text>
							 ) : (
								 <Text style={styles.filterApplyText}>Favorite</Text>
							 )}
						</TouchableOpacity>
					</View>
				</Modal>
		);
	};

	const renderSearchResult = ({ item, index }) => {
		return (
			<TouchableHighlight
				activeOpacity={0.6}
				underlayColor="#f9c35e"
				onPress={() => {setCurrentItem(item); setRecipeVisible(!recipeVisible);}}
			>
				<SearchResult 
					bookmarked={item.bookmarked}
					tags={getTags(item)} 
					ingredients={item.recipe.ingredientLines} 
					image={item.recipe.image} 
					title={item.recipe.label} 
				/>
			</TouchableHighlight>
		);
	};

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
			<Modal backdropTransitionOutTiming={0} animationIn='pulse' isVisible={filterVisible}>
					<View style={styles.filterContainer}>
						<View style={styles.filterTopBar}>
							<TouchableOpacity activeOpacity={0.5} style={styles.filterCancelContainer} onPress={toggleFilterVisible}>
								<Text style={styles.filterCancelText}>BACK</Text>
							</TouchableOpacity>

							<View style={styles.applyResetContainer}>
								<TouchableOpacity activeOpacity={0.5} style={styles.filterCancelContainer} onPress={resetFilters}>
									<Text style={styles.filterCancelText}>RESET</Text>
								</TouchableOpacity>

								<TouchableOpacity activeOpacity={0.5} style={styles.filterApplyContainer} onPress={applyFilters}>
									<Text style={styles.filterApplyText}>Apply</Text>
								</TouchableOpacity>
							</View>
						</View>

						{renderFilterScrollView()}
					</View>
				</Modal>
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
							getFavorites();
							setOnAllResultsTab(false);
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
					<FlatList 
						style={{width: '100%', marginBottom: 200}}
						data={favoritesData}
						renderItem={renderSearchResult}
						keyExtractor={(item) => item.recipe.uri}
					/>
				)}
			</SafeAreaView>

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
		width: 110,
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