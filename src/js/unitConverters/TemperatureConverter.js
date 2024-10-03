import { BaseConverter } from './BaseConverter.js'

/** Class representing a temperature converter. */
export class TemperatureConverter extends BaseConverter {
  /** The constructor.
   *
   */
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

  /** Override the toStandardUnit method to handle offset for Kelvin separately.
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

    if (unit === 'k') {
      this.calulationSteps.push(`${value} - ${unitData.offset}`)
      return value - unitData.offset
    } else if (unit === 'f') {
      this.calulationSteps.push(`${value} - ${unitData.offset} / ${unitData.ToStandardMeasurement}`)
      return (value - unitData.offset) / unitData.ToStandardMeasurement
    } else {
      this.calulationSteps.push(`${value} * ${unitData.ToStandardMeasurement}`)
      return value * unitData.ToStandardMeasurement
    }
  }

  /** Override the fromStandardUnit method to handle offset for Kelvin separately.
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

    if (unit === 'k') {
      this.calulationSteps.push(`${value} + ${unitData.offset}`)
      return value + unitData.offset
    } else if (unit === 'f') {
      this.calulationSteps.push(`(${value} * ${unitData.ToStandardMeasurement}) + ${unitData.offset}`)
      return (value * unitData.ToStandardMeasurement) + unitData.offset
    } else {
      this.calulationSteps.push(`${value} / ${unitData.ToStandardMeasurement}`)
      return value / unitData.ToStandardMeasurement
    }
  }
}
