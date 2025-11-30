import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
	ActivityIndicator,
	Image,
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import { submitRegistration } from "@/services/submiteRegistration";
import { registerprops } from "@/styles/Register";
import { FIELDS } from "@/types/registerSchema";

export default function RegisterScreen() {
	const [formData, setFormData] = useState<Record<string, string>>(
		Object.fromEntries(FIELDS.map((f) => [f.key, ""])),
	);
	const [loading, setLoading] = useState(false);

	const updateField = (key: string, value: string) =>
		setFormData((prev) => ({ ...prev, [key]: value }));

	const handleSubmit = () => {
		submitRegistration(formData, setLoading);
	};

	return (
		<KeyboardAvoidingView
			style={registerprops.container}
			behavior={Platform.OS === "ios" ? "padding" : "height"}
		>
			<StatusBar style="dark" />
			<ScrollView
				contentContainerStyle={registerprops.scrollContent}
				keyboardShouldPersistTaps="handled"
				showsVerticalScrollIndicator={false}
			>
				<View style={registerprops.header}>
					<Text style={registerprops.title}>Criar Conta</Text>
					<Image
						style={registerprops.logo}
						source={require("../../assets/images/logo-final.png")}
					/>
					<Text style={registerprops.subtitle}>
						Preencha os dados abaixo para criar sua conta
					</Text>
				</View>

				<View style={registerprops.form}>
					{FIELDS.map(({ key, placeholder, ...props }) => (
						<View key={key} style={{ width: "100%", alignItems: "center" }}>
							<TextInput
								style={registerprops.input}
								placeholder={placeholder}
								value={formData[key]}
								onChangeText={(v) => updateField(key, v)}
								autoCapitalize="none"
								autoCorrect={false}
								editable={!loading}
								{...props}
							/>
						</View>
					))}
				</View>

				<TouchableOpacity
					style={[
						registerprops.registerButton,
						loading && registerprops.registerButtonDisabled,
					]}
					onPress={handleSubmit}
					disabled={loading}
					activeOpacity={0.8}
				>
					{loading ? (
						<View style={registerprops.loadingContainer}>
							<ActivityIndicator color="#fff" size="small" />
							<Text style={registerprops.registerButtonText}>
								Registrando...
							</Text>
						</View>
					) : (
						<Text style={registerprops.registerButtonText}>Criar Conta</Text>
					)}
				</TouchableOpacity>

				<View style={registerprops.footer}>
					<Text style={registerprops.footerText}>
						Ao criar uma conta, você concorda com nossos{" "}
						<Text style={registerprops.linkText}>Termos de Uso</Text>
					</Text>
				</View>
			</ScrollView>
		</KeyboardAvoidingView>
	);
}
