import { BaseConverter } from './BaseConverter.js'

/** Class representing a weight converter. */
export class WeightConverter extends BaseConverter {
  /** The constructor.
   *
   */
  constructor () {
    super({
      formOfUnits: 'weight',
      kg: {
        name: 'kg',
        ToStandardMeasurement: 1
      },
      g: {
        name: 'g',
        ToStandardMeasurement: 1 / 1000
      },
      lbs: {
        name: 'lbs',
        ToStandardMeasurement: 1 * 0.45359237
      },
      oz: {
        name: 'oz',
        ToStandardMeasurement: 1 / 35.2739619
      },
      ton: {
        name: 'ton',
        ToStandardMeasurement: 1000
      }

    }

    )
  }
}
