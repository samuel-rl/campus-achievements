import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View, Button } from 'react-native';
import { useHeaderHeight } from '@react-navigation/stack';


const StatsScreen = () => {
	const headerHeight = useHeaderHeight();



	return (
		<View style={styles.container}>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});

export default StatsScreen;
