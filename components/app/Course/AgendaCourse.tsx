import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Agenda, CalendarList, Calendar } from 'react-native-calendars';
import faker from 'faker';

export interface AgendaCourseProps {
	color: string;
}

const AgendaCourse = ({ color }: AgendaCourseProps) => {
	var date = new Date();
	var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
	var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

	function format(input) {
		var date = new Date(input);
		return [date.getFullYear(), ('0' + (date.getMonth() + 1)).slice(-2), ('0' + date.getDate()).slice(-2)].join(
			'-'
		);
	}

	const randomDateInMonth = new Map([
		[
			format(faker.date.between(firstDay, lastDay)),
			{  disableTouchEvent: true, selectedColor: color, selected: true },
		],
		[
			format(faker.date.between(firstDay, lastDay)),
			{  disableTouchEvent: true, selectedColor: color, selected: true },
		],
		[
			format(faker.date.between(firstDay, lastDay)),
			{ disableTouchEvent: true, selectedColor: color, selected: true },
		],
		[
			format(faker.date.between(firstDay, lastDay)),
			{  disableTouchEvent: true, selectedColor: color, selected: true },
		],
		[
			format(faker.date.between(firstDay, lastDay)),
			{  disableTouchEvent: true, selectedColor: color, selected: true },
		],
		[
			format(faker.date.between(firstDay, lastDay)),
			{ disableTouchEvent: true, selectedColor: color, selected: true },
		],
		[
			format(faker.date.between(firstDay, lastDay)),
			{ disableTouchEvent: true, selectedColor: color, selected: true },
		],
		[
			format(faker.date.between(firstDay, lastDay)),
			{ disableTouchEvent: true, selectedColor: color, selected: true },
		],
		[
			format(faker.date.between(firstDay, lastDay)),
			{ disableTouchEvent: true, selectedColor: color, selected: true },
		],
	]);

	const obj = Object.fromEntries(randomDateInMonth);

	return (
		<View style={styles.container}>
			<Calendar
				style={styles.calendar}
				current={new Date().toISOString().split('T')[0].toString()}
				hideExtraDays
				disableAllTouchEventsForDisabledDays
				firstDay={1}
				markedDates={obj}
				hideArrows={true}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		height: '85%',
		justifyContent: 'center',
	},
	calendar: {
		marginBottom: 10,
	},
});

export default AgendaCourse;
