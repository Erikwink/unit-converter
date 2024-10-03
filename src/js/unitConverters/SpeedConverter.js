import { BaseConverter } from './BaseConverter.js'

/** Class representing a speed converter */
export class SpeedConverter extends BaseConverter {
  /** The constructor.
   *
   */
  constructor () {
    super({
      formOfUnits: 'speed',
      kmh: {
        name: 'kmh',
        ToStandardMeasurement: 1
      },
      mph: {
        name: 'mph',
        ToStandardMeasurement: 1 * 1.609344
      },
      kt: {
        name: 'kt',
        ToStandardMeasurement: 1 * 1.85200
      },
      ms: {
        name: 'ms',
        ToStandardMeasurement: 1 * 3.6
      }
    }

    )
  }
}
