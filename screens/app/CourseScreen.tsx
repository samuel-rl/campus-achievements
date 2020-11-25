import React, { useEffect, useRef, useState } from 'react';
import { Text, StyleSheet, View, Animated, Image, StatusBar, YellowBox } from 'react-native';
import { Course } from '../../config/constantType';
import StickyParallaxHeader from 'react-native-sticky-parallax-header';
import { Feather } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Students from '../../components/app/Course/Students';
import EnseignantsList from '../../components/app/Course/EnseignantsList';
import ListSkills from '../../components/app/Course/ListSkills';
import Discussion from '../../components/app/Course/Discussion';

export interface CourseScreenProps {}

const CourseScreen = ({ navigation, route }) => {
    YellowBox.ignoreWarnings(['Animated: `useNativeDriver` was not specified. This is a required option and must be explicitly set to `true` or `false`', 'Animated.event now requires a second argument for options']);

	const [course, setCourse] = useState<Course>(route.params.item);
    const [scroll, setScroll] = useState<Animated.Value>(new Animated.Value(0));

	const renderContent = (label) => (
		<View style={styles.content}>
			<Text>{label}</Text>
		</View>
	);

	const renderHeader = () => {
		const opacity = scroll.interpolate({
			inputRange: [0, 160, 210],
			outputRange: [0, 0.5, 1],
			extrapolate: 'clamp',
		});
		return (
			<View style={[styles.headerWrapper, { backgroundColor: course.color }]}>
                <TouchableOpacity style={{marginHorizontal: 10}} onPress={() => {
                    navigation.navigate('Home')
                }}>
                    <Feather name="arrow-left" size={25} color="#fff"/>
                </TouchableOpacity>
				<Animated.View style={[{ opacity }]}>
					<Text style={styles.headerTitle}>{course.nom}</Text>
				</Animated.View>
			</View>
		);
	};

	const renderForeground = () => {
		const titleOpacity = scroll.interpolate({
			inputRange: [0, 106, 154],
			outputRange: [1, 0.5, 0],
            extrapolate: 'clamp',
		});

		return (
			<View style={styles.foreground}>
				<Animated.View style={{ opacity: titleOpacity }}>
					<Text style={styles.message}>{course.nom}</Text>
				</Animated.View>
			</View>
		);
    };
    

	return (
		<>
			<StickyParallaxHeader
                onChangeTab={(x) => console.log(x)}
                rememberTabScrollPosition={false}
				foreground={renderForeground()}
				header={renderHeader()}
				parallaxHeight={200}
                headerSize={() => {}}
                headerHeight={50}
				onEndReached={() => {}}
				scrollEvent={Animated.event([{ nativeEvent: { contentOffset: { y: scroll } } }])}
				tabs={[
					{
						title: 'Cours',
						content: renderContent('Infos sur le cours'),
					},
					{
						title: 'Compétences',
						content: <ListSkills skills={course.skills} navigation={navigation}/>,
                    },
					{
						title: 'Discussion',
						content: <Discussion messagesProps={course.messages} uidCourse={course.uid} enseignants={course.enseignants}/>,
                    },
                    {
						title: 'Documents',
						content: renderContent('Liste des documents à télécharger'),
					},
					{
						title: 'Élèves',
						content: <Students students={course.etudiants} />,
					},
					{
						title: 'Enseignants',
						content: <EnseignantsList enseignants={course.enseignants} />,
					},
				]}
				tabTextStyle={styles.tabText}
				tabTextContainerStyle={styles.tabTextContainerStyle}
				tabTextContainerActiveStyle={styles.tabTextContainerActiveStyle}
                tabsContainerBackgroundColor={course.color}
			/>
			<StatusBar barStyle="dark-content" backgroundColor={course.color} />
		</>
	);
};

const styles = StyleSheet.create({
	content: {
        marginTop: 50,
        justifyContent:"center",
        alignContent:"center"
        
	},
	foreground: {
		flex: 1,
		justifyContent: 'flex-end',
	},
	message: {
		color: 'white',
        fontSize: 40,
        padding: 10
	},
	headerWrapper: {
        alignItems:"center",
        height: '100%',
		width: '100%',
        flexDirection: 'row',
	},
	headerTitle: {
		fontSize: 16,
        color: 'white',
	},
	tabTextContainerStyle: {
		backgroundColor: 'transparent',
        borderRadius: 18,
        marginHorizontal: 5,
        marginVertical: 5
	},
	tabTextContainerActiveStyle: {
		backgroundColor: "black",
	},
	tabText: {
		fontSize: 16,
		lineHeight: 20,
		paddingHorizontal: 12,
		paddingVertical: 8,
		color: 'white',
	},
});

/*
<StickyParallaxHeader
				backgroundColor={course.color}
				headerType="AvatarHeader"
                title={course.nom}
                parallaxHeight={250}
                subtitle=""
                image={{uri:course.enseignants[0].avatar}}
                renderBody={() => {
                    return (<View><Text>Mettre le cours ici</Text></View>)
                }}
            />
            

            			<StickyParallaxHeader
				backgroundColor={course.color}
				headerType="TabbedHeader"
                title={course.nom}
                tabs={[
                        {title: 'Cours',content: <Text>trucs sur le cours</Text>},
                        {title: 'Compétences',content: <Text>Liste des competences à débloquer</Text>},
                        {title: 'Étudiants',content: <Text>Liste des autres etudiants</Text>},
                        {title: 'Enseignant',content: <Text>Liste des enseignants</Text>},
                    ]}
                tabTextStyle={{marginHorizontal:20, fontSize: 17}}
                tabTextActiveStyle={{color:"#fff"}}
                foregroundImage={{uri:course.enseignants[0].avatar}}
                logo={1}
                logoStyle={{marginLeft: 0}}
                log
            />
            


            			backgroundColor={course.color}
			headerType="AvatarHeader"
			title={course.nom}
			parallaxHeight={250}
			subtitle=""
            image={{ uri: course.enseignants[0].avatar }}
			renderBody={() => {
				return (
					<View style={{backgroundColor:colors.background, flex:1}}>
						<Text>Mettre le cours ici</Text>
					</View>
				);
            }}
            leftTopIconOnPress={() => navigation.navigate('Home')}
            bounces={true}
            */

export default CourseScreen;
