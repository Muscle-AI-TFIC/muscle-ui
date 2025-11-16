import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { styleHome } from "@/styles/Home";
import ToDoList from "./toDoList";
import Profile from "./profile";
import TrainingSheet from "./trainingSheet";

interface NavBarProps {
	onTabChange: (tab: string) => void;
}

export function CustomNavigationBar({ onTabChange }: NavBarProps) {
	const [activeTab, setActiveTab] = useState("home");

	const tabs = [
		{ id: "home", title: "Exercises", icon: "barbell" },
		{ id: "trainingSheet", title: "Training Sheet", icon: "clipboard" },
		{ id: "profile", title: "Profile", icon: "person" },
	];

	const handleTabPress = (tabId: string) => {
		setActiveTab(tabId);
		onTabChange(tabId);
	};

	return (
		<SafeAreaView edges={["bottom"]} style={styleHome.container}>
			<View style={styleHome.navbar}>
				{tabs.map((tab) => (
					<TouchableOpacity
						key={tab.id}
						style={[styleHome.tab, activeTab === tab.id && styleHome.activeTab]}
						onPress={() => handleTabPress(tab.id)}
						activeOpacity={0.7}
					>
						<View style={styleHome.iconContainer}>
							<Ionicons
								name={
									activeTab === tab.id
										? (tab.icon as any)
										: (`${tab.icon}-outline` as any)
								}
								size={22}
								color={activeTab === tab.id ? "#FFA500" : "#8E8E93"}
							/>
						</View>
						<Text
							style={[
								styleHome.tabTitle,
								activeTab === tab.id && styleHome.activeTabTitle,
							]}
						>
							{tab.title}
						</Text>
					</TouchableOpacity>
				))}
			</View>
		</SafeAreaView>
	);
}

export default function HomeWithCustomNavBar() {
	const [currentTab, setCurrentTab] = useState("home");

	const renderContent = () => {
		switch (currentTab) {
			case "home":
				return (
					<View style={styleHome.content}>
						<ToDoList />
					</View>
				);
			case "trainingSheet":
				return (
					<View style={styleHome.content}>
						<TrainingSheet />
					</View>
				);
			case "profile":
				return (
					<View style={styleHome.content}>
						<Profile />
					</View>
				);
			default:
				return null;
		}
	};

	return (
		<View style={styleHome.mainContainer}>
			{renderContent()}
			<CustomNavigationBar onTabChange={setCurrentTab} />
		</View>
	);
}
