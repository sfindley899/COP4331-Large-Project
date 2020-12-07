import React, { useContext } from 'react';
import { View, TouchableOpacity, StyleSheet, Image } from 'react-native';

import { deviceWidth, deviceHeight, buildPath } from '../utils';
import { UserContext } from '../context';
import { useNavigation, useRoute } from '@react-navigation/native';

const Toolbar = () => {
	const [state, setState] = useContext(UserContext);
	const navigation = useNavigation();
	const route = useRoute();

	const fetchIngredients = async () => {
		const response = await fetch(buildPath('getCategories'), {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
            body: JSON.stringify({
                idToken: state.idToken
            })
		}).catch(error => console.error(error));

		let status = await response.status;

		if (status !== 200) {
			console.log('Could not fetch ingredients for categories.');
			return;
		}

		let json = JSON.parse(await response.text());
		let categoriesJson = json.categories;
		setState(state => ({ ...state, categories : categoriesJson}));
	};

	const fetchExpiring = async () => {
		const response = await fetch(buildPath('getExpiringIngredients'), {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
            body: JSON.stringify({
                idToken: state.idToken
            })
		}).catch(error => console.error(error));

		let status = await response.status;
		
		if (status !== 200) {
			console.log('Could not fetch expiring ingredients.');
			return;
		}

		let json = JSON.parse(await response.text());
		setState(state => ({ ...state, expiring: json.expiring}));
	};

	const fetchGroceries = async () => {
		const response = await fetch(buildPath('getGrocery'), {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
            body: JSON.stringify({
                idToken: state.idToken
            })
		}).catch(error => console.error(error));

		let status = await response.status;
		
		if (status !== 200) {
			console.log('Could not fetch groceries.');
			return;
		}

		let json = JSON.parse(await response.text());
		setState(state => ({ ...state, list: json}));
	};

	return (
		<View style={styles.bottomBar}>
				<TouchableOpacity 
					style={StyleSheet.compose(styles.recipeIconContainer, (route.name === 'Recipe Search') ? {
							backgroundColor: '#FFFFFF'
						} : {
							backgroundColor: '#ECECEC'
						}
					)} 
					activeOpacity={0.5} 
					onPress={() => {
						setState(state => ({ ...state, currentTab: 'recipes' }));
						navigation.navigate('Recipe Search');
					}}
				>
					<Image style={styles.toolbarImage} source={require('../images/toolbar/recipe-icon.png')} />
				</TouchableOpacity>

				<TouchableOpacity 
					style={StyleSheet.compose(styles.pantryIconContainer, (route.name === 'Pantry') ? {
							backgroundColor: '#FFFFFF'
						} : {
							backgroundColor: '#ECECEC'
						}
					)}
					activeOpacity={0.5} 
					onPress={() => {
						setState(state => ({ ...state, currentTab: 'pantry' }));
						fetchIngredients();
						fetchExpiring();
						navigation.navigate('Pantry');
					}}
				>
					<Image style={styles.toolbarImage} source={require('../images/toolbar/pantry-icon.png')} />
				</TouchableOpacity>

				<TouchableOpacity 
					style={StyleSheet.compose(styles.listsIconContainer, (route.name === 'Grocery List') ? {
							backgroundColor: '#FFFFFF'
						} : {
							backgroundColor: '#ECECEC'
						}
					)}
					activeOpacity={0.5} 
					onPress={() => {
						setState(state => ({ ...state, currentTab: 'lists' }));
						fetchGroceries();
						navigation.navigate('Grocery List');
					}}
				>
					<Image style={styles.toolbarImage} source={require('../images/toolbar/lists-icon.png')} />
				</TouchableOpacity>

				<TouchableOpacity 
					style={StyleSheet.compose(styles.profileIconContainer, (route.name === 'Profile') ? {
							backgroundColor: '#FFFFFF'
						} : {
							backgroundColor: '#ECECEC'
						}
					)} 
					activeOpacity={0.5} 
					onPress={() => {
						setState(state => ({ ...state, currentTab: 'profile' }));
						navigation.navigate('Profile');
					}}
				>
					<Image style={styles.toolbarImage} source={require('../images/toolbar/profile-icon.png')} />
				</TouchableOpacity>
			</View>
	);
};

const styles = StyleSheet.create({
	bottomBar: {
		flexDirection: 'row',
		justifyContent: 'space-evenly',
		width: '100%',
		height: 80,
		backgroundColor: '#ECECEC',
		marginTop: 'auto',
		borderTopColor: 'gray',
		borderTopWidth: 2,
	},
	toolbarImage: {
		resizeMode: 'contain',
	},
	recipeIconContainer: {
		backgroundColor: '#FFFFFF',
		width: deviceWidth * 0.25,
		height: 80,
		alignItems: 'center',
		justifyContent: 'center',
	},
	pantryIconContainer: {
		width: deviceWidth * 0.25,
		height: 80,
		alignItems: 'center',
		justifyContent: 'center',
	},
	listsIconContainer: {
		width: deviceWidth * 0.25,
		height: 80,
		alignItems: 'center',
		justifyContent: 'center',
	},
	profileIconContainer: {
		width: deviceWidth * 0.25,
		height: 80,
		alignItems: 'center',
		justifyContent: 'center',
	},
});

export default Toolbar;