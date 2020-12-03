// Import libraries
import 'react-native-gesture-handler';
import React, { useState, useMemo } from 'react';
import {NavigationContainer, getFocusedRouteNameFromRoute, DrawerActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native';

import { AuthContext, UserProvider } from './context';
import { DrawerContent } from './DrawerContent';

// Import screen components
import SplashScreen from './pages/SplashScreen';
import MainScreen from './pages/MainScreen';
import LoginScreen from './pages/LoginScreen';
import ForgotPasswordScreen from './pages/ForgotPasswordScreen';
import RegisterScreen from './pages/RegisterScreen';
import EmailValidationScreen from './pages/EmailValidationScreen';
import RecipeSearchScreen from './pages/RecipeSearchScreen';
import PantryScreen from './pages/PantryScreen';
import BarcodeScreen from './pages/BarcodeScreen';
import ListsScreen from './pages/ListsScreen';
import ProfileScreen from './pages/ProfileScreen';
import ChangeUsernameScreen from './pages/ChangeUsernameScreen';
import ChangeEmailScreen from './pages/ChangeEmailScreen';

const RootStack = createStackNavigator();
const AuthStack = createStackNavigator();
const RecipeStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const PantryStack = createStackNavigator();
const ListsStack = createStackNavigator();
const Drawer = createDrawerNavigator();

const AuthStackScreen = () => (
	<AuthStack.Navigator>
		<AuthStack.Screen name="Login/Register" component={MainScreen} />
		<AuthStack.Screen name="Login" component={LoginScreen} />
		<AuthStack.Screen name="Forgot Password" component={ForgotPasswordScreen} />
		<AuthStack.Screen name="Register" component={RegisterScreen} />
		<AuthStack.Screen name="Email Validation" component={EmailValidationScreen} />
	</AuthStack.Navigator>
);

const RecipeStackScreen = ({ navigation, route }) => (
	<RecipeStack.Navigator 
		screenOptions={{
			headerTitle: getHeaderTitle(route),
			headerLeft: () => (
				<TouchableOpacity
					activeOpacity={0.15}
					onPress={() => navigation.dispatch(navigation.toggleDrawer())}
				>
					<Icon
						iconStyle={{marginLeft: 20}}
						name='menu'
					/>
				</TouchableOpacity>
			),
		}}
	>
		<RecipeStack.Screen name="Recipe Search" component={RecipeSearchScreen} />
	</RecipeStack.Navigator>
);

const PantryStackScreen = ({ navigation, route }) => (
	<PantryStack.Navigator
		screenOptions={{
			headerTitle: getHeaderTitle(route),
			headerLeft: () => (
				<TouchableOpacity
					activeOpacity={0.15}
					onPress={() => navigation.dispatch(navigation.toggleDrawer())}
				>
					<Icon
						iconStyle={{marginLeft: 20}}
						name='menu'
					/>
				</TouchableOpacity>
			),
		}}
	>
		<PantryStack.Screen name="Pantry" component={PantryScreen} />
		<PantryStack.Screen name="Barcode" component={BarcodeScreen} />
	</PantryStack.Navigator>
);

const ListsStackScreen = ({ navigation, route }) => (
	<ListsStack.Navigator
		screenOptions={{
			headerTitle: getHeaderTitle(route),
			headerLeft: () => (
				<TouchableOpacity
					activeOpacity={0.15}
					onPress={() => navigation.dispatch(navigation.toggleDrawer())}
				>
					<Icon
						iconStyle={{marginLeft: 20}}
						name='menu'
					/>
				</TouchableOpacity>
			),
		}}
	>
		<ListsStack.Screen name="Grocery List" component={ListsScreen} />
	</ListsStack.Navigator>
);

const ProfileStackScreen = ({ navigation, route }) => (
	<ProfileStack.Navigator 
		screenOptions={{
			headerTitle: getHeaderTitle(route),
			headerLeft: () => (
				<TouchableOpacity
					activeOpacity={0.15}
					onPress={() => navigation.dispatch(navigation.toggleDrawer())}
				>
					<Icon
						iconStyle={{marginLeft: 20}}
						name='menu'
					/>
				</TouchableOpacity>
			),
		}}
	>
		<ProfileStack.Screen name="Profile" component={ProfileScreen} />
		<ProfileStack.Screen name="Change Username" component={ChangeUsernameScreen} />
		<ProfileStack.Screen name="Change Email" component={ChangeEmailScreen} />
		<ProfileStack.Screen name="Validate Email" component={EmailValidationScreen} />
		<ProfileStack.Screen name="Reset Password" component={ForgotPasswordScreen} />
	</ProfileStack.Navigator>
);

const DrawerScreen = () => (
	<Drawer.Navigator drawerContent={props => <DrawerContent {...props} />} >
		<Drawer.Screen name="Recipe Search" component={RecipeStackScreen} />
		<Drawer.Screen name="Profile" component={ProfileStackScreen} />
		<Drawer.Screen name="Pantry" component={PantryStackScreen} />
		<Drawer.Screen name="Grocery List" component={ListsStackScreen} />
	</Drawer.Navigator>
);

const RootStackScreen = ({ userToken }) => {
		return (
		<RootStack.Navigator screenOptions={({ route }) => ({headerTitle: getHeaderTitle(route)})}>
			{userToken ? (
				<RootStack.Screen name="Recipe Search" component={DrawerScreen}
					options={({ navigation, route }) => ({
						headerTitle: getHeaderTitle(route),
						headerLeft: () => (
							<TouchableOpacity 
								activeOpacity={0.15}
								onPress={() => {navigation.dispatch(DrawerActions.toggleDrawer())}}>
								<Icon 
									iconStyle={{marginLeft: 20}} 
									name='menu' 
								/>
							</TouchableOpacity>
						),
					})}
				/>
			) : (
				<RootStack.Screen name="Login/Register" component={AuthStackScreen}/>
			)}
			</RootStack.Navigator>	
		);
};

function getHeaderTitle(route) {
	// If the focused route is not found, we need to assume it's the initial screen
	// This can happen if there hasn't been any navigation inside the screen
	// In our case, it's "Login/Register" as that's the first screen inside the navigator
	const routeName = getFocusedRouteNameFromRoute(route) ?? 'Login/Register';
  
	switch (routeName) {
		case 'Recipe Search':
			return 'Recipe Search';
		case 'Pantry':
			return 'Pantry';
		case 'Barcode':
			return 'Scan Barcode';
		case 'Grocery List':
			return 'Grocery List';
		case 'Profile':
			return 'Account';
		case 'Login':
			return 'Sign In';
		case 'Register':
			return 'Create Account';
		case 'Forgot Password':
			return 'Reset Password';
		case 'Email Validation':
			return 'Validate Your Email';
	}
}

const App = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [userToken, setUserToken] = useState(false);

	const authContext = useMemo(() => {
		return {
			signIn: () => {
				setIsLoading(false);
				setUserToken(true);
			},
			signUp: () => {
				setIsLoading(false);
				setUserToken(false);
			},
			signOut: () => {
				setIsLoading(false);
				setUserToken(false);
			}
		};
	}, []);

	React.useEffect(() => {
		setTimeout(() => {
			setIsLoading(false);
		}, 1000);
	}, []);
	
	if (isLoading) {
		return <SplashScreen />;
	}

	return (
		<UserProvider>
			<AuthContext.Provider value={authContext}>
				<NavigationContainer>
					<RootStackScreen userToken={userToken} />
				</NavigationContainer>
			</AuthContext.Provider>
		</UserProvider>
	);
}

export default App;
