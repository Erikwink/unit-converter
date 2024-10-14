import { BaseConverter } from '../unitConverters/BaseConverter.js'

describe('BaseConverter Validation', () => {
  test('should validate a correct units object', () => {
    const validUnits = {
      formOfUnits: 'weight',
      kg: {
        name: 'kg',
        ToStandardMeasurement: 1
      },
      lbs: {
        name: 'lbs',
        ToStandardMeasurement: 0.453592
      }
    }
    expect(() => new BaseConverter(validUnits)).not.toThrow()
  })

  test('should throw error for non-object units parameter', () => {
    const invalidUnits = null
    expect(() => new BaseConverter(invalidUnits)).toThrow('Units must be an object.')
  })

  test('should throw error for missing formOfUnits key', () => {
    const invalidUnits = {
      kg: {
        name: 'kg',
        ToStandardMeasurement: 1
      }
    }
    expect(() => new BaseConverter(invalidUnits)).toThrow('The units object must include a "formOfUnits" key as a string.')
  })

  test('should throw error if formOfUnits is not a string', () => {
    const invalidUnits = {
      formOfUnits: 123,
      kg: {
        name: 'kg',
        ToStandardMeasurement: 1
      }
    }
    expect(() => new BaseConverter(invalidUnits)).toThrow('The units object must include a "formOfUnits" key as a string.')
  })

  test('should throw error for invalid unit structure (non-object)', () => {
    const invalidUnits = {
      formOfUnits: 'weight',
      kg: 'invalidUnit'
    }
    expect(() => new BaseConverter(invalidUnits)).toThrow('Unit "kg" must be an object.')
  })

  test('should throw error for missing ToStandardMeasurement in unit', () => {
    const invalidUnits = {
      formOfUnits: 'weight',
      kg: {
        name: 'kg'
      }
    }
    expect(() => new BaseConverter(invalidUnits)).toThrow('Unit "kg" must have a valid "ToStandardMeasurement" as a number.')
  })

  test('should throw error for missing name in unit', () => {
    const invalidUnits = {
      formOfUnits: 'weight',
      kg: {
        ToStandardMeasurement: 1
      }
    }
    expect(() => new BaseConverter(invalidUnits)).toThrow('Unit "kg" must have a valid "Name" as a string.')
  })
})
