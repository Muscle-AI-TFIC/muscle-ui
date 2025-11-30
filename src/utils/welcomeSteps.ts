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
		text: "Monitore suas estatísticas, evolução muscular e desempenho nos treinos.",
		icon: "📊",
		imageText: "Tela de Treinos",
		imageUrl: "https://i.imgur.com/OygBs3m.jpeg",
	},
	{
		id: 3,
		title: "🎯 Treinos Personalizados",
		text: "Receba recomendações de exercícios baseadas no seu histórico e objetivos.",
		icon: "🎯",
		imageText: "Treinos customizáveis",
		imageUrl: "https://i.imgur.com/g7uYMYF.jpeg",
	},
	{
		id: 4,
		title: "🎯 Crie Treinos do seu jeito!",
		text: "Você pode criar um perfil! Que servirá de base para a nossa AI criar um treino exclusivo para você!👀",
		icon: "🎯",
		imageText: "Treinos customizáveis",
		imageUrl: "https://i.imgur.com/FJLZKsP.jpeg",
	},
	{
		id: 5,
		title: "🚀 Comece Agora!",
		text: "Explore todas as funcionalidades e transforme seus treinos!",
		icon: "✅",
		isLast: true,
	},
];
