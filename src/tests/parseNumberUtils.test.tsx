import { describe, it, expect } from 'vitest'
import { parseNumber } from '../utils/parseNumber'

describe('parseNumber', () => {
  it('should return 0 for falsy values', () => {
    expect(parseNumber('')).toBe(0)
    expect(parseNumber(null)).toBe(0)
    expect(parseNumber(undefined)).toBe(0)
    expect(parseNumber(0)).toBe(0)
    expect(parseNumber(false)).toBe(0)
  })

  it('should convert valid numbers correctly', () => {
    expect(parseNumber(42)).toBe(42)
    expect(parseNumber('42')).toBe(42)
    expect(parseNumber('3.14')).toBe(3.14)
    expect(parseNumber('-15')).toBe(-15)
  })

  it('should replace comma with dot for decimal numbers', () => {
    expect(parseNumber('3,14')).toBe(3.14)
    expect(parseNumber('100,5')).toBe(100.5)
    expect(parseNumber('-7,8')).toBe(-7.8)
    expect(parseNumber('0,001')).toBe(0.001)
  })

  it('should return 0 for invalid numbers', () => {
    expect(parseNumber('abc')).toBe(0)
    expect(parseNumber('12a34')).toBe(0)
    expect(parseNumber('--10')).toBe(0)
    expect(parseNumber('1.2.3')).toBe(0)
  })
})