import { describe, it, expect } from 'vitest';
import { getFirebaseErrorMessage } from '@/services/firebase';

describe('Firebase Service - getFirebaseErrorMessage', () => {

  it('should return the correct message for a known error code (auth/weak-password)', () => {
    const errorCode = 'auth/weak-password';
    const expectedMessage = 'Password is too weak';

    const result = getFirebaseErrorMessage(errorCode);

    expect(result).toBe(expectedMessage);
  });

  it('should return the correct message for another known error code (auth/email-already-in-use)', () => {
    const errorCode = 'auth/email-already-in-use';
    const result = getFirebaseErrorMessage(errorCode);
    expect(result).toBe('This email is already in use');
  });

  it('should return the correct message for a Firestore error code (firestore/permission-denied)', () => {
    const errorCode = 'firestore/permission-denied';
    const result = getFirebaseErrorMessage(errorCode);
    expect(result).toBe('Permission error. Please check your Firestore rules');
  });

  it('should return the default error message for an unknown code', () => {
    const errorCode = 'auth/some-non-existent-error';
    const expectedDefaultMessage = 'Error creating account. Please try again';

    const result = getFirebaseErrorMessage(errorCode);

    expect(result).toBe(expectedDefaultMessage);
  });

  it('should return the default error message if the code is an empty string', () => {
    const errorCode = '';
    const result = getFirebaseErrorMessage(errorCode);
    expect(result).toBe('Error creating account. Please try again');
  });

  it("should return correct message for known code (auth/weak-password)", () => {
    expect(getFirebaseErrorMessage("auth/weak-password")).toBe("Password is too weak");
  });

  it("should return correct message for known code (auth/email-already-in-use)", () => {
    expect(getFirebaseErrorMessage("auth/email-already-in-use")).toBe("This email is already in use");
  });

  it("should return correct message for Firestore code (firestore/permission-denied)", () => {
    expect(getFirebaseErrorMessage("firestore/permission-denied")).toBe(
      "Permission error. Please check your Firestore rules"
    );
  });

  it("should return default message for unknown code", () => {
    expect(getFirebaseErrorMessage("auth/does-not-exist")).toBe("Error creating account. Please try again");
  });

  it("should return default message for empty string", () => {
    expect(getFirebaseErrorMessage("")).toBe("Error creating account. Please try again");
  });

  it("should return default message for null input", () => {
    expect(getFirebaseErrorMessage(null as unknown as string)).toBe("Error creating account. Please try again");
  });

  it("should return default message for undefined input", () => {
    expect(getFirebaseErrorMessage(undefined as unknown as string)).toBe("Error creating account. Please try again");
  });

  it("should handle unexpected non-string input (number)", () => {
    expect(getFirebaseErrorMessage(123 as unknown as string)).toBe("Error creating account. Please try again");
  });

  it("should handle unexpected non-string input (object)", () => {
    expect(getFirebaseErrorMessage({} as unknown as string)).toBe("Error creating account. Please try again");
  });
});