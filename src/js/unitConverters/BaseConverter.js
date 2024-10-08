/* eslint-disable jsdoc/require-description */
/* eslint-disable jsdoc/require-param */
/* eslint-disable jsdoc/require-jsdoc */
/** Base class for a converter */
export class BaseConverter {
  #calculationSteps = []
  /** The constructor.
   *
   * @param {object} units - The units to convert.
   */
  constructor (units) {
    this.#validateConverter(units)
    this.units = units
  }

  /**
   * @throws {Error} If units doesn't follow the correct pattern.
   */
  #validateConverter (units) {
    if (typeof units !== 'object' || units === null) {
      throw new Error('Units must be an object.')
    }
    if (!units.formOfUnits || typeof units.formOfUnits !== 'string') {
      throw new Error('The units object must include a "formOfUnits" key as a string.')
    }
    for (const [key, value] of Object.entries(units)) {
      if (key === 'formOfUnits') continue
      if (typeof value !== 'object' || value === null) {
        throw new Error(`Unit "${key}" must be an object.`)
      }
      if (typeof value.ToStandardMeasurement !== 'number') {
        throw new Error(`Unit "${key}" must have a valid "ToStandardMeasurement" as a number.`)
      }
      if (typeof value.name !== 'string') {
        throw new Error(`Unit "${key}" must have a valid "Name" as a string.`)
      }
    }
  }

  _validateUnit (unit) {
    if (!this.units[unit]) {
      throw new Error(`toStandard Unsupported unit: ${unit}`)
    }
  }

  _resetCalculationSteps () {
    this.#calculationSteps = []
  }

  /** Converts the value to the standard unit.
   *
   * @param {number} value - The value to convert.
   * @param {string} unit - The unit to convert.
   * @returns {number} - The converted number.
   */
  _toStandardUnit (value, unit) {
    this._validateUnit(unit)
    this._resetCalculationSteps()

    const result = value * this.units[unit].ToStandardMeasurement
    this._pushCalculationStep(
      `${value} * ${this.units[unit].ToStandardMeasurement} ${unit} = ${result} `
    )
    return result
  }

  _pushCalculationStep (step) {
    this.#calculationSteps.push(step)
  }

  /** Converts the value from the standard unit.
   *
   * @param {number} value - The value to convert.
   * @param {string} unit - The unit to convert.
   * @returns {number} - The converted number.
   */
  _fromStandardUnit (value, unit) {
    this._validateUnit(unit)
    const result = value / this.units[unit].ToStandardMeasurement
    this._pushCalculationStep(
      `(${value} / ${this.units[unit].ToStandardMeasurement} = ${result})`
    )
    return result
  }

  /** Gets the units names.
   *
   *@returns {string} - The names of the units.
   */
  getUnitTypes () {
    return this.#getFilteredObjectKeys('formOfUnits')
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
    this._pushCalculationStep(`The result is: ${calculatedValue} ${unit}`)
    return this.#calculationSteps.join('\n')
  }

  /**
   * Filters out a specific key from the unit object keys.
   *
   * @param {string} excludeKey - The key to exclude.
   * @returns {Array} - The filtered keys.
   */
  #getFilteredObjectKeys (excludeKey) {
    return Object.keys(this.units).filter((key) => key !== excludeKey)
  }
}
