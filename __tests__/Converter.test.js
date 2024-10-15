import { Converter } from '../src/js/Converter.js'

describe('Converter Class', () => {
  let converter

  beforeEach(() => {
    converter = new Converter()
  })

  test('should convert weight from grams to pounds', () => {
    converter.setValue(1000)
    const result = converter.convert('g', 'lbs')
    expect(result).toBeCloseTo(2.20, 2)
  })

  test('should throw error when setting non-numeric value', () => {
    expect(() => converter.setValue('notANumber')).toThrow('Value needs to be a number')
  })

  test('should throw error when converting between different unit types', () => {
    converter.setValue(100)
    expect(() => converter.convert('kmh', 'kg')).toThrow('Cannot convert between kmh and kg')
  })

  test('should handle decimal precision correctly when changed', () => {
    converter.setValue(1000).setDecimals(3) // Change decimals to 3
    const result = converter.convert('g', 'lbs')
    expect(result).toBeCloseTo(2.205, 3) // With 3 decimals, 1000 grams should be approximately 2.204 lbs
  })

  test('should handle negative values correctly', () => {
    converter.setValue(-500) // Default decimals to 2
    const result = converter.convert('g', 'lbs')
    expect(result).toBeCloseTo(-1.10, 2) // -500 grams should be approximately -1.10 lbs
  })

  test('should return the correct number of decimals when changed', () => {
    converter.setDecimals(3)
    expect(converter.getDecimals()).toBe(3)
  })

  test('should throw error when setting negative decimals', () => {
    expect(() => converter.setDecimals(-1)).toThrow('Decimals need to be a non-negative integer')
  })

  test('should return string correctly with default decimals', () => {
    const result = converter.setValue(1000).convertToString('g', 'lbs')
    expect(result).toBe('2.2 lbs') // With default 2 decimals
  })

  test('should return calculation correctly', () => {
    const result = converter.setValue(1000).convertToCalc('g', 'lbs')
    expect(result).toContain('The result is:' && '2.2 lbs') // Check if calculation steps are included
  })

  test('should handle small values correctly with default decimals', () => {
    converter.setValue(0.005) // Default decimals to 2
    const result = converter.convert('kg', 'lbs')
    expect(result).toBeCloseTo(0.01, 2) // 0.005 kg should be approximately 0.01 lbs
  })

  test('should handle values below 1 correctly with default decimals', () => {
    converter.setValue(0.15) // Default decimals to 2
    const result = converter.convert('g', 'kg')
    expect(result).toBeCloseTo(0.0001, 5) // 150 grams should be 0.15 kg
  })
})
