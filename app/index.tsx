import { router } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { supabase } from "@/services/supabase";
import LoginScreen from "./auth/login";

export default function Index() {
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const checkSession = async () => {
			const {
				data: { session },
			} = await supabase.auth.getSession();
			if (session) {
				router.replace("/tabs/home");
			} else {
				setLoading(false);
			}
		};

		checkSession();
	}, []);

	if (loading) {
		return (
			<View
				style={{
					flex: 1,
					justifyContent: "center",
					alignItems: "center",
					backgroundColor: "#121212",
				}}
			>
				<ActivityIndicator size="large" color="#fff" />
			</View>
		);
	}

	return <LoginScreen />;
}
