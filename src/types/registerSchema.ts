import { parseNumber } from "@/utils/parseNumber";
import z from "zod";

export const registerSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.email("Email inválido"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
  confirmPassword: z.string().min(1, "Confirme sua senha"),
  dataNascimento: z.string().min(10, "Data de nascimento inválida"),
  altura: z.preprocess(parseNumber, z.number().positive("Altura deve ser positiva")),
  peso: z.preprocess(parseNumber, z.number().positive("Peso deve ser positivo")),
  gender: z.string().min(1, "Gênero é obrigatório"),
  fitness_level: z.string().min(1, "Nível de fitness é obrigatório"),
  goal: z.string().min(1, "Objetivo é obrigatório").max(100, "Objetivo muito longo"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Senhas não conferem",
  path: ["confirmPassword"],
});

export const FIELDS = [
  { key: "name", placeholder: "Nome completo", autoCapitalize: "words" as const },
  { key: "email", placeholder: "Email", keyboardType: "email-address" as const },
  { key: "password", placeholder: "Senha (mínimo 6 caracteres)", secureTextEntry: true },
  { key: "confirmPassword", placeholder: "Confirmar senha", secureTextEntry: true },
  { key: "dataNascimento", placeholder: "YYYY-MM-DD" },
  { key: "altura", placeholder: "Altura em metros (Ex: 1.75)", keyboardType: "decimal-pad" as const },
  { key: "peso", placeholder: "Peso em kg (Ex: 70.5)", keyboardType: "decimal-pad" as const },
  { key: "gender", placeholder: "Gênero" },
  { key: "fitness_level", placeholder: "Nível de fitness (Ex: Iniciante)" },
  { key: "goal", placeholder: "Objetivo (Ex: Ganhar massa muscular)" },
];