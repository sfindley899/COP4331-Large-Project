import React, { useContext } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { UserContext } from '../context';

const FilterButton = (props) => {
	const [state, setState] = useContext(UserContext);

	return (
		<TouchableOpacity 
		style={styles.container}
		activeOpacity={0.5} 
		onPress={() => {
				state.filterStack.push(props.title);
				setState(state => ({ ...state, filterStack: state.filterStack}));
			}
		}
		>

			<Text style={styles.text}>{props.title}</Text>
			<View style={styles.iconContainer}>
				<Image style={styles.icon} source={require('../images/filter/path-icon.png')}/>
			</View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingHorizontal: 20,
		paddingVertical: 15,
		borderBottomColor: '#929292',
		borderBottomWidth: 1,
	},
	text: {
		textAlign: 'left',
		fontFamily: 'Inter',
		fontWeight: 'bold',
		fontSize: 16,
		lineHeight: 24,
	},
	icon: {
		resizeMode: 'contain',
	},
	iconContainer: {
		justifyContent: 'center',
		alignItems: 'center',
	},
});

export default FilterButton;