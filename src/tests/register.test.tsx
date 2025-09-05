import { describe, it, expect, vi, beforeEach } from "vitest";
import { submitRegistration, RegisterInfos } from "@/services/register";
import { auth } from "@/services/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { setDoc } from "firebase/firestore";

// Mock the functions from auth
vi.mock("firebase/auth", () => ({
  createUserWithEmailAndPassword: vi.fn(),
  updateProfile: vi.fn(),
}));

// Mock the functions
vi.mock("firebase/firestore", () => ({
  setDoc: vi.fn(),
  doc: vi.fn(),
}));

vi.mock("@/services/firebase", () => ({
  auth: {}, // Change auth to be an empity arr
  db: {},
  getFirebaseErrorMessage: vi.fn((code: string) => `Erro: ${code}`),
}));

describe("submitRegistration", () => {
  const mockInfos: RegisterInfos = {
    name: "Tobias",
    email: "tobias@gmail.com",
    password: "123456",
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("Should create and register the user", async () => {
    const mockUser = { uid: "123" };
    (createUserWithEmailAndPassword as any).mockResolvedValue({ user: mockUser });

    const result = await submitRegistration(mockInfos);

    expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(auth, mockInfos.email, mockInfos.password);
    expect(updateProfile).toHaveBeenCalledWith(mockUser, { displayName: "Tobias" });
    expect(setDoc).toHaveBeenCalled();
    expect(result).toMatchObject({
      uid: "123",
      name: "Tobias",
      email: "tobias@gmail.com",
    });
  });

  // Error exeption fix in the service register using this test
  it("Should return an error if registration fails", async () => {
    const errorCode = "auth/email-already-in-use";
    (createUserWithEmailAndPassword as any).mockRejectedValue({ code: errorCode });

    await expect(submitRegistration(mockInfos)).rejects.toThrow(`Erro: ${errorCode}`);
  });
});
