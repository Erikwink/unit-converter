/** A Class which converts different units of messurment.
 *
 */
export class Converter {
  #standardWeightKilos = 0
  #originalWeight = 0
  #numberOfDecimals = 0

  #conversionStarted = false
  #calculationString = ''

  // flags
  #returnString = false
  #showCalculation = false

  #numberConvertedToStandardMessure
  #numberToConvert = 0
  #speedUnits = {
    kmh: {
      name: 'kmh',
      toStandardMessure: 1
    },
    mph: {
      name: 'mph',
      toStandardMessure: 1 * 1.609344
    },
    knots: {
      name: 'knots',
      toStandardMessure: 1 * 1.85200
    },
    ms: {
      name: 'ms',
      toStandardMessure: 1 * 3.6
    }
  }

  #weightUnits = {
    kg: {
      name: 'kg',
      toStandardMessure: 1
    },
    g: {
      name: 'g',
      toStandardMessure: 1 / 1000
    },
    lbs: {
      name: 'lbs',
      toStandardMessure: 1 * 0.45359237
    },
    oz: {
      name: 'oz',
      toStandardMessure: 1 / 35.2739619
    }

  }

  /** Constructor.
   *
   */
  constructor () {

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

  /** Gets the amount of decimals the converter is set to.
   *
   * @returns The amount of decimals the converter is set to.
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

  /** Set the starting weight for the Conversion
   *
   * @param {number} weight
   * @returns {object} - this object for chaning to work.
   */
  setWeight (weight) {
    if (!Number(weight) || weight < 0) {
      throw new Error('Weight must be a number bigger then 0')
    }
    this.#originalWeight = weight
    return this
  }

  /** Determins which unit to convert from.
   *
   * @param {string} unit - The unit of messurement.
   * @returns {object} - The class to make chaining avalable.
   */
  from (unit) {
    if (typeof unit !== 'string') {
      throw new Error('from(string) please enter a string')
    }
    if (this.#originalWeight <= 0) {
      throw new Error('Please set a weight before perfoming a conversion')
    }
    this.#conversionStarted = true
    switch (unit) {
      case 'kg':
        this.#standardWeightKilos = this.#originalWeight
        return this
      case 'g':
        this.#standardWeightKilos = this.#originalWeight / 1000
        return this
      case 'lbs':
        this.#standardWeightKilos = this.#originalWeight * 0.45359237
        return this
      case 'oz':
        this.#standardWeightKilos = this.#originalWeight / 35.2739619
        return this
      default:
        throw new Error('from(unit) must be a string, kg, g, lbs, oz')
    }
  }

  /** Determins which unit to convert to.
   *
   * @param {string} unit - The unit of messurement.
   * @returns {number} - The converted number.
   */
  to (unit) {
    if (typeof unit !== 'string') {
      throw new Error('to(string) please enter a string')
    }
    if (!this.#conversionStarted) {
      throw new Error('You need to call from() before to()')
    }
    this.#conversionStarted = false
    let result
    switch (unit) {
      case 'kg':
        result = this.#checkDecimals(this.#standardWeightKilos)
        return result
      case 'g':
        result = this.#checkDecimals(this.#standardWeightKilos * 1000)
        return result
      case 'lbs':

        result = this.#checkDecimals(this.#standardWeightKilos / 0.45359237)
        return result
      case 'oz':
        result = this.#checkDecimals(this.#standardWeightKilos * 35.2739619)
        return result
      default:
        throw new Error('to(unit) must be a string, kg, g, lbs, oz')
    }
  }

  /**
   *
   * @param number
   */
  setNumber (number) {
    this.#numberToConvert = number
    return this
  }

  /**
   *
   * @param unit
   */
  testFrom (unit) {
    this.#conversionStarted = true

    if (unit = this.#speedUnits[unit] || (unit = this.#weightUnits[unit])) {
      if (this.#showCalculation) {
        this.#calculationString = ''
        this.#calculationString = this.#calculationString.concat(this.#numberToConvert, unit.name, ' * ', unit.toStandardMessure, ' =')
      }
      this.#numberConvertedToStandardMessure = this.#numberToConvert * unit.toStandardMessure

      return this
    }
  }

  /**
   *
   * @param unit
   */
  testTo (unit) {
    if (!this.#conversionStarted) {
      this.#conversionStarted = false
      throw new Error('must call from before to')
    }
    if (unit = this.#speedUnits[unit] || (unit = this.#weightUnits[unit])) {
      let result = this.#checkDecimals(this.#numberConvertedToStandardMessure / unit.toStandardMessure)
      if (this.#returnString) {
        return result = `${result} ${unit.name}`
      } else if (this.#showCalculation) {
        this.#calculationString = this.#calculationString.concat('\n', this.#numberConvertedToStandardMessure, ' / ', unit.toStandardMessure, ' =\n', result, unit.name)
        return this.#calculationString
      } else {
        return result
      }
    }
  }

  /**
   *
   */
  #createCalculationString () {

  }

  /**
   *
   */
  returnString () {
    if (this.#returnString) {
      this.#returnString = false
    } else {
      this.#showCalculation = false
      this.#returnString = true
    }
    return this.#returnString
  }

  /**
   *
   */
  showCalculations () {
    if (this.#showCalculation) {
      this.#showCalculation = false
    } else {
      this.#returnString = false
      this.#showCalculation = true
    }
    return this.#showCalculation
  }

  /** Returns the avaliable units.
   *
   * @returns {string} - A string explaining the units avaliable for use.
   */
  showUnits () {
    // appenda whitespace mellan varje key????????????
    return (`Units avaliable for conversion are ${Object.keys(this.#weightUnits)} and ${Object.keys(this.#speedUnits)}`)
  }

  // hur bryta ut omvandligen för att applicera på fler olika mått???

  // kilometer to miles
  // miles to kilometer

  // showcalculations? olika flaggor som gör så att man får string tillbaka eller uträkning eller number
}
