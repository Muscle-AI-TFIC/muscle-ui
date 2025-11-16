import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import ProfileHeader from "@/components/ProfileHeader";
import LogoutSection from "@/components/LogoutSection";
import EditUserModal from "@/components/EditUserModal";
import StatsSection from "@/components/StatsSection";
import InfoSection from "@/components/InfoSection";
import MenuSection from "@/components/MenuSection";
import { useProfile } from "@/hooks/useProfile";
import { styles } from "@/styles/Profile";

export default function ProfileScreen() {
	const {
		image,
		loading,
		loadingProfile,
		userEmail,
		userName,
		modalVisible,
		userInfo,
		setModalVisible,
		setUserInfo,
		handlePickImage,
		handleRemoveImage,
		handleSaveUserInfo,
		handleLogout,
		calculateIMC,
		calculateAge,
	} = useProfile();

	if (loadingProfile || !userInfo) {
		return (
			<View
				style={[
					styles.container,
					{ justifyContent: "center", alignItems: "center" },
				]}
			>
				<ActivityIndicator size="large" color="#bb6c12ff" />
				<Text style={{ marginTop: 16 }}>Carregando perfil...</Text>
			</View>
		);
	}

	return (
		<ScrollView style={styles.container}>
			<ProfileHeader
				image={image}
				userName={userName}
				userEmail={userEmail}
				handlePickImage={handlePickImage}
				handleRemoveImage={handleRemoveImage}
			/>

			<StatsSection
				userInfo={userInfo}
				calculateIMC={calculateIMC}
				calculateAge={calculateAge}
			/>

			<InfoSection userInfo={userInfo} />

			<MenuSection setModalVisible={setModalVisible} />

			<LogoutSection handleLogout={handleLogout} loading={loading} />

			<View style={styles.footer}>
				<Text style={styles.footerText}>Versão 1.0.0</Text>
			</View>

			<EditUserModal
				modalVisible={modalVisible}
				setModalVisible={setModalVisible}
				userInfo={userInfo}
				setUserInfo={setUserInfo}
				handleSaveUserInfo={handleSaveUserInfo}
				loading={loading}
			/>
		</ScrollView>
	);
}
