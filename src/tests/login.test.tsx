import { describe, it, expect, vi, beforeEach } from "vitest";
import { submitLogin, LoginInfos } from "@/services/login";
import { auth } from "@/services/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

vi.mock("firebase/auth", () => ({
  signInWithEmailAndPassword: vi.fn(),
}));

vi.mock("@/services/firebase", () => ({
  auth: {},
  getFirebaseErrorMessage: vi.fn((code: string) => `Erro: ${code}`),
}));

describe("submitLogin", () => {
  const mockInfos: LoginInfos = {
    email: "tobias@gmail.com",
    password: "123456",
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("Should login the user successfully", async () => {
    const mockUser = { uid: "123", email: mockInfos.email };
    (signInWithEmailAndPassword as any).mockResolvedValue({ user: mockUser });

    const result = await submitLogin(mockInfos);

    expect(signInWithEmailAndPassword).toHaveBeenCalledWith(auth, mockInfos.email, mockInfos.password);
    expect(result).toMatchObject({
      uid: "123",
      email: "tobias@gmail.com",
    });
  });

  it("Should return an error if login fails", async () => {
    const errorCode = "auth/wrong-password";
    (signInWithEmailAndPassword as any).mockRejectedValue({ code: errorCode });

    await expect(submitLogin(mockInfos)).rejects.toThrow(`Erro: ${errorCode}`);
  });
});
