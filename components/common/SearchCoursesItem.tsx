import React, { createRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image, FlatList} from 'react-native';
import { colors } from '../../config/constants';
import { BasicUserInfos, Course } from '../../config/constantType';
import { SimpleLineIcons } from '@expo/vector-icons'; 
import Fire from '../../config/Fire';
import AlertPro from 'react-native-alert-pro';

interface SearchCoursesItemProps {
    item: Course;
    navigation: any;
    deleteItemOnParent: Function
}



const SearchCoursesItem = ({ item, navigation, deleteItemOnParent }: SearchCoursesItemProps) => {
    const alert = createRef<any>();

    const ItemAvatar = ({urlAvatar}:any) => {
        return (
                <Image
                    style={{ width: 35, height: 35, borderRadius: 100}}
                    source={{uri: urlAvatar}}
                />
        )
    }

    const joinCourse = async () => {
        alert.current.close()
        const userAdd:BasicUserInfos = {
            uid: Fire.shared.uid,
            avatar: Fire.shared.photoURL,
            displayName: Fire.shared.displayName,
            token: Fire.shared.token,
        };
        deleteItemOnParent(item)
        Fire.shared.enterInCourseStudent(userAdd, item).then(() => {
            navigation.goBack()
        })
    }
    

  return(
    <TouchableOpacity style={styles.container} activeOpacity={1} onPress={()=> {
        alert.current.open()
    }}>
        <View style={styles.containerColor}>
            <View style={[styles.color, {backgroundColor:item.color}]}></View>
        </View>
        <View style={styles.containerInfos}>
            <Text style={styles.titre}>{item.nom}</Text>
            {item.etudiants.length == 0 ? <Text style={styles.lightText}>Encore aucun étudiant</Text> : <Text style={styles.lightText}>{item.etudiants.length} autres étudiants</Text>}
            <FlatList
                style={styles.listAvatar}
				data={item.etudiants}
				keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => <ItemAvatar urlAvatar={item.avatar} />}
                horizontal
			/>
        </View>
        <View style={styles.containerMore}>
            <SimpleLineIcons name="arrow-right" size={15} color="black" />
        </View>
        <AlertPro
          ref={alert}
          onConfirm={async () => joinCourse()}
          onCancel={() => alert.current.close()}
          title={"Rejoindre le cours " + item.nom + "?"}
          textCancel="Non"
          textConfirm="Oui"
          customStyles={{
            mask: {
              backgroundColor: "rgba(0, 0, 0, 0.15)"
            },
            container:{
                paddingVertical: 30
            },
            buttonCancel: {
              backgroundColor: colors.warning
            },
            buttonConfirm: {
              backgroundColor: colors.doneGreen
            },
          }}
        />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        marginHorizontal: 20,
        height: 110,
        marginVertical: 10,
        borderRadius: 20,
        flexDirection: "row",
        paddingVertical: 15
    },
    containerColor:{
        flex: 1,
        alignItems: "flex-end"
    },
    color: {
        width: 10,
        height: 40,
        borderRadius: 50,
    },
    containerInfos: {
        flex: 7,
        paddingLeft: 15,
        justifyContent: 'space-between',
    },
    titre:{
        fontSize: 17,
        includeFontPadding:false,
        fontWeight: "bold",
    },
    lightText:{
        color: "#969aa3",
        fontStyle:"italic"
    },
    listAvatar:{
        flexGrow: 0
    },
    containerMore: {
        flex: 2,
        justifyContent:"center",
        alignItems: 'center'
    },
});

export default SearchCoursesItem;