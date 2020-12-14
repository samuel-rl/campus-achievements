import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Dimensions, ScrollView } from 'react-native';
import { useHeaderHeight } from '@react-navigation/stack';
import { LineChart, PieChart, ProgressChart } from 'react-native-chart-kit';
import Fire from '../../config/Fire';
import { Course, Skill } from '../../config/constantType';
import { IMessage } from 'react-native-gifted-chat';
import { ActivityIndicator } from 'react-native-paper';

const screenWidth = Dimensions.get('window').width;
const widthCard = screenWidth - 20;

interface dataSkillsInterface {
	labels: string[];
	data: number[];
}

interface dataMessagesInterace {
	labels: string[];
	datasets: any[];
}

interface dataDocumentsInterface {
	name: string;
	nombre: number;
	color: string;
	legendFontColor: string;
	legendFontSize: number;
}

const StatsScreen = () => {
	const headerHeight = useHeaderHeight();

	const [dataMessagesLineChart, setDataMessagesLineChart] = useState<dataMessagesInterace>({
		datasets: [
			{
				data: [0, 0, 0, 0, 0, 0],
				color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`, // optional
				strokeWidth: 2, // optional
			},
		],
		labels: ['Jan', 'Fev', 'Mar', 'Avr', 'Mai', 'Jui', 'Jui', 'Aou', 'Sep', 'Oct', 'Nov', 'Dec'],
	});
	const [dataMessagesTotalLineChart, setDataMessagesTotalLineChart] = useState<dataMessagesInterace>({
		datasets: [
			{
				data: [0, 0, 0, 0, 0, 0],
				color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`, // optional
				strokeWidth: 2, // optional
			},
		],
		labels: ['Jan', 'Fev', 'Mar', 'Avr', 'Mai', 'Jui', 'Jui', 'Aou', 'Sep', 'Oct', 'Nov', 'Dec'],
	});

	const [dataDocumentPieChart, setDataDocumentPieChart] = useState<dataDocumentsInterface[]>([
		{
			name: 'aucun',
			nombre: 1,
			color: '#e8e8e8',
			legendFontColor: '#FFFFFF',
			legendFontSize: 12,
		},
	]);

	const [loading, setLoading] = useState(true);
	const [dataSkillProgressChart, setDataSkillProgressChart] = useState<dataSkillsInterface>({ data: [], labels: [] });

	useEffect(() => {
		Fire.shared.getMyInfos().then(async (res: any) => {
			var tempUIDMyCourses: string[] = [];
			if (Fire.shared.student == true) {
				if (res.cours != undefined) {
					res.cours.map((x: any) => tempUIDMyCourses.push(x.uid));
				}
			} else {
				if (res.coursEnseignant != undefined) {
					res.coursEnseignant.map((x: any) => tempUIDMyCourses.push(x.uid));
				}
			}

			Fire.shared.getMyCoursesInformationsByUID(tempUIDMyCourses).then((myCours: Course[]) => {
				//-----------
				var totalSkillDone = 0;
				var dataSkillsTempQuiz = 0;
				var dataSkillsTempAutoEval = 0;
				var dataSkillsTempSoftSkill = 0;
				myCours.map((cours: Course) => {
					cours.skills.map((skill: Skill) => {
						if (skill.check.includes(Fire.shared.uid ? Fire.shared.uid : '')) {
							totalSkillDone++;
							if (skill.autoEvaluate) {
								dataSkillsTempAutoEval++;
							}
							if (skill.isSoftSkill) {
								dataSkillsTempSoftSkill++;
							}
							if (skill.quizz != null) {
								dataSkillsTempQuiz++;
							}
						}
					});
				});

                console.log([dataSkillsTempQuiz, dataSkillsTempAutoEval, dataSkillsTempSoftSkill, totalSkillDone]);
                var dktq;
                var dsta;
                var dsts;
                if(dataSkillsTempQuiz != 0){
                    dktq = (dataSkillsTempQuiz / totalSkillDone)
                }else{
                    dktq = 0;
                }

                if(dataSkillsTempAutoEval != 0){
                    dsta = (dataSkillsTempAutoEval / totalSkillDone)
                }else{
                    dsta = 0;
                }

                if(dataSkillsTempSoftSkill != 0){
                    dsts = (dataSkillsTempSoftSkill / totalSkillDone)
                }else{
                    dsts = 0;
                }

                console.log([dktq, dsta, dsts, totalSkillDone]);


				var dataSkillsTemp: dataSkillsInterface = {
					labels: ['Quiz', 'Auto', 'SoftSkill'],
					data: [dktq, dsta, dsts],
				};
				setDataSkillProgressChart(dataSkillsTemp);
				//-----------

				var numberMessageJan = 0;
				var numberMessageFev = 0;
				var numberMessageMar = 0;
				var numberMessageAvr = 0;
				var numberMessageMai = 0;
				var numberMessageJui = 0;
				var numberMessageJuil = 0;
				var numberMessageAou = 0;
				var numberMessageSep = 0;
				var numberMessageOct = 0;
				var numberMessageNov = 0;
				var numberMessageDec = 0;

				var numberMessageEnvoyeJan = 0;
				var numberMessageEnvoyeFev = 0;
				var numberMessageEnvoyeMar = 0;
				var numberMessageEnvoyeAvr = 0;
				var numberMessageEnvoyeMai = 0;
				var numberMessageEnvoyeJui = 0;
				var numberMessageEnvoyeJuil = 0;
				var numberMessageEnvoyeAou = 0;
				var numberMessageEnvoyeSep = 0;
				var numberMessageEnvoyeOct = 0;
				var numberMessageEnvoyeNov = 0;
				var numberMessageEnvoyeDec = 0;

				myCours.map((cours: Course) => {
					cours.messages.map((message: IMessage) => {
						var date = new Date(message.createdAt);
                        var month = date.getMonth() + 1;
						if (message.user._id == Fire.shared.uid) {
							switch (month) {
								case 1:
									numberMessageJan++;
									break;
								case 2:
									numberMessageFev++;
									break;
								case 3:
									numberMessageMar++;
									break;
								case 4:
									numberMessageAvr++;
									break;
								case 5:
									numberMessageMai++;
									break;
								case 6:
									numberMessageJui++;
									break;
								case 7:
									numberMessageJuil++;
									break;
								case 8:
									numberMessageAou++;
									break;
								case 9:
									numberMessageSep++;
									break;
								case 10:
									numberMessageOct++;
									break;
								case 11:
									numberMessageNov++;
									break;
								case 12:
									numberMessageDec++;
									break;
							}
						}
						switch (month) {
							case 1:
								numberMessageEnvoyeJan++;
								break;
							case 2:
								numberMessageEnvoyeFev++;
								break;
							case 3:
								numberMessageEnvoyeMar++;
								break;
							case 4:
								numberMessageEnvoyeAvr++;
								break;
							case 5:
								numberMessageEnvoyeMai++;
								break;
							case 6:
								numberMessageEnvoyeJui++;
								break;
							case 7:
								numberMessageEnvoyeJuil++;
								break;
							case 8:
								numberMessageEnvoyeAou++;
								break;
							case 9:
								numberMessageEnvoyeSep++;
								break;
							case 10:
								numberMessageEnvoyeOct++;
								break;
							case 11:
								numberMessageEnvoyeNov++;
								break;
							case 12:
								numberMessageEnvoyeDec++;
								break;
						}
					});
				});
				const dataMessageTemp = {
					datasets: [
						{
							data: [
								numberMessageJan,
								numberMessageFev,
								numberMessageMar,
								numberMessageAvr,
								numberMessageMai,
								numberMessageJui,
								numberMessageJuil,
								numberMessageAou,
								numberMessageSep,
								numberMessageOct,
								numberMessageNov,
								numberMessageDec,
							],
							color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`, // optional
							strokeWidth: 2, // optional
						},
					],
					labels: ['Jan', 'Fev', 'Mar', 'Avr', 'Mai', 'Jui', 'Jui', 'Aou', 'Sep', 'Oct', 'Nov', 'Dec'],
				};
				const dataMessageTotalTemp = {
					datasets: [
						{
							data: [
								numberMessageEnvoyeJan,
								numberMessageEnvoyeFev,
								numberMessageEnvoyeMar,
								numberMessageEnvoyeAvr,
								numberMessageEnvoyeMai,
								numberMessageEnvoyeJui,
								numberMessageEnvoyeJuil,
								numberMessageEnvoyeAou,
								numberMessageEnvoyeSep,
								numberMessageEnvoyeOct,
								numberMessageEnvoyeNov,
								numberMessageEnvoyeDec,
							],
							color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`, // optional
							strokeWidth: 2, // optional
						},
					],
					labels: ['Jan', 'Fev', 'Mar', 'Avr', 'Mai', 'Jui', 'Jui', 'Aou', 'Sep', 'Oct', 'Nov', 'Dec'],
				};
				setDataMessagesLineChart(dataMessageTemp);
				setDataMessagesTotalLineChart(dataMessageTotalTemp);

				//-----------
				var zero = 0;
				var un = 0;
				var deux = 0;
				var trois = 0;
				var quatre = 0;
				var plus = 0;
				myCours.map((cours: Course) => {
					var nb = cours.documents.length;
					switch (nb) {
						case 0:
							zero++;
							break;
						case 1:
							un++;
							break;
						case 2:
							deux++;
							break;
						case 3:
							trois++;
							break;
						case 4:
							quatre++;
							break;
						default:
							plus++;
					}
				});

				var dataDocumentTemp = [
					{
						name: 'aucun',
						nombre: zero,
						color: '#e8e8e8',
						legendFontColor: '#000',
						legendFontSize: 12,
					},
					{
						name: 'un',
						nombre: un,
						color: '#bbbfca',
						legendFontColor: '#000',
						legendFontSize: 12,
					},
					{
						name: 'deux',
						nombre: deux,
						color: '#495464',
						legendFontColor: '#000',
						legendFontSize: 12,
					},
					{
						name: 'trois',
						nombre: trois,
						color: '#393e46',
						legendFontColor: '#000',
						legendFontSize: 12,
					},
					{
						name: 'quatre',
						nombre: quatre,
						color: '#222831',
						legendFontColor: '#000',
						legendFontSize: 12,
					},
					{
						name: 'plus...',
						nombre: plus,
						color: '#000',
						legendFontColor: '#000',
						legendFontSize: 12,
					},
				];
				setDataDocumentPieChart(dataDocumentTemp);
			});

			setLoading(false);
		});
		//Fire.shared.getAllCourses().then((c: Course[]) => {});
	}, []);

	const chartSkillsConfig = {
		backgroundColor: '#e26a00',
		backgroundGradientFrom: '#182e83',
		backgroundGradientTo: '#182e83',
		backgroundGradientToOpacity: 0.9,
		color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        barPercentage: 0.5,

	};

	const chartMessagesConfig = {
		backgroundColor: '#e26a00',
		backgroundGradientFrom: '#ffa726',
		backgroundGradientTo: '#ffa726',
		backgroundGradientToOpacity: 0.8,
		color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
		strokeWidth: 2,
		barPercentage: 0.5,
    };
    
    const chartMessagesTotalConfig = {
		backgroundColor: '#e26a00',
		backgroundGradientFrom: '#6fac66',
		backgroundGradientTo: '#6fac66',
		backgroundGradientToOpacity: 0.8,
		color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
		strokeWidth: 2,
		barPercentage: 0.5,
	};

	const chartDocumentsConfig = {
		backgroundColor: '#1cc910',
		backgroundGradientFrom: '#6fac66',
        backgroundGradientTo: '#6fac66',
		decimalPlaces: 2,
		color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
	};

	return (
		<View style={styles.container}>
			{loading ? (
				<ActivityIndicator />
			) : (
				<ScrollView style={{ marginTop: headerHeight }} showsVerticalScrollIndicator={false}>
					
					<View style={{ marginVertical: 15 }}>
						<Text>Messages envoyés par vous dans vos cours:</Text>
						<LineChart
							data={dataMessagesLineChart}
							width={widthCard}
							height={220}
							chartConfig={chartMessagesConfig}
							bezier
							style={{
								borderRadius: 16,
							}}
						/>
					</View>

					<View style={{ marginVertical: 15 }}>
						<Text>Messages totals dans vos cours:</Text>
						<LineChart
							data={dataMessagesTotalLineChart}
							width={widthCard}
							height={220}
							chartConfig={chartMessagesTotalConfig}
							bezier
							style={{
								borderRadius: 16,
							}}
						/>
					</View>

                    <View style={{ marginVertical: 15 }}>
						<Text>Skills réussi par type:</Text>
						<ProgressChart
							accessor=""
							backgroundColor="none"
							paddingLeft="100"
							data={dataSkillProgressChart}
							width={widthCard}
							height={220}
							strokeWidth={16}
							radius={22}
							chartConfig={chartSkillsConfig}
							hideLegend={false}
							style={{
                                borderRadius: 16,
                            }}

						/>
					</View>

                    <View style={{ marginVertical: 15 }}>
						<Text>Nombre de documents dans les cours:</Text>
						<PieChart
							data={dataDocumentPieChart}
							width={widthCard}
							height={220}
							chartConfig={chartDocumentsConfig}
							accessor={'nombre'}
							backgroundColor="#efbbcf"
							paddingLeft={'15'}
							style={{
								borderRadius: 16,
							}}
						/>
					</View>
				</ScrollView>
			)}
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
