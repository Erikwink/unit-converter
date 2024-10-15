/* eslint-disable jsdoc/require-param-description */
/* eslint-disable jsdoc/require-description */
/* eslint-disable jsdoc/require-returns-description */
/* eslint-disable jsdoc/require-jsdoc */
import { BaseConverter } from './BaseConverter.js'

export class TemperatureConverter extends BaseConverter {
  constructor () {
    super({
      formOfUnits: 'temperature',
      c: {
        name: 'c',
        ToStandardMeasurement: 1,
        offset: 0
      },
      f: {
        name: 'f',
        ToStandardMeasurement: 1.8,
        offset: 32
      },
      k: {
        name: 'k',
        ToStandardMeasurement: 1,
        offset: 273.15
      }
    })
  }

  /**
   * Overrides ToStandardUnit to handles special cases for Kelvin.
   *
   * @param {number} value
   * @param {string} unit
   * @returns {number}
   */
  _toStandardUnit (value, unit) {
    this._validateUnit(unit)
    this._resetCalculationSteps()

    if (unit === 'k') {
      return this.#convertKelvinToStandard(value, this.units[unit])
    } else if (unit === 'f') {
      return this.#convertFahrenheitToStandard(value, this.units[unit])
    } else if (unit === 'c') {
      return this.#convertCelsiusToStandard(value, this.units[unit])
    } else {
      throw new Error('Error from temperatureConverter')
    }
  }

  /**
   * Overrides fromStandardUnit to handles special cases for Kelvin.
   *
   * @param {number} value
   * @param {string} unit
   * @returns {number}
   */
  _fromStandardUnit (value, unit) {
    this._validateUnit(unit)

    if (unit === 'k') {
      return this.#convertStandardToKelvin(value, this.units[unit])
    } else if (unit === 'f') {
      return this.#convertStandardToFahrenheit(value, this.units[unit])
    } else if (unit === 'c') {
      return this.#convertStandardToCelsius(value, this.units[unit])
    } else {
      throw new Error('Error from temperatureConverter')
    }
  }

  /**
   * @param {number} value
   * @param {object} unit
   * @returns {number}
   */
  #convertKelvinToStandard (value, unit) {
    const result = value - unit.offset
    this._pushCalculationStep(`${value} - ${unit.offset} = ${result}`)
    return result
  }

  /**
   * @param {number} value
   * @param {object} unit
   * @returns {number}
   */
  #convertFahrenheitToStandard (value, unit) {
    const result = (value - unit.offset) / unit.ToStandardMeasurement
    this._pushCalculationStep(`${value} - ${unit.offset} / ${unit.ToStandardMeasurement} = ${result}`)
    return result
  }

  /**
   * @param {number} value
   * @param {object} unit
   * @returns {number}
   */
  #convertCelsiusToStandard (value, unit) {
    const result = value * unit.ToStandardMeasurement
    this._pushCalculationStep(`${value} * ${unit.ToStandardMeasurement} = ${result}`)
    return result
  }

  /**
   * @param {number} value
   * @param {object} unit
   * @returns {number}
   */
  #convertStandardToKelvin (value, unit) {
    const result = value + unit.offset
    this._pushCalculationStep(`${value} + ${unit.offset} = ${result}`)
    return result
  }

  /**
   * @param {number} value
   * @param {object} unit
   * @returns {number}
   */
  #convertStandardToFahrenheit (value, unit) {
    const result = (value * unit.ToStandardMeasurement) + unit.offset
    this._pushCalculationStep(`(${value} * ${unit.ToStandardMeasurement}) + ${unit.offset} = ${result}`)
    return result
  }

  /**
   * @param {number} value
   * @param {object} unit
   * @returns {number}
   */
  #convertStandardToCelsius (value, unit) {
    const result = value / unit.ToStandardMeasurement
    this._pushCalculationStep(`${value} / ${unit.ToStandardMeasurement} = ${result}`)
    return result
  }
}
