import { BaseConverter } from './BaseConverter.js'

/** Class representing a temperature converter. */
export class TemperatureConverter extends BaseConverter {
  /** The constructor.
   *
   */
  constructor () {
    super({
      formOfUnits: 'temperature',
      celsius: {
        name: 'celsius',
        toStandardMessure: 1,
        offset: 0
      },
      fahrenheit: {
        name: 'fahrenheit',
        toStandardMessure: 1.8,
        offset: 32
      },
      kelvin: {
        name: 'kelvin',
        toStandardMessure: 1,
        offset: 273.15
      }
    })
  }

  /** Override the toStandard method to handle Kelvin separately.
   *
   * @param {number} value - The value to convert.
   * @param {string} unit - The unit to convert.
   * @returns {number} - The converted number.
   */
  toStandardUnit (value, unit) {
    this.calulationSteps = []
    const unitData = this.units[unit]
    if (!unitData) {
      throw new Error(`Unsupported unit: ${unit}`)
    }

    if (unit === 'kelvin') {
      this.calulationSteps.push(`${value} - ${unitData.offset}`)
      return value - unitData.offset
    } else if (unit === 'fahrenheit') {
      this.calulationSteps.push(`${value} - ${unitData.offset} / ${unitData.toStandardMessure}`)
      return (value - unitData.offset) / unitData.toStandardMessure
    } else {
      this.calulationSteps.push(`${value} * ${unitData.toStandardMessure}`)
      return value * unitData.toStandardMessure
    }
  }

  /** Override the fromStandard method to handle Kelvin separately.
   *
   * @param {number} value - The value to convert.
   * @param {string} unit - The unit to convert.
   * @returns {number} - The converted number.
   */
  fromStandardUnit (value, unit) {
    const unitData = this.units[unit]
    if (!unitData) {
      throw new Error(`Unsupported unit: ${unit}`)
    }

    if (unit === 'kelvin') {
      this.calulationSteps.push(`${value} + ${unitData.offset}`)
      return value + unitData.offset
    } else if (unit === 'fahrenheit') {
      this.calulationSteps.push(`(${value} * ${unitData.toStandardMessure}) + ${unitData.offset}`)
      return (value * unitData.toStandardMessure) + unitData.offset
    } else {
      this.calulationSteps.push(`${value} / ${unitData.toStandardMessure}`)
      return value / unitData.toStandardMessure
    }
  }
}
