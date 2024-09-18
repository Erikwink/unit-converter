/** A Class which converts different units of messurment.
 *
 */
export class Converter {
  /** Constructor.
   *
   */
  constructor () {

  }

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

  /** Converts Pounds to kilos
   *
   * @param {number} poundsToConvert - Pounds to convert to kilos.
   * @throws {Error} - If the argument is not a number.
   * @returns {Number}- The number convertet to kilos.
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

  // aounces to ?
  // ? to aounces

  // kilometer to miles
  // miles to kilometer

  // showcalculations?
  // import {} if using ecma script module, otherwise?
}
