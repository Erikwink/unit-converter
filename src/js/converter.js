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
      const unitType = converter._getUnitNames()

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
    converter._getUnitTypes().forEach((unit) => {
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

  getValue () {
    return this.#value
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
    return converter._toString(result, toUnit)
  }

  /**
   * @param {string} fromUnit
   * @param {string} toUnit
   * @returns {string} - The steps of the calculation as a string.
   */
  convertToCalc (fromUnit, toUnit) {
    const converter = this.#getCorrectConverter(fromUnit, toUnit)
    const result = this.convert(fromUnit, toUnit)
    return converter._getCalculationSteps(result, toUnit)
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

  #adjustDecimals (number) {
    this.#validateNumber(number)
    const isNegative = number < 0
    const absoluteNumber = this.#getAbsoluteNumber(number)

    let decimalAdjusted = this.#applyPrecision(absoluteNumber)

    // If the result would round to 0, dynamically adjust the precision
    if (absoluteNumber < 1 && Number(decimalAdjusted) === 0) {
      decimalAdjusted = this.#adjustForSmallValues(absoluteNumber)
    }
    return isNegative ? -Number(decimalAdjusted) : Number(decimalAdjusted)
  }

  /**
   * Apply the set number of decimals to the number.
   *
   * @param {number} number - The number to apply the precision to.
   * @returns {string} The number formatted with the set decimals.
   */
  #applyPrecision (number) {
    return number.toFixed(this.#numberOfDecimals)
  }

  /**
   * Dynamically adjust the precision for small values.
   *
   * @param {number} number - The number to adjust the precision for.
   * @returns {string} The number with dynamic precision.
   */
  #adjustForSmallValues (number) {
    let dynamicPrecision = this.#numberOfDecimals
    let decimalAdjusted = number.toFixed(dynamicPrecision)

    while (Number(decimalAdjusted) === 0 && dynamicPrecision < 20) {
      dynamicPrecision++
      decimalAdjusted = number.toFixed(dynamicPrecision)
    }

    return decimalAdjusted
  }

  #getAbsoluteNumber (number) {
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
