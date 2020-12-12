import React, { useEffect } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import {
    PanGestureHandler,
    State,
    TouchableWithoutFeedback,
  } from "react-native-gesture-handler";
import Animated, {
    abs,
    add,
    call,
    clockRunning,
    cond,
    eq,
    not,
    set,
    useCode,
  } from "react-native-reanimated";
import { Notification } from '../../../config/constantType';
import NotificationLayout from './NotificationLayout';
import { snapPoint,
    timing,
    useClock,
    usePanGestureHandler,
    useValue,
    minus,
    clamp, } from 'react-native-redash/lib/module/v1';
import RemoveNotification from './RemoveNotification';

export interface NotificationItemProps {
    item: Notification;
    onSwipe: () => void;
}

const { width } = Dimensions.get("window");
const snapPoints = [-width, -64, 0];

const NotificationItem = ({ item, onSwipe }: NotificationItemProps) => {
	const { gestureHandler, translation, velocity, state } = usePanGestureHandler();
	const translateX = useValue(0);
	const offsetX = useValue(0);
    const height = useValue(100);
    const marginTop = useValue(10);
	const deleteOpacity = useValue(1);
	const clock = useClock();
	const to = snapPoint(translateX, velocity.x, snapPoints);
    const shouldRemove = useValue(0);
    
    useCode(
        () => [
          cond(
            eq(state, State.ACTIVE),
            set(translateX, add(offsetX, clamp(translation.x,  -9999, minus(offsetX) ))),
          ),
          cond(eq(state, State.END), [
            set(translateX, timing({ clock, from: translateX, to })),
            set(offsetX, translateX),
            cond(eq(to, -width), set(shouldRemove, 1)),
          ]),
          cond(shouldRemove, [
            set(height, timing({ from: 100, to: 0 })),
            set(marginTop, timing({ from: 10, to: 0 })),
            set(deleteOpacity, 0),
            cond(not(clockRunning(clock)), call([], onSwipe)),
          ]),
          
        ],
        [onSwipe]
      );
	return (
		<Animated.View style={[styles.container, {marginTop: marginTop}]}>
			<View style={styles.background}>
                <RemoveNotification x={abs(translateX)} {...{ deleteOpacity }} />
            </View>
			<PanGestureHandler {...gestureHandler}>
				<Animated.View style={{height, transform: [{ translateX }] }}>
					<NotificationLayout {...{ item }} />
				</Animated.View>
			</PanGestureHandler>
		</Animated.View>
	);
};

const styles = StyleSheet.create({
	background: {
		...StyleSheet.absoluteFillObject,
		flexDirection: 'row',
		justifyContent: 'flex-end',
		alignItems: 'center',
        overflow: 'hidden',
    },
    container: {
        marginHorizontal: 15,
    }
});

export default NotificationItem;
