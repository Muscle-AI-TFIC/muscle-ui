// trainingInput.tsx
// Este arquivo é responsável por capturar os dados de input do usuário e enviá-los p/ o firebase
// Obs: sem ui ainda

import { db } from "@/services/firebase"; // <- importa sua instância de firebase.ts
import { collection, addDoc } from "firebase/firestore";

//Definindo o formato dos dados de treino
export type TrainingInput = {
  tipoTreino: string; // Exemplo: "musculação", "cardio", "crossfit"
  peso: number;       // Peso do usuário em kg
  altura: number;    // Altura em m
  idade: number;      // Idade em anos
  objetivo?: string;  // Qual o obj do usuario? "ganhar massa, perder peso e por ai vai"
};

export function calcularIMC(peso: number, altura: number): number {
  if (peso <= 0 || altura <= 0) {
    throw new Error("Peso e altura devem ser maiores que zero");
  }
  return +(peso / (altura * altura)).toFixed(2);
}

// Função que valida se os dados estão corretos
export function validarInput(input: TrainingInput): boolean {
  if (!input.tipoTreino) return false;
  if (input.peso <= 0) return false;
  if (input.idade <= 0) return false;
  if (input.altura <= 0) return false;

  return true;
}

// Função que envia os dados para o firebase
export async function enviarInput(input: TrainingInput): Promise<string> {
  if (!validarInput(input)) {
    return "Erro: dados inválidos.";
  }

  try {
    //Calculando IMC
    const imc = calcularIMC(input.peso, input.altura);

    console.log('Tentando enviar dados para Firebase:', {
      tipoTreino: input.tipoTreino,
      peso: input.peso,
      altura: input.altura,
      idade: input.idade,
      objetivo: input.objetivo,
      imc: imc
    });

    // "trainings" será o nome da coleção no Firestore
    await addDoc(collection(db, "trainings"), {
      tipoTreino: input.tipoTreino,
      peso: input.peso,
      idade: input.idade,
      altura: input.altura,
      objetivo: input.objetivo || null,
      imc: imc,
      criadoEm: new Date(),
    });

    console.log('Dados enviados com sucesso!');
    return "Dados enviados para o Firebase com sucesso.";
  } catch (error) {
    console.error("Erro detalhado ao enviar dados para o Firebase:", error);
    return "Erro: não foi possível enviar os dados.";
  }
}
