// trainingInput.tsx
// Este arquivo é responsável por capturar os dados de input do usuário e enviá-los p/ o firebase
// Obs: sem ui ainda

import { db } from "@/services/firebase"; // <- importa sua instância de firebase.ts
import { collection, addDoc } from "firebase/firestore";

//Definindo o formato dos dados de treino
export type TrainingInput = {
  tipoTreino: string; // Exemplo: "musculação", "cardio", "crossfit"
  peso: number;       // Peso do usuário em kg
  idade: number;      // Idade em anos
  objetivo?: string;  // Qual o obj do usuario? "ganhar massa, perder peso e por ai vai"
};

// Função que valida se os dados estão corretos
export function validarInput(input: TrainingInput): boolean {
  if (!input.tipoTreino) return false;
  if (input.peso <= 0) return false;
  if (input.idade <= 0) return false;

  return true;
}

// Função que envia os dados para o firebase
export async function enviarInput(input: TrainingInput): Promise<string> {
  if (!validarInput(input)) {
    return "Erro: dados inválidos.";
  }

  try {
    // "trainings" será o nome da coleção no Firestore
    await addDoc(collection(db, "trainings"), {
      tipoTreino: input.tipoTreino,
      peso: input.peso,
      idade: input.idade,
      objetivo: input.objetivo || null,
      criadoEm: new Date(), // marca o horário do envio
    });

    return "Dados enviados para o Firebase com sucesso.";
  } catch (error) {
    console.error("Erro ao enviar dados para o Firebase:", error);
    return "Erro: não foi possível enviar os dados.";
  }
}
