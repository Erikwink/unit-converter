/** A Class which converts different units of messurment.
 *
 */
export class Converter {
  #standardWeightKilos = 0
  #originalWeight = 0

  /** Constructor.
   *
   */
  constructor () {

  }


  setWeight(weight) {
    this.#originalWeight = weight
    return this
  
  }

  // nollställa all vikter till ett mått för att kunna bryta ut funktoner och göra grams till vad som???
  /**
   *
   * @param unit
   * @param weight
   */
  from (unit) {
    if(typeof unit !== 'string'){
        throw new Error('from(string) please enter a string')
    }
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

  /**
   *
   * @param unit
   */
  to (unit) {
    if(typeof unit !== 'string'){
        throw new Error('to(string) please enter a string')
    }
    switch (unit) {
      case 'kg':
        return this.#standardWeightKilos
      case 'g':
        return this.#standardWeightKilos * 1000
      case 'lbs':

        return this.#standardWeightKilos / 0.45359237
      case 'oz':

        return this.#standardWeightKilos * 35.2739619
      default:
        throw new Error('to(unit) must be a string, kg, g, lbs, oz')
    }
  }

  /**
   *
   * @param grams
   */
  fromGrams (grams) {
    if (!Number.isInteger(grams)) {
      throw new Error('Please enter a number!')
    }
    this.#standardWeightKilos = grams / 1000

    return this
  }

  /**
   *
   */
  toPounds () {
    const pounds = this.#standardWeightKilos / 0.45359237
    this.#resetKilos()
    return pounds
  }

  /**
   *
   */
  toOunces () {
    const ounces = this.#standardWeightKilos * 35.2739619
    this.#resetKilos()
    return ounces
  }

  /**
   *
   */
  #resetKilos () {
    this.#standardWeightKilos = 0
  }

  // kilometer to miles
  // miles to kilometer

  // showcalculations?
  // show lbs, and grams?? breakout to module? blackbox?
  // import {} if using ecma script module, otherwise?

  /** Converts farenheight to celsius.
   *
   * @param {number} fahrenheitToConvert - Fahrenheit to convert to celsius.
   * @throws {Error} - If the argument is not a number.
   * @returns {number} The number convertet to celsius.
   */
  fahrenheitToCelsius (fahrenheitToConvert) {
    // max min limit???

    if (!Number.isInteger(fahrenheitToConvert)) {
      throw new Error('Please enter a number!')
    }
    const celsius = (fahrenheitToConvert - 32) / 1.8
    return celsius
  }

  /** Converts celsius to farenheight.
   *
   * @param {number} celsiusToConvert - Celsius to convert to fahrenheit.
   * @throws {Error} - If the argument is not a number.
   * @returns {number} - The number convertet to fahrenheit.
   */
  celsiusToFahrenheit (celsiusToConvert) {
    if (!Number.isInteger(celsiusToConvert)) {
      throw new Error('Please enter a number!')
    }
    const fahrenheit = (celsiusToConvert * 1.8) + 32
    return fahrenheit
  }

  /** Converts Pounds to kilos.
   *
   * @param {number} poundsToConvert - Pounds to convert to kilos.
   * @throws {Error} - If the argument is not a number.
   * @returns {number}- The number convertet to kilos.
   */
  poundsToKilos (poundsToConvert) {
    if (!Number.isInteger(poundsToConvert)) {
      throw new Error('Please enter a number!')
    }
    const kilos = poundsToConvert * 0.45359237
    return kilos
  }

  /** Converts kilos to pounds.
   *
   * @param {number} kilosToConvert - Kilos to convert to pounds.
   * @throws {Error} - If the argument is not a number.
   * @returns {number} - The number convertet to pounds.
   */
  kilosToPounds (kilosToConvert) {
    if (!Number.isInteger(kilosToConvert)) {
      throw new Error('Please enter a number!')
    }
    const pounds = kilosToConvert / 0.45359237
    return pounds
  }

  /**
   *
   * @param ouncesToConvert
   */
  ouncesToGrams (ouncesToConvert) {
    const grams = ouncesToConvert * 28.34952
    return grams
  }

  /**
   *
   * @param gramsToConvert
   */
  gramsToOunces (gramsToConvert) {
    const ounces = gramsToConvert / 28.34952
    return ounces
  }
}
