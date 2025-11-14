import { button_test } from "@/components/Button/Button"
import { vi, describe, it, expect } from "vitest"
import React from "react";

vi.mock("@/components/Button/Button", () => ({
  button_test: vi.fn()
}))

describe("It thest if the function fom the button has benn called", () =>{
  it("Should return the mesagem from the button function", () => {
    (button_test as any).mockReturnValue("It works");

    const result = button_test();

    expect(result).toBe("It works")
    expect(button_test).toHaveBeenCalledOnce()
  })
})