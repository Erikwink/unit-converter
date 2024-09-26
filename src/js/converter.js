import { WeightConverter } from './unitConverters/WeightConverter.js'
import { SpeedConverter } from './unitConverters/SpeedConverter.js'
import { TemperatureConverter } from './unitConverters/temperatureConverter.js'

// TODOS
// 6. decimals when number is negative
// 7. naming???
// 9. när man skapar en ny converter måste objektet heta samma som name i convertern

/** Class representing a converter. */
export class Converter {
  /** The value to convert. */
  #value = 0
  /** An object mapping the units to the correct converter. */
  #unitMap = {}
  /** An object with the converters. */
  #converters = {}
  /** The number of decimals to display. */
  #numberOfDecimals = 2

  // flags
  // AVRUNDNING I DECIAMLER? 0.5
  #returnString = false
  #showCalculation = false
  /** The constructor.
   *
   */
  constructor () {
    const converterInstances = [
      new WeightConverter(),
      new SpeedConverter(),
      new TemperatureConverter()
    ]
    // Build unitMap and converters dynamically
    converterInstances.forEach((converter) => {
      const unitType = converter.getUnitsName()

      if (this.#converters[unitType]) {
        throw new Error(`Duplicate unit type: ${unitType}`)
      }
      // Store the converter by its type
      this.#converters[unitType] = converter

      // Map each unit to its type (e.g., kg -> "weight")
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
   * @param {string} fromUnit - The unit t oconvert from.
   * @param {string} toUnit - The unit to convert to.
   * @returns {number} - The converted number.
   */
  convert (fromUnit, toUnit) {
    if (typeof fromUnit !== 'string' || typeof toUnit !== 'string') {
      throw new Error('units needs to be strings, Ex "kg" or "lbs"')
    }
    const fromType = this.#unitMap[fromUnit]
    const toType = this.#unitMap[toUnit]

    // Check if both units are handled by the same converter type
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
   */
  setDecimals (decimals) {
    if (decimals >= 0) {
      this.#numberOfDecimals = decimals
    } else if (!Number(decimals) || decimals < 0) {
      throw new Error('decimals need to be an integer')
    }
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
    if (this.#numberOfDecimals === 0 && number >= 1) {
      // check if the number is 0,5 or bigger than return math floor or math ceil???????
      return Math.floor(number)
    }

    const numberStr = number.toString()
    const decimalIndex = numberStr.indexOf('.')

    // If no decimal retun number
    if (decimalIndex === -1) {
      return number
    }

    // Check for zeros after decimal
    let firstNonZeroIndex = decimalIndex + 1
    while (numberStr[firstNonZeroIndex] === '0' && firstNonZeroIndex < numberStr.length) {
      firstNonZeroIndex++
    }

    // Calculate decimals
    let decimalsNeeded = firstNonZeroIndex - decimalIndex

    // If integers found, decimalsNeeded = 1
    if (decimalsNeeded === numberStr.length) {
      decimalsNeeded = 1
    }

    if (this.#numberOfDecimals === 0 && number < 1) {
      const factor = Math.pow(10, decimalsNeeded)
      return Math.floor(number * factor) / factor
    }

    // If numberOfDecimals are null, set to 2
    const decimalsSetByUser = this.#numberOfDecimals || 2

    // Check if decimalsNeeded are greater than decimalsSetByUser
    const finalDecimals = Math.max(decimalsNeeded, decimalsSetByUser)

    // Factor the number to remove decimals
    const factor = Math.pow(10, finalDecimals)
    return Math.floor(number * factor) / factor
  }

  /** Determins if the return value should be a string.
   *
   * @param {boolean} boolean - The boolean to determine if the return value should be a string.
   */
  toggleStringMode (boolean) {
    if (boolean === true) {
      this.#showCalculation = false
      this.#returnString = true
    } else if (boolean === false) {
      this.#returnString = false
    } else {
      throw new Error('toggleStringMode only accepts true or false')
    }
  }

  /** Determins if the calculations should be shown.
   *
   * @param {boolean} boolean - The boolean to determine if the calculations should be shown.
   */
  toggleShowCalculations (boolean) {
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
