/* eslint-disable jsdoc/require-param */
/* eslint-disable jsdoc/require-param-description */
/* eslint-disable jsdoc/require-description */
/* eslint-disable jsdoc/require-jsdoc */
import { WeightConverter } from './unitConverters/WeightConverter.js'
import { SpeedConverter } from './unitConverters/SpeedConverter.js'
import { TemperatureConverter } from './unitConverters/TemperatureConverter.js'
const DEFAULT_DECIMALS = 2

export class Converter {
  #value = 0
  #converters = {}
  #numberOfDecimals = DEFAULT_DECIMALS
  /** An object mapping the units to the correct converter. */
  #unitMap = {}

  constructor () {
    const converterInstances = [
      new WeightConverter(),
      new SpeedConverter(),
      new TemperatureConverter()
    ]
    this.#mapConverters(converterInstances)
  }

  /**
   * @param {object} converterInstances
   */
  #mapConverters (converterInstances) {
    converterInstances.forEach((converter) => {
      const unitType = converter.getUnitNames()

      if (this.#converters[unitType]) {
        throw new Error(`Duplicate unit type: ${unitType}`)
      }
      // Store the converter by its type
      this.#converters[unitType] = converter
      // Map the units to the correct converter
      this.#mapUnits(converter, unitType)
    })
  }

  #mapUnits (converter, unitType) {
    converter.getUnitTypes().forEach((unit) => {
      this.#unitMap[unit] = unitType
    })
  }

  /**
   * @param {number} value
   * @returns {object} - The object to chain
   */
  setValue (value) {
    this.#validateNumber(value)
    this.#value = value
    return this
  }

  /**
   * @param {string} fromUnit
   * @param {string} toUnit
   * @returns {number} - The converted number.
   */
  convert (fromUnit, toUnit) {
    const converter = this.#getCorrectConverter(fromUnit, toUnit)
    const standardValue = converter._toStandardUnit(this.#value, fromUnit)
    return this.#adjustDecimals(converter._fromStandardUnit(standardValue, toUnit))
  }

  /**
   * @param {string} fromUnit
   * @param {string} toUnit
   * @returns {string} - The converted value as a string.
   */
  convertToString (fromUnit, toUnit) {
    const converter = this.#getCorrectConverter(fromUnit, toUnit)
    const result = this.convert(fromUnit, toUnit)
    return converter.toString(result, toUnit)
  }

  /**
   * @param {string} fromUnit
   * @param {string} toUnit
   * @returns {string} - The steps of the calculation as a string.
   */
  convertToCalc (fromUnit, toUnit) {
    const converter = this.#getCorrectConverter(fromUnit, toUnit)
    const result = this.convert(fromUnit, toUnit)
    return converter.getCalculationSteps(result, toUnit)
  }

  /**
   * @param {string} fromUnit
   * @param {string} toUnit
   * @returns {object} - The correct converter object.
   */
  #getCorrectConverter (fromUnit, toUnit) {
    if (typeof fromUnit !== 'string' || typeof toUnit !== 'string') {
      throw new Error('Units need to be strings, e.g., "kg" or "lbs".')
    }
    const fromType = this.#unitMap[fromUnit]
    const toType = this.#unitMap[toUnit]
    if (!fromType) {
      throw new Error(`Unsupported unit: ${fromUnit}. Please provide a valid unit.`)
    }
    if (!toType) {
      throw new Error(`Unsupported unit: ${toUnit}. Please provide a valid unit.`)
    }
    if (fromType !== toType) {
      throw new Error(`Cannot convert between ${fromUnit} and ${toUnit}`)
    }
    return this.#converters[fromType]
  }

  /**
   * @param {number} decimals - The number of decimals.
   * @returns {object} - The object to chain
   */
  setDecimals (decimals) {
    if (typeof decimals !== 'number' || decimals < 0 || !Number.isInteger(decimals)) {
      throw new Error('Decimals need to be a non-negative integer')
    }
    this.#numberOfDecimals = decimals
    return this
  }

  getDecimals () {
    return this.#numberOfDecimals
  }

  /**
   * @param {number} number - The number to adjust.
   * @returns {number} The adjusted number.
   */
  #adjustDecimals (number) {
    this.#validateNumber(number)
    if (number === 0 || number < 1) {
      return number
    }
    const isNegative = number < 0
    const correctNumber = this.#getAbsouluteNumber(number).toFixed(this.#numberOfDecimals)

    return isNegative ? -Number(correctNumber) : Number(correctNumber)
  }

  #getAbsouluteNumber (number) {
    return Math.abs(number)
  }

  /** Gets the units possible for conversion.
   *
   * @returns {object} - An object with the units names.
   */
  getUnits () {
    const units = {}
    for (const [unit, type] of Object.entries(this.#unitMap)) {
      if (!units[type]) {
        units[type] = []
      }
      units[type].push(unit)
    }
    return units
  }

  /**
   * @throws {Error} - If not a number.
   */
  #validateNumber (number) {
    if (Number.isNaN(number) || typeof number !== 'number') {
      throw new Error('Please enter a number')
    }
  }
}
