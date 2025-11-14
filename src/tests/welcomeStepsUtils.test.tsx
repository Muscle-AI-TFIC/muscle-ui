import { describe, it, expect } from "vitest";
import {nextStepLogic, prevStepLogic, progressLogic} from "@/services/welcomeLogic";

// total de steps 1 a 4
describe("welcomeLogic positive tests", () => {
  it("nextStepLogic advances correctly", () => {
    expect(nextStepLogic(1)).toBe(2);
    expect(nextStepLogic(3)).toBe(4);
    expect(nextStepLogic(4)).toBe(4); // limite
  });

  it("prevStepLogic rewinds correctly", () => {
    expect(prevStepLogic(3)).toBe(2);
    expect(prevStepLogic(1)).toBe(1); // limite
  });

  it("calculates progress correctly", () => {
    expect(progressLogic(1)).toBe(25);
    expect(progressLogic(2)).toBe(50);
    expect(progressLogic(4)).toBe(100);
  });
});