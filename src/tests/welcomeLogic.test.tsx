import { describe, it, expect } from "vitest";
import {nextStepLogic, prevStepLogic, progressLogic} from "@/services/welcomeLogic";

// total de steps 1 a 4
describe("welcomeLogic", () => {
  it("nextStepLogic avança corretamente", () => {
    expect(nextStepLogic(1)).toBe(2);
    expect(nextStepLogic(3)).toBe(4);
    expect(nextStepLogic(4)).toBe(4); // limite
  });

  it("prevStepLogic retrocede corretamente", () => {
    expect(prevStepLogic(3)).toBe(2);
    expect(prevStepLogic(1)).toBe(1); // limite
  });

  it("calcula o progresso corretamente", () => {
    expect(progressLogic(1)).toBe(25);
    expect(progressLogic(2)).toBe(50);
    expect(progressLogic(4)).toBe(100);
  });
});
