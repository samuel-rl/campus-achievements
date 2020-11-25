import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View, Keyboard, FlatList, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Bubble, GiftedChat, IMessage, Message, Send } from 'react-native-gifted-chat';
import Fire from '../../../config/Fire';
import { BasicUserInfos } from '../../../config/constantType';
import fr from 'dayjs/locale/fr';

export interface DiscussionProps {
	messagesProps: IMessage[];
    uidCourse: string;
    enseignants: BasicUserInfos[];
}

const Discussion = ({ messagesProps, uidCourse, enseignants }: DiscussionProps) => {
	const [messages, setMessages] = useState<IMessage[]>(messagesProps.reverse());
	const [minInputToolbarHeight, setMinInputToolbarHeight] = useState(45);

	useEffect(() => {

        var messTemp = messages;
        messTemp.sort(function(a, b) {
            var c:any = new Date(a.createdAt);
            var d:any = new Date(b.createdAt);
            return d-c;
        });
        setMessages(messTemp)

		let keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
		let keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', _keyboardDidHide);

		return () => {
			keyboardDidShowListener;
			keyboardDidHideListener;
		};
	}, []);

	const _keyboardDidShow = (e) => {
		let keyboardHeight = e.endCoordinates.height;
		setMinInputToolbarHeight(45 + keyboardHeight);
	};

	const _keyboardDidHide = () => {
		setMinInputToolbarHeight(45);
	};

	/*
	const onSend = useCallback((messages = []) => {
		setMessages((previousMessages) => GiftedChat.append(previousMessages, messages));
    }, []);
    */
	const onSend = async (message: IMessage[]) => {
        setMessages((previousMessages) => GiftedChat.append(previousMessages, message));
        console.log(message[0])
		Fire.shared.sendMessage(message[0], uidCourse);
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
                      locale={fr}
				/>
		</View>
	);
};

const styles = StyleSheet.create({});

export default Discussion;
