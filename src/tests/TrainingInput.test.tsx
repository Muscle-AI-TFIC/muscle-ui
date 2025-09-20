import { describe, it, expect, vi, beforeEach } from "vitest";
import {enviarInput, TrainingInput, validarInput} from "../../app/tabs/trainingInput";

// Mock do Firebase
vi.mock("firebase/firestore", () => {
  return {
    getFirestore: vi.fn(() => ({})), // retorna um db fake
    collection: vi.fn(() => ({})),    // retorna um objeto fake para collection
    addDoc: vi.fn(),                  // função que será controlada pelos testes
  };
});

// Importa o addDoc mockado
import { addDoc, collection } from "firebase/firestore";

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
      altura: 1.75,
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
      altura: 1.75,
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
      altura: 1.70,
      idade: 22,
    };

    const result = await enviarInput(input);

    expect(result).toBe("Erro: não foi possível enviar os dados.");
    expect(addDoc).toHaveBeenCalledTimes(1);
  });

  it("deve enviar múltiplos inputs corretamente", async () => {
    (addDoc as any).mockResolvedValue({ id: "ok" });

    const inputs: TrainingInput[] = [
      { tipoTreino: "musculação", peso: 70, altura: 1.75, idade: 25 },
      { tipoTreino: "crossfit", peso: 68, altura: 1.72, idade: 26 },
    ];

    for (const input of inputs) {
      await enviarInput(input);
    }

    expect(addDoc).toHaveBeenCalledTimes(inputs.length);
  });

  it("deve usar a coleção correta 'trainings' ao enviar dados", async () => {
    (addDoc as any).mockResolvedValue({ id: "123" });

    const input: TrainingInput = {
      tipoTreino: "cardio",
      peso: 65,
      altura: 1.70,
      idade: 22,
    };

    await enviarInput(input);

    // Aqui collection é o spy importado diretamente
    expect(collection).toHaveBeenCalledWith(expect.anything(), "trainings");
  });

});

describe("Função validarInput", () => {
  it("deve retornar true para dados válidos", () => {
    const input: TrainingInput = {
      tipoTreino: "musculação",
      peso: 70,
      altura: 1.75,
      idade: 25,
      objetivo: "ganhar massa",
    };

    expect(validarInput(input)).toBe(true);
  });

  it("deve retornar false para peso inválido", () => {
    const input: TrainingInput = {
      tipoTreino: "cardio",
      peso: -5,
      altura: 1.70,
      idade: 20,
    };

    expect(validarInput(input)).toBe(false);
  });

  it("deve retornar false para idade inválida", () => {
    const input: TrainingInput = {
      tipoTreino: "crossfit",
      peso: 70,
      altura: 1.75,
      idade: 0,
    };

    expect(validarInput(input)).toBe(false);
  });

  it("deve retornar false se tipoTreino estiver vazio", () => {
    const input: TrainingInput = {
      tipoTreino: "",
      peso: 70,
      altura: 1.75,
      idade: 25,
    };

    expect(validarInput(input)).toBe(false);
  });

  it("deve retornar false se altura for inválida", () => {
    const input: TrainingInput = {
      tipoTreino: "musculação",
      peso: 70,
      altura: 0,
      idade: 25,
    };

    expect(validarInput(input)).toBe(false);
  });
});