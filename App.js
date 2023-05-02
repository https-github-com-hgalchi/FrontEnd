import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MapComponent from "./MapComponent";
import EmergencyCall from "./EmergencyCall"; // 새로운 컴포넌트 추가 작성 예정
import CPRStart from "./CPRStart"; // 새로운 컴포넌트 추가 작성 예정
import AskQuestion from "./AskQuestion"; // 새로운 컴포넌트 추가 작성 예정

const Tab = createBottomTabNavigator();

export default function App() {
	return (
		<NavigationContainer>
			<Tab.Navigator>
				<Tab.Screen name="응급실 찾기" component={MapComponent} />
				<Tab.Screen name="119신고" component={EmergencyCall} />
				<Tab.Screen name="CPR 시작" component={CPRStart} />
				<Tab.Screen name="질문하기" component={AskQuestion} />
			</Tab.Navigator>
		</NavigationContainer>
	);
}
