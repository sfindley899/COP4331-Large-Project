import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import {
    useTheme,
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    Text,
    TouchableRipple,
    Switch
} from 'react-native-paper';

import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import{ AuthContext, UserContext } from './context';
import { buildPath } from './utils';

export function DrawerContent(props) {
    const paperTheme = useTheme();

    const { signOut } = React.useContext(AuthContext);
    const [state, setState] = useContext(UserContext);

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
		console.log(Object.entries(json.categories));
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

    return(
        <View style={{flex:1}}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{flexDirection:'row',marginTop: 15}}>
                            <Avatar.Image 
                                source={require('./images/default-avatar.jpg')}
                                size={50}
                            />
                            <View style={{marginLeft:15, flexDirection:'column'}}>
                                <Title style={styles.title}>{state.name}</Title>
                                <Caption style={styles.caption}>{state.email}</Caption>
                            </View>
                        </View>
                    </View>

                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="book-open-outline" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Recipes"
                            onPress={() => {props.navigation.navigate('Recipe Search')}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="fridge-outline" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Pantry"
                            onPress={() => {
                                fetchIngredients();
                                fetchExpiring();
                                props.navigation.navigate('Pantry');
                            }}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="clipboard-list-outline" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Grocery List"
                            onPress={() => {
                                fetchGroceries();
                                props.navigation.navigate('Grocery List');
                            }}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="account-outline" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Profile"
                            onPress={() => {props.navigation.navigate('Profile')}}
                        />
                    </Drawer.Section>
                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem 
                    icon={({color, size}) => (
                        <Icon 
                        name="exit-to-app" 
                        color={color}
                        size={size}
                        />
                    )}
                    label="Sign Out"
                    onPress={async () => {
                        const response = await fetch(buildPath('signout'), {
                            method: 'POST',
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'application/json'
                            },
                        }).catch((error) => console.error(error));

                        let status = await response.status;
                        if (status === 200) {
                            signOut();
                            return;
                        }
                        else {
                            console.error('Failed to sign out due to internal server error.');
                            return;
                        }
                    }}
                />
            </Drawer.Section>
        </View>
    );
}

const styles = StyleSheet.create({
    drawerContent: {
      flex: 1,
    },
    userInfoSection: {
      paddingLeft: 20,
    },
    title: {
      fontSize: 16,
      marginTop: 3,
      fontWeight: 'bold',
    },
    caption: {
      fontSize: 14,
      lineHeight: 14,
    },
    row: {
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    section: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 15,
    },
    paragraph: {
      fontWeight: 'bold',
      marginRight: 3,
    },
    drawerSection: {
      marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
  });