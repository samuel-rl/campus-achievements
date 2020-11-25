import React, { useState } from 'react';
import { StyleSheet, View, Button, TextInput } from 'react-native';

import Fire from '../../config/Fire';


const NotificationsScreen = () => {

    const [messageContent, setMessageContent] = useState('');
    
    const sendNotification = async (token:any) => {
        const message = {
          to: token,
          sound: 'default',
          title: 'Nouveau message',
          body: messageContent,
          data: { data: 'goes here' },
        };
      
        await fetch('https://exp.host/--/api/v2/push/send', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Accept-encoding': 'gzip, deflate',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(message),
        });
      }

      const sendNotificationToAllUsers = async () => {
          const users = await Fire.shared.firestore.collection('users').get();
          users.docs.map(user => sendNotification(user.data().token));
      }


  return (
    <View style={styles.container}>
        <TextInput  style={styles.input} placeholder="message..." value={messageContent} onChangeText={setMessageContent}/>
        <Button title="envoyer" onPress={sendNotificationToAllUsers}></Button>
        <Button title="log" onPress={() => {}}></Button>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    input: {
        height: 100,
        width: 200,
        backgroundColor: "grey"
    }
});

export default NotificationsScreen;