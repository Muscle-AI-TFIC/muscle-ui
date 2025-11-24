import { describe, it, expect } from "vitest";
import { calculateIMC } from "../utils/calcImc";
import { UserInfo } from "../types/UserInfo";

describe("CalculateIMC", () => {
	const baseUser: UserInfo = {
		id: "1",
		name: "John Doe",
		weight_kg: 70,
		height_cm: 175,
		birth_date: "1990-01-01",
		goal: "fitness",
		fitness_level: "intermediate",
		gender: "male",
	};

	it("should correctly calculate BMI when valid weight and height are provided", () => {
		const result = calculateIMC(baseUser);
		expect(result).toBe("22.9");
	});

	it("should handle height in meters correctly (e.g., 1.75 instead of 175)", () => {
		const user: UserInfo = { ...baseUser, height_cm: 1.75 };
		const result = calculateIMC(user);
		expect(result).toBe("22.9");
	});

	it('should return "--" if height is zero', () => {
		const user: UserInfo = { ...baseUser, height_cm: 0 };
		const result = calculateIMC(user);
		expect(result).toBe("--");
	});

	it('should return "--" if weight is missing', () => {
		const user: UserInfo = { ...baseUser, weight_kg: undefined as any };
		const result = calculateIMC(user);
		expect(result).toBe("--");
	});

	it('should return "--" if height is missing', () => {
		const user: UserInfo = { ...baseUser, height_cm: undefined as any };
		const result = calculateIMC(user);
		expect(result).toBe("--");
	});

	it('should return "--" if userInfo is null', () => {
		const result = calculateIMC(null as any);
		expect(result).toBe("--");
	});
});
