import { AsyncStorage } from 'react-native';

const storeDataCourse = async json => {
    console.log("storeDataCourse...")
	try {
		const jsonValue = JSON.stringify(json);
		await AsyncStorage.setItem('@cours', jsonValue);
	} catch (e) {
		console.log(e);
	}
};

const getDataCourse = async () => {
    console.log("getDataCourse...")
	return new Promise(async (resolve, reject) => {
		try {
			const value = await AsyncStorage.getItem('@cours');
			if (value !== null) {
				resolve(JSON.parse(value));
			}
			reject(false);
		} catch (e) {
			console.log(e);
			reject(false);
		}
	});
};

const storeDataRewards = async json => {
    console.log("storeDataRewards...")
	try {
		const jsonValue = JSON.stringify(json);
		await AsyncStorage.setItem('@rewards', jsonValue);
	} catch (e) {
		console.log(e);
	}
}

const getDataRewards = async () => {
    console.log("getDataRewards...")
	return new Promise(async (resolve, reject) => {
		try {
			const value = await AsyncStorage.getItem('@rewards');
			if (value !== null) {
				resolve(JSON.parse(value));
			}
			reject(false);
		} catch (e) {
			console.log(e);
			reject(false);
		}
	});
};

export {storeDataCourse, getDataCourse, storeDataRewards, getDataRewards}