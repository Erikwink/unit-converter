import { WeightConverter } from './units/WeightConverter.js'
import { SpeedConverter } from './units/SpeedConverter.js'
import { TemperatureConverter } from './units/temperatureConverter.js'

// TODOS
// 1. Add flags for returnString and showCalculation
// 2. Add error handling for decimals
// 3. Add error handling for units that are not handled by the same converter
// 4. RETURN this for value to able chaining
// 5. lowercase uppercase in names in converters??
// 6. decimals when number is negative

/** Class representing a converter. */
export class NewConverter {
  #value
  #unitMap = {}
  #converters = {}
  #numberOfDecimals

  // flags
  // TODOD flags
  // AVRUNDNING I DECIAMLER? 0.5
  #returnString
  #showCalculation
  /** The constructor.
   *
   */
  constructor () {
    const converterInstances = [
      new WeightConverter(),
      new SpeedConverter(),
      new TemperatureConverter()
    ]
    // TODO error ifall flera heter samma??
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
    this.#value = value
    return this
  }

  /** Passes the units to convert to the correct converter.
   *
   * @param {string} from - The unit t oconvert from.
   * @param {string} to - The unit to convert to.
   * @returns {number} - The converted number.
   */
  convert (from, to) {
    const fromType = this.#unitMap[from]
    const toType = this.#unitMap[to]

    // Check if both units are handled by the same converter type
    if (fromType !== toType) {
      throw new Error(`Cannot convert between ${from} and ${to}`)
    }

    const converter = this.#converters[fromType]
    const standardValue = converter.toStandard(this.#value, from)
    return this.#checkDecimals(converter.fromStandard(standardValue, to))
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
}
