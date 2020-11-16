import React, { useEffect, useRef, useState } from 'react';
import { Text, StyleSheet, View, Animated, Image } from 'react-native';
import { Course } from '../../config/constantType';


export interface CourseScreenProps {}

const CourseScreen = ({ navigation, route }) => {
    const [course, setCourse] = useState<Course>(route.params.item);
    const [scroll, setScroll] = useState<Animated.Value>(new Animated.Value(0))

    

	return (
        <View></View>
	);
};

const styles = StyleSheet.create({

});


export default CourseScreen;
