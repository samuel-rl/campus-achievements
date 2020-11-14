import React, { useState } from 'react';
import { StyleSheet, View, FlatList, Text, ScrollView, Image } from 'react-native';
import { colors } from '../../config/constants';

import { useHeaderHeight } from '@react-navigation/stack';

const StatsScreen = () => {
	const headerHeight = useHeaderHeight();


	return (
		<View style={styles.container}>
			<View style={{ marginTop: headerHeight }}>
				<ScrollView>
					
				</ScrollView>
			</View>
		</View>

	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.background,
    },
});

export default StatsScreen;
