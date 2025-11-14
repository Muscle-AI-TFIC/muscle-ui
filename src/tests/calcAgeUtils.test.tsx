import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { calculateAge } from '../utils/calcAge';
import type { UserInfo } from '../types/UserInfo';

describe('CalculateAge', () => {
  const fixedToday = new Date('2025-11-10T00:00:00Z');

  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(fixedToday);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  const createMockUser = (overrides: Partial<UserInfo> = {}): UserInfo => ({
    id: 'user-1',
    name: 'John Doe',
    weight_kg: 75,
    height_cm: 180,
    birth_date: '2000-01-01',
    goal: 'muscle gain',
    fitness_level: 'intermediate',
    gender: 'male',
    ...overrides,
  });

  it('should return 25 years old when the birthday has already occurred in 2025', () => {
    const user = createMockUser({ birth_date: '2000-01-01' });
    const result = calculateAge(user);
    expect(result).toBe('25');
  });

  it('should return 24 years old when the birthday has not yet occurred in 2025', () => {
    const user = createMockUser({ birth_date: '2000-12-01' });
    const result = calculateAge(user);
    expect(result).toBe('24');
  });

  it('should return 0 if the person was born today', () => {
    const user = createMockUser({ birth_date: '2025-11-10' });
    const result = calculateAge(user);
    expect(result).toBe('0');
  });

  it('should return "--" if the birth_date is undefined', () => {
    const user = createMockUser({ birth_date: undefined as unknown as string });
    const result = calculateAge(user);
    expect(result).toBe('--');
  });
});