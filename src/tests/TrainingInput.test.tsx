// TrainingInput.test.ts
// Testes unitários para TrainingInput.tsx

import { describe, it, expect } from "vitest";
import { validarInput, enviarInput, TrainingInput } from "../../app/inputPage/TrainingInput";

describe("Função validarInput", () => {
  it("deve retornar true para dados válidos", () => {
    const input: TrainingInput = {
      tipoTreino: "musculação",
      peso: 70,
      idade: 25,
      objetivo: "ganhar massa",
    };

    expect(validarInput(input)).toBe(true);
  });

  it("deve retornar false para peso inválido", () => {
    const input: TrainingInput = {
      tipoTreino: "cardio",
      peso: -5,
      idade: 20,
    };

    expect(validarInput(input)).toBe(false);
  });

  it("deve retornar false para idade inválida", () => {
    const input: TrainingInput = {
      tipoTreino: "crossfit",
      peso: 70,
      idade: 0,
    };

    expect(validarInput(input)).toBe(false);
  });

  it("deve retornar false se tipoTreino estiver vazio", () => {
    const input: TrainingInput = {
      tipoTreino: "",
      peso: 70,
      idade: 25,
    };

    expect(validarInput(input)).toBe(false);
  });
});

describe("Função enviarInput", () => {
  it("deve retornar mensagem de sucesso para input válido", async () => {
    const input: TrainingInput = {
      tipoTreino: "musculação",
      peso: 80,
      idade: 30,
    };

    const result = await enviarInput(input);
    expect(result).toBe("Dados enviados com sucesso.");
  });

  it("deve retornar erro para input inválido", async () => {
    const input: TrainingInput = {
      tipoTreino: "",
      peso: 0,
      idade: -1,
    };

    const result = await enviarInput(input);
    expect(result).toBe("Erro: dados inválidos.");
  });
});
