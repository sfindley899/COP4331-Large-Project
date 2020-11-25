import React, { useContext } from 'react';
import { View, TouchableOpacity, StyleSheet, Image } from 'react-native';

import { deviceWidth, deviceHeight } from '../utils';
import { UserContext } from '../context';
import { useNavigation, useRoute } from '@react-navigation/native';

const Toolbar = () => {
	const [state, setState] = useContext(UserContext);
	const navigation = useNavigation();
	const route = useRoute();

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
						navigation.navigate('Pantry');
					}}
				>
					<Image style={styles.toolbarImage} source={require('../images/toolbar/pantry-icon.png')} />
				</TouchableOpacity>

				<TouchableOpacity 
					style={StyleSheet.compose(styles.listsIconContainer, (route.name === 'Grocery Lists') ? {
							backgroundColor: '#FFFFFF'
						} : {
							backgroundColor: '#ECECEC'
						}
					)}
					activeOpacity={0.5} 
					onPress={() => {
						setState(state => ({ ...state, currentTab: 'lists' }));
						console.log(state.currentTab);
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