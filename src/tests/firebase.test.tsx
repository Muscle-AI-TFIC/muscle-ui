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

});