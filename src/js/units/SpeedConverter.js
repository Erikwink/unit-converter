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
        toStandardMessure: 1
      },
      mph: {
        name: 'mph',
        toStandardMessure: 1 * 1.609344
      },
      knots: {
        name: 'knots',
        toStandardMessure: 1 * 1.85200
      },
      ms: {
        name: 'ms',
        toStandardMessure: 1 * 3.6
      }
    }

    )
  }
}
