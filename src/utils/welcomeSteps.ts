import type { WelcomeStepData } from "@/types/interfaces/welcomeData";

export const WELCOME_STEPS: WelcomeStepData[] = [
	{
		id: 1,
		title: "Bem-vindo ao MuscleAI! 👋",
		text: "Vamos te mostrar como usar nossa plataforma para maximizar seus treinos.",
		icon: "👋",
	},
	{
		id: 2,
		title: "📊 Acompanhe Seu Progresso",
		text: "Gere treinos personalizados de acordo com suas necessidades!",
		icon: "📊",
		imageText: "Tela de Treinos",
        imageUrl: "https://imgur.com/tMi9qXH",
	},
	{
		id: 3,
		title: "🎯 Treinos customizáveis",
		text: "Crie Treinos do seu jeito!",
		icon: "🎯",
		imageText: "Treinos customizáveis",
        imageUrl: "https://imgur.com/zdCfrJE",
	},
    {
		id: 4,
		title: "🎯 Você pode criar um perfil! Que servirá de base para a nossa AI criar um treino exclusivo para você!👀",
		text: "Crie Treinos do seu jeito!",
		icon: "🎯",
		imageText: "Treinos customizáveis",
        imageUrl: "https://imgur.com/DzSE03E",
	},
	{
		id: 5,
		title: "🚀 Comece Agora!",
		text: "Explore todas as funcionalidades e transforme seus treinos!",
		icon: "✅",
		isLast: true,
	},
];
