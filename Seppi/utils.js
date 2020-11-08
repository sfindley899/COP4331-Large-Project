/**
 * 	Javascript file that provides common utility functions used throughout the project components.
 */
import AsyncStorage from '@react-native-async-storage/async-storage';

const app_name = 'seppi'

// Store string value in AsyncStorage given a key, value pair.
export const storeData = async (key, value) => {
	try {
	  await AsyncStorage.setItem(key, value)
	} catch (e) {
	  // saving error
	  console.error(e);
	  return false;
	}
	return true;
}

// Read string value from AsyncStorage given a key.
export const getData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key)
    if(value !== null) {
	  // value previously stored
	  return value;
    }
  } catch(e) {
	// error reading value
	console.error(e);
	return null;
  }
}

export function buildPath(route)
{
	if (process.env.NODE_ENV === 'production') 
	{
		return 'https://' + app_name +  '.herokuapp.com/' + route;
	}
	else
	{        
		// On Android the localhost IP is 10.0.2.2
		return 'http://10.0.2.2:5000/' + route;
	}
}

export function validInput(string) 
{
	if (string === null || string.trim() === '')
		return false;
	return true;
};