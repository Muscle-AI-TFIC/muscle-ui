import { describe, it, expect } from "vitest";
import { getDifficultyColor } from "../utils/difficultyColor";

describe("getDifficultyColor", () => {
	it('should return correct color for "iniciante"', () => {
		expect(getDifficultyColor("iniciante")).toBe("#4CAF50");
		expect(getDifficultyColor("INICIANTE")).toBe("#4CAF50");
		expect(getDifficultyColor("Iniciante")).toBe("#4CAF50");
	});

	it('should return correct color for "intermediário"', () => {
		expect(getDifficultyColor("intermediário")).toBe("#FF9800");
		expect(getDifficultyColor("INTERMEDIÁRIO")).toBe("#FF9800");
		expect(getDifficultyColor("Intermediário")).toBe("#FF9800");
	});

	it('should return correct color for "avançado"', () => {
		expect(getDifficultyColor("avançado")).toBe("#F44336");
		expect(getDifficultyColor("AVANÇADO")).toBe("#F44336");
		expect(getDifficultyColor("Avançado")).toBe("#F44336");
	});

	it("should return default color for unknown difficulties", () => {
		expect(getDifficultyColor("expert")).toBe("#666");
		expect(getDifficultyColor("")).toBe("#666");
		expect(getDifficultyColor("beginner")).toBe("#666");
		expect(getDifficultyColor("123")).toBe("#666");
	});
});
