import { describe, it, expect, vi, beforeEach } from "vitest";
import { enviarInput, TrainingInput } from "../../app/inputPage/trainingInput";

// Mock do Firebase
vi.mock("firebase/firestore", () => {
  return {
    getFirestore: vi.fn(() => ({})), // retorna um db fake
    collection: vi.fn(() => ({})),    // retorna um objeto fake para collection
    addDoc: vi.fn(),                  // função que será controlada pelos testes
  };
});

// Importa o addDoc mockado
import { addDoc } from "firebase/firestore";

describe("Função enviarInput (com Firebase mockado)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("deve enviar dados válidos com sucesso", async () => {
    (addDoc as any).mockResolvedValueOnce({ id: "abc123" });

    const input: TrainingInput = {
      tipoTreino: "musculação",
      peso: 70,
      idade: 25,
      objetivo: "ganhar massa",
    };

    const result = await enviarInput(input);

    expect(result).toBe("Dados enviados para o Firebase com sucesso.");
    expect(addDoc).toHaveBeenCalledTimes(1);
  });

  it("deve retornar erro se input for inválido", async () => {
    const input: TrainingInput = {
      tipoTreino: "",
      peso: -10,
      idade: 0,
    };

    const result = await enviarInput(input);

    expect(result).toBe("Erro: dados inválidos.");
    expect(addDoc).not.toHaveBeenCalled();
  });

  it("deve lidar com erro do Firebase", async () => {
    (addDoc as any).mockRejectedValueOnce(new Error("Falha no Firebase"));

    const input: TrainingInput = {
      tipoTreino: "cardio",
      peso: 60,
      idade: 22,
    };

    const result = await enviarInput(input);

    expect(result).toBe("Erro: não foi possível enviar os dados.");
    expect(addDoc).toHaveBeenCalledTimes(1);
  });
});
