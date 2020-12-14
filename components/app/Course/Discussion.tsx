import React, { useEffect, useState } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Bubble, GiftedChat, IMessage, Message, Send } from 'react-native-gifted-chat';
import Fire from '../../../config/Fire';
import 'dayjs/locale/fr';
import { getDataRewards, storeDataRewards } from '../../../config/localDatabase';
import { Reward } from '../../../config/constantType';

export interface DiscussionProps {
	messagesProps: IMessage[];
    uidCourse: string | undefined;
    onSendParent: Function;
}

const Discussion = ({ messagesProps, uidCourse, onSendParent }: DiscussionProps) => {
    const [messages, setMessages] = useState<IMessage[]>(messagesProps.reverse());
    
	useEffect(() => {
        var messTemp = messages;
        messTemp.sort(function(a, b) {
            var c:any = new Date(a.createdAt);
            var d:any = new Date(b.createdAt);
            return d-c;
        });
        setMessages(messTemp)
	}, []);

	const onSend = async (message: IMessage[]) => {
        setMessages((previousMessages) => GiftedChat.append(previousMessages, message));
        Fire.shared.sendMessage(message[0], uidCourse);
        onSendParent(message[0].text)
        getDataRewards().then((rewards: Reward[]) => {
            console.log(rewards)
            if(rewards[5].done != true){
                rewards[5].done = true;
                storeDataRewards(rewards)
                Fire.shared.updateRewardByName(rewards[5].name)
            }
        });
	};

	const renderSendButton = (props) => {
		return (
			<Send
				{...props}
				containerStyle={{
					paddingHorizontal: 12,
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<Feather name="send" size={27} color="black" />
			</Send>
		);
    };

    const renderBubble = (props) => {
        return (
            <Bubble 
                {...props}
                wrapperStyle={{
                    left: {
                        backgroundColor : "#fff"
                    },
                    right:{
                        backgroundColor : "#4A5AAB"
                    }
                }}
            />
        )
    }

	return (
		<View style={{ height: '100%'}}>
				<GiftedChat
					scrollToBottom
					showAvatarForEveryMessage
					renderSend={renderSendButton}
					alwaysShowSend
					placeholder="Votre message..."
					renderUsernameOnMessage
					messages={messages}
					onSend={(message: IMessage[]) => onSend(message)}
					user={{
						_id: Fire.shared.uid ? Fire.shared.uid : 1,
						name: Fire.shared.displayName ? Fire.shared.displayName : ' ',
						avatar: Fire.shared.photoURL ? Fire.shared.photoURL : ' ',
                    }}
                    renderMessage={(props) => {
                        return (
                          <View>
                            <Message {... props} />
                            <FlatList
                              nestedScrollEnabled={true}
                              data={[]}
                              renderItem={() => <View />}
                            />
                          </View>
                        );
                      }}
                      listViewProps={{
                        nestedScrollEnabled: true
                      }}
                      renderBubble={renderBubble}
                      dateFormat={'dddd DD. MMMM'}
                      locale={'fr'}
				/>
		</View>
	);
};

const styles = StyleSheet.create({});

export default Discussion;
