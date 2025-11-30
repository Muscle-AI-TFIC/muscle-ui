import { router } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { supabase } from "@/services/supabase";
import { getFirstAccessStatus } from "@/services/user_profile"; // Import the new service
import LoginScreen from "./auth/login";

export default function Index() {
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const checkSession = async () => {
			console.log("checkSession started");
			const {
				data: { session },
			} = await supabase.auth.getSession();
			console.log("Session in Index:", session);
			if (session) {
				try {
					// Check first-access status
					const isFirstAccess = await getFirstAccessStatus(session.user.id);

					if (isFirstAccess) {
						router.replace("/tabs/welcome");
						return;
					}

					// Default to home if not first access
					router.replace("/tabs/home");
				} catch (error) {
					console.error("Error in checkSession:", error);
					router.replace("/tabs/home"); // Default to home on error
				}
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
