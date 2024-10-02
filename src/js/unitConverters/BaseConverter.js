/** Base class for a converter */
export class BaseConverter {
  /** The constructor.
   *
   * @param {object} units - The units to convert.
   */
  constructor (units) {
    this.units = units
    this.calulationSteps = []
  }

  /** Converts the value to the standard unit.
   *
   * @param {number} value - The value to convert.
   * @param {string} unit - The unit to convert.
   * @returns {number} - The converted number.
   */
  toStandardUnit (value, unit) {
    this.calulationSteps = []
    if (!this.units[unit]) {
      throw new Error(`toStandard Unsupported unit: ${unit}`)
    }
    const result = value * this.units[unit].toStandardMessure
    this.calulationSteps.push(
      `${value} * ${this.units[unit].toStandardMessure} ${unit} = ${result} `
    )
    return result
  }

  /** Converts the value from the standard unit.
   *
   * @param {number} value - The value to convert.
   * @param {string} unit - The unit to convert.
   * @returns {number} - The converted number.
   */
  fromStandardUnit (value, unit) {
    if (!this.units[unit]) {
      throw new Error(`Unsupported unit: ${unit}`)
    }
    const result = value / this.units[unit].toStandardMessure
    this.calulationSteps.push(
      `(${value} / ${this.units[unit].toStandardMessure})`
    )
    return result
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
  getUnitNames () {
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

  /** Gets the calculation steps.
   *
   * @param {number} calculatedValue - The calculated value.
   * @param {string} unit - The unit.
   * @returns {string} - The calculation steps.
   */
  getCalculationSteps (calculatedValue, unit) {
    this.calulationSteps.push(`The result is: ${calculatedValue} ${unit}`)
    return this.calulationSteps.join('\n')
  }
}
