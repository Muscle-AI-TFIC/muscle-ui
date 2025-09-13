"use client";

import { useState } from "react";

export interface WorkoutData {
  name: string;
  duration: number;
  focus: string;
}

// Função isolada para facilitar testes com Vitest
export function generateWorkoutJson(data: WorkoutData): string {
  return JSON.stringify(data, null, 2);
}

export default function WorkoutPage() {
  const [formData, setFormData] = useState<WorkoutData>({
    name: "",
    duration: 0,
    focus: "",
  });

  const [jsonResult, setJsonResult] = useState<string>("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "duration" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setJsonResult(generateWorkoutJson(formData));
  };

  return (
    <div>
      <h1>Gerador de Treino</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Nome do treino"
        />
        <input
          type="number"
          name="duration"
          value={formData.duration}
          onChange={handleChange}
          placeholder="Duração (min)"
        />
        <select name="focus" value={formData.focus} onChange={handleChange}>
          <option value="">Selecione...</option>
          <option value="força">Força</option>
          <option value="cardio">Cardio</option>
          <option value="mobilidade">Mobilidade</option>
        </select>
        <button type="submit">Gerar JSON</button>
      </form>

      {jsonResult && (
        <pre>{jsonResult}</pre>
      )}
    </div>
  );
}
