import type { WelcomeStepData } from "@/types/interfaces/welcomeData";

export const WELCOME_STEPS: WelcomeStepData[] = [
	{
		id: 1,
		title: "Bem-vindo ao MuscleAI! 👋",
		text: "Vamos te mostrar como usar nossa plataforma para maximizar seus treinos.",
		icon: "👋",
		imageText: "Imagem de Boas-vindas",
	},
	{
		id: 2,
		title: "📊 Acompanhe Seu Progresso",
		text: "Monitore suas estatísticas, evolução muscular e desempenho nos treinos.",
		icon: "📊",
		imageText: "Gráfico de Progresso",
	},
	{
		id: 3,
		title: "🎯 Treinos Personalizados",
		text: "Receba recomendações de exercícios baseadas no seu histórico e objetivos.",
		icon: "🎯",
		imageText: "Exercícios Personalizados",
	},
	{
		id: 4,
		title: "🚀 Comece Agora!",
		text: "Explore todas as funcionalidades e transforme seus treinos!",
		icon: "✅",
		isLast: true,
	},
];
