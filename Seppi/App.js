// Import libraries
import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer, getFocusedRouteNameFromRoute, DrawerActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native';

// Import screen components
import MainScreen from './pages/MainScreen';
import LoginScreen from './pages/LoginScreen';
import RegisterScreen from './pages/RegisterScreen';
import HomeScreen from './pages/HomeScreen';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function getHeaderTitle(route) {
	// If the focused route is not found, we need to assume it's the initial screen
	// This can happen if there hasn't been any navigation inside the screen
	// In our case, it's "Login/Register" as that's the first screen inside the navigator
	const routeName = getFocusedRouteNameFromRoute(route) ?? 'Login/Register';
  
	switch (routeName) {
	  case 'Login/Register':
		return 'Login or Register';
	  case 'Login':
		return 'Login';
	  case 'Register':
		return 'Register';
	}
}

function MainScreenDrawer() {
	return (
		<Drawer.Navigator>
			<Drawer.Screen name="Login/Register" component={MainScreen} />
			<Drawer.Screen name="Login" component={LoginScreen} />
			<Drawer.Screen name="Register" component={RegisterScreen} />
		</Drawer.Navigator>
	);
};

function HomeScreenDrawer() {
	return (
		<Drawer.Navigator>
			<Drawer.Screen name="Home" component={HomeScreen} />
		</Drawer.Navigator>
	);
};

const App = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator
				screenOptions={({ navigation, route }) => ({
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
			>
				<Stack.Screen name="Login/Register" component={MainScreenDrawer} />
				<Stack.Screen name="Login" component={MainScreenDrawer} />
				<Stack.Screen name="Register" component={MainScreenDrawer} />
				<Stack.Screen name="Home" options={{ title: 'My Home' }} component={HomeScreenDrawer} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}

export default App;
