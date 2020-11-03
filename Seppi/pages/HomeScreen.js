import React from 'react';
import { Text, View, StyleSheet, Image, Button, TouchableOpacity, Dimensions } from 'react-native';

let deviceWidth = Dimensions.get('window').width;
let deviceHeight = Dimensions.get('window').height;

const HomeScreen = ({ navigation }) => {
	return (
		<View style={styles.container}>
			<View style={styles.topBar}>
				<Image style={styles.banner} source={require('../images/home/banner.png')}/>
			</View>

			<View style={styles.content}>
				<View style={StyleSheet.compose(styles.buttonRow, {marginBottom: '5%'})}>
					<TouchableOpacity onPress={() => alert('image clicked')}>
						<Image style={styles.image} resizeMode={"contain"} source={require('../images/home/pantry.png')}/>
						<Text style={styles.text}>Pantry</Text>
					</TouchableOpacity>

					<TouchableOpacity onPress={() => alert('second image')}>
						<Image style={styles.image} resizeMode={"contain"} source={require('../images/home/add_food.png')} />
						<Text style={StyleSheet.compose(styles.text, {marginTop: '-2%'})}>Add Food</Text>
					</TouchableOpacity>
				</View>

				<View style={styles.buttonRow}>
					<TouchableOpacity onPress={() => alert('image clicked')}>
						<Image style={styles.image} resizeMode={"contain"} source={require('../images/home/recipes.png')}/>
						<Text style={StyleSheet.compose(styles.text, {marginBottom: '10%', marginTop: '-3%'})}>Recipes</Text>
					</TouchableOpacity>

					<TouchableOpacity onPress={() => alert('second image')}>
						<Image style={styles.image} resizeMode={"contain"} source={require('../images/home/grocery_list.png')} />
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
	banner: {
		flex: 1,
		flexGrow: 1,
		width: '100%',
		resizeMode: 'contain',
	},
	bottomBar: {
		backgroundColor: '#FA730B',
		width: '100%',
		height: '10%',
		marginTop: 'auto',
	},
	content: {
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
	},
	buttonRow: {
		flexDirection: 'row',
		width: '100%',
		alignContent: 'space-around',
		justifyContent: 'space-around',
	},
	text: {
		textAlign: 'center',
		fontFamily: 'Itim',
		fontSize: 24,
		lineHeight: 29,
		color: '#000000',
	},
	image: {
		width: deviceWidth * 0.5, 
		height: deviceHeight * 0.25, 
		resizeMode: 'contain',
	},
});

export default HomeScreen;