import { WeightConverter } from './unitConverters/WeightConverter.js'
import { SpeedConverter } from './unitConverters/SpeedConverter.js'
import { TemperatureConverter } from './unitConverters/TemperatureConverter.js'

/** Class representing a converter. */
export class Converter {
  #value = 0
  #converters = {}
  #numberOfDecimals = 2
  #returnString = false
  #showCalculation = false
  /** An object mapping the units to the correct converter. */
  #unitMap = {}

  /**
   *
   */
  constructor () {
    const converterInstances = [
      new WeightConverter(),
      new SpeedConverter(),
      new TemperatureConverter()
    ]
    this.#mapConverters(converterInstances)
  }

  /**
   *
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
      converter.getUnitTypes().forEach((unit) => {
        this.#unitMap[unit] = unitType
      })
    })
  }

  /** Sets the number to convert.
   *
   * @param {number} value - The number to convert
   * @returns {object} - The object to chain
   */
  setValue (value) {
    if (!Number(value)) {
      throw new Error('Value needs to be a number')
    }
    this.#value = value
    return this
  }

  /** Passes the units to convert to the correct converter.
   *
   * @param {string} fromUnit - The unit to convert from.
   * @param {string} toUnit - The unit to convert to.
   * @returns {number} - The converted number.
   */
  convert (fromUnit, toUnit) {
    if (typeof fromUnit !== 'string' || typeof toUnit !== 'string') {
      throw new Error('units needs to be strings, Ex "kg" or "lbs"')
    }
    const fromType = this.#unitMap[fromUnit]
    const toType = this.#unitMap[toUnit]

    if (fromType !== toType) {
      throw new Error(`Cannot convert between ${fromUnit} and ${toUnit}`)
    }

    const converter = this.#converters[fromType]
    const standardValue = converter.toStandardUnit(this.#value, fromUnit)
    const result = this.#checkDecimals(converter.fromStandardUnit(standardValue, toUnit))
    if (this.#returnString) {
      return converter.toString(result, toUnit)
    } else if (this.#showCalculation) {
      return converter.getCalculationSteps(result, toUnit)
    } else {
      return result
    }
  }

  /** Sets the amount of decimals.
   *
   * @param {number} decimals - The number of decimals.
   * @returns {object} - The object to chain
   */
  setDecimals (decimals) {
    if (decimals >= 0) {
      this.#numberOfDecimals = decimals
    } else if (!Number(decimals) || decimals < 0) {
      throw new Error('decimals need to be an integer')
    }
    return this
  }

  /** Gets the number of decimals the converter is set to.
   *
   * @returns {number} - The number of decimals the converter is set to.
   */
  getDecimals () {
    return this.#numberOfDecimals
  }

  /** Adjust the decimals of the number.
   *
   * @param {number} number - The number to adjust.
   * @returns {number} The adjusted number.
   */
  #checkDecimals (number) {
    if (!Number(number)) {
      throw new Error('Number needs to be a number')
    }
    if (number === 0) {
      return number
    }
    if (number < 1) {
      return number
    }
    const isNegative = number < 0
    const absoluteNumber = Math.abs(number)

    const correctNumber = absoluteNumber.toFixed(this.#numberOfDecimals)

    return isNegative ? -Number(correctNumber) : Number(correctNumber)
  }

  /** Determins if the return value should be a string.
   *
   * @param {boolean} boolean - The boolean to determine if the return value should be a string.
   */
  stringMode (boolean) {
    if (boolean === true) {
      this.#showCalculation = false
      this.#returnString = true
    } else if (boolean === false) {
      this.#returnString = false
    } else {
      throw new Error('toggleStringMode only accepts true or false')
    }
  }

  /** Determins if the calculations should be returned.
   *
   * @param {boolean} boolean - The boolean to determine if the calculations should be shown.
   */
  calculationMode (boolean) {
    if (boolean) {
      this.#returnString = false
      this.#showCalculation = true
    } else if (boolean === false) {
      this.#showCalculation = false
    } else {
      throw new Error('toggleCalculations only accepts true or false')
    }
  }

  /** Gets the units names.
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
}
