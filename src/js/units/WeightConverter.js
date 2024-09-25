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
      },
      ton: {
        name: 'ton',
        toStandardMessure: 1000
      }

    }

    )
  }
}
