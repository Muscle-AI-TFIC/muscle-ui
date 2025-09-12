// TrainingInput.tsx
// Este arquivo é responsável por capturar os dados de input do usuário e preparar para enviar
// Obs: ainda não integrado com firebase e sem ui
// apenas funções que simulam para ideia inicial

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

// Função que envia os dados
//    Neste momento, só simulamos com console.log
//    Mais tarde, essa função será ligada ao Firebase
export async function enviarInput(input: TrainingInput): Promise<string> {
  if (!validarInput(input)) {
    return "Erro: dados inválidos.";
  }

  // Simulação de envio (no futuro -> Firebase)
  console.log("Enviando dados de treino:", input);

  // Retorno fictício de sucesso
  return "Dados enviados com sucesso.";
}
