import React from 'react';
import { Text, View, StyleSheet, Image, Button, TouchableOpacity, Dimensions } from 'react-native';

let deviceWidth = Dimensions.get('window').width;
let deviceHeight = Dimensions.get('window').height;

const HomeScreen = ({ navigation }) => {
	return (
		<View style={styles.container}>
			<View style={styles.topBar}>
				<Image style={styles.image} source={require('../images/home/banner.png')}/>
			</View>

			<View style={styles.content}>
				<View style={styles.buttonRow}>
					<TouchableOpacity onPress={() => alert('image clicked')}>
						<Image style={{marginLeft: '15%', maxWidth: deviceWidth * 0.5, maxHeight: deviceHeight * 0.35, resizeMode: 'contain'}} resizeMode={"contain"} source={require('../images/home/pantry.png')}/>
						<Text style={styles.text}>Pantry</Text>
					</TouchableOpacity>

					<TouchableOpacity onPress={() => alert('second image')}>
						<Image style={{marginTop: '-5%', maxWidth: deviceWidth * 0.5, maxHeight: deviceHeight * 0.35, marginLeft: '5%', resizeMode: 'contain'}} resizeMode={"contain"} source={require('../images/home/add_food.png')} />
						<Text style={StyleSheet.compose(styles.text, {marginTop: '-2%'})}>Add Food</Text>
					</TouchableOpacity>
				</View>

				<View style={styles.buttonRow}>
					<TouchableOpacity onPress={() => alert('image clicked')}>
						<Image style={{marginTop: '-10%', maxWidth: deviceWidth * 0.5, maxHeight: deviceHeight * 0.35, resizeMode: 'contain'}} resizeMode={"contain"} source={require('../images/home/recipes.png')}/>
						<Text style={StyleSheet.compose(styles.text, {marginBottom: '10%', marginTop: '-3%'})}>Recipes</Text>
					</TouchableOpacity>

					<TouchableOpacity onPress={() => alert('second image')}>
						<Image style={{marginTop: '-3%', maxWidth: deviceWidth * 0.5, maxHeight: deviceHeight * 0.35, resizeMode: 'contain'}} resizeMode={"contain"} source={require('../images/home/grocery_list.png')} />
						<Text style={StyleSheet.compose(styles.text, {marginTop: '-2%'})}>Grocery List</Text>
					</TouchableOpacity>
				</View>
			</View>

			<View style={styles.bottomBar}>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		alignItems: 'center',
		backgroundColor: '#FBD67C',
	},
	topBar: {
		marginTop: '-5%',
		width: '100%',
		height: '20%',
	},
	image: {
		flex: 1,
		flexGrow: 1,
		width: '100%',
		resizeMode: 'contain',
	},
	bottomBar: {
		backgroundColor: '#FA730B',
		width: '100%',
		height: '8%',
		marginTop: 'auto',
	},
	content: {
		//flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
	},
	buttonRow: {
		flexDirection: 'row',
		width: '100%',
		alignContent: 'space-around',
		justifyContent: 'space-around',
		//backgroundColor: '#FA730B',
	},
	text: {
		textAlign: 'center',
		fontFamily: 'Itim',
		fontSize: 24,
		lineHeight: 29,
		color: '#000000',
		//backgroundColor: '#FA730B'
	},
});

export default HomeScreen;