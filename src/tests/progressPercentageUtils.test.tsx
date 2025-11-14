import { describe, it, expect } from 'vitest';
import { getProgressPercentage } from '../utils/progressPercentage';

describe('getProgressPercentage', () => {
    it('should return 50 when completed is half of total', () => {
    expect(getProgressPercentage(3, 6)).toBe(50);
  });

  it('should return 0 when total is 0', () => {
    expect(getProgressPercentage(2, 0)).toBe(0);
  });

  it('should return 0 when total is negative', () => {
    expect(getProgressPercentage(2, -5)).toBe(0);
  });
  
  it('should handle decimal results correctly', () => {
    expect(getProgressPercentage(1, 3)).toBeCloseTo(33.333, 2);
  });

});