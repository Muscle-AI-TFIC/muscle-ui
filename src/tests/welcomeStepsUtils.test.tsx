import { describe, expect, it } from "vitest";
import {
	nextStepLogic,
	prevStepLogic,
	progressLogic,
} from "@/services/welcomeLogic";

// total de steps 1 a 5
describe("welcomeLogic positive tests", () => {
	it("nextStepLogic advances correctly", () => {
		expect(nextStepLogic(1)).toBe(2);
		expect(nextStepLogic(3)).toBe(4);
		expect(nextStepLogic(4)).toBe(5);
		expect(nextStepLogic(5)).toBe(5); // limite
	});

	it("prevStepLogic rewinds correctly", () => {
		expect(prevStepLogic(3)).toBe(2);
		expect(prevStepLogic(1)).toBe(1); // limite
	});

	it("calculates progress correctly", () => {
		expect(progressLogic(1)).toBe(20);
		expect(progressLogic(2)).toBe(40);
		expect(progressLogic(3)).toBe(60);
		expect(progressLogic(4)).toBe(80);
		expect(progressLogic(5)).toBe(100);
	});
});
