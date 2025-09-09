import { describe, it, expect } from "vitest";
import { generateWorkoutJson, WorkoutData } from "../../app/inputPage/workoutPage";

describe("Função generateWorkoutJson", () => {
  it("gera JSON com dados corretos", () => {
    const data: WorkoutData = { name: "Treino A", duration: 45, focus: "cardio" };
    const result = generateWorkoutJson(data);
    expect(result).toContain('"name": "Treino A"');
    expect(result).toContain('"duration": 45');
    expect(result).toContain('"focus": "cardio"');
  });

  it("funciona mesmo com valores vazios", () => {
    const data: WorkoutData = { name: "", duration: 0, focus: "" };
    const result = generateWorkoutJson(data);
    expect(result).toContain('"name": ""');
    expect(result).toContain('"duration": 0');
    expect(result).toContain('"focus": ""');
  });

  it("mantém a estrutura JSON correta", () => {
    const data: WorkoutData = { name: "Treino B", duration: 30, focus: "força" };
    const result = generateWorkoutJson(data);
    const parsed = JSON.parse(result); // testa se é um JSON válido
    expect(parsed).toEqual(data);
  });
});
