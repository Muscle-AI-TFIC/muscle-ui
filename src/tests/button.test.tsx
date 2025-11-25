import { describe, expect, it, vi } from "vitest";
import { button_test } from "@/components/Button/Button";

vi.mock("@/components/Button/Button", () => ({
	button_test: vi.fn(),
}));

describe("It thest if the function fom the button has benn called", () => {
	it("Should return the mesagem from the button function", () => {
		(button_test as vi.Mock).mockReturnValue("It works");

		const result = button_test();

		expect(result).toBe("It works");
		expect(button_test).toHaveBeenCalledOnce();
	});
});
