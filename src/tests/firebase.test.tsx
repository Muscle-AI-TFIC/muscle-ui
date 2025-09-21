import { describe, it, expect } from 'vitest';
import { getFirebaseErrorMessage } from '@/services/firebase';

describe('Firebase Service - getFirebaseErrorMessage', () => {
  it.each([
    ['auth/weak-password', 'Password is too weak'],
    ['auth/email-already-in-use', 'This email is already in use'],
    ['firestore/permission-denied', 'Permission error. Please check your Firestore rules'],
    ['auth/some-non-existent-error', 'Error creating account. Please try again'],
    ['', 'Error creating account. Please try again'],
  ])('should return "%s" mapped to "%s"', (errorCode, expectedMessage) => {
    const result = getFirebaseErrorMessage(errorCode);
    expect(result).toBe(expectedMessage);
  });
});
