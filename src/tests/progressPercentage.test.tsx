import { describe, it, expect } from 'vitest';
import { getProgressPercentage } from '../utils/progressPercentage';

describe('getProgressPercentage', () => {
  it('calcula corretamente a porcentagem', () => {
    expect(getProgressPercentage(3, 6)).toBe(50);
  });

  it('retorna 0 se total for 0', () => {
    expect(getProgressPercentage(2, 0)).toBe(0);
  });

  it('retorna 0 se total for negativo', () => {
    expect(getProgressPercentage(2, -5)).toBe(0);
  });

  it('lida com valores decimais corretamente', () => {
    expect(getProgressPercentage(1, 3)).toBeCloseTo(33.333, 2);
  });
});
