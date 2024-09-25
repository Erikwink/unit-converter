/** Class representing a base converter. */
export class BaseConverter {
  /** The constructor.
   *
   * @param {object} units - The units to convert.
   */
  constructor (units) {
    this.units = units
  }

  /** Converts the value to the standard unit.
   *
   * @param {number} value - The value to convert.
   * @param {string} unit - The unit to convert.
   * @returns {number} - The converted number.
   */
  toStandard (value, unit) {
    if (!this.units[unit]) {
      throw new Error(`toStandard Unsupported unit: ${unit}`)
    }
    console.log(value, '*', this.units[unit].toStandardMessure)
    return value * this.units[unit].toStandardMessure // Omvandla till standardenheten
  }

  /** Converts the value from the standard unit.
   *
   * @param {number} value - The value to convert.
   * @param {string} unit - The unit to convert.
   * @returns {number} - The converted number.
   */
  fromStandard (value, unit) {
    if (!this.units[unit]) {
      throw new Error(`Unsupported unit: ${unit}`)
    }
    console.log(value, '/', this.units[unit].toStandardMessure)
    return value / this.units[unit].toStandardMessure // Omvandla från standardenhet till enhet
  }

  /** Gets the units names.
   *
   *@returns {string} - The names of the units.
   */
  getUnitTypes () {
    return Object.keys(this.units).filter((key) => key !== 'formOfUnits')
  }

  /** Gets the name of the units.
   *
   * @returns {string} - The name of the unit.
   */
  getUnitsName () {
    return this.units.formOfUnits
  }

  /** Returns the value and unit as a string.
   *
   * @param {number}value - The conveterd value.
   * @param {string} unit - The unit converted to.
   * @returns {string} - The value and unit as a string.
   */
  toString (value, unit) {
    return `${value} ${unit}`
  }
}
