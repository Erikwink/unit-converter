# Unit Converter

A chainable unit converter for weight, speed, and temperature. Allows for conversions between multiple units, handling various output formats (numbers, strings, or calculations) and custom decimal precision.

## 1. Installation

You can install the package directly from GitHub.

```bash
npm install github:Erikwink/unit-converter
```

## 2. Usage
### Instantiation
```javascript
import { Converter } from 'unit-converter'
const converter = new Converter()
```
### Package.json
make sure you have: 
```javascript
"type": "module"
```
set in your package.json

### Basic usage
unit-converter allows for method chaing with the setValue method.
```javascript
try{
converter.setvalue(10).convert('kg', 'lbs') // Returns 22.04
} catch (error) {
console.log(error.message)
}
```
Or you can just set a value and the converter will use that value untill you change it again. 
```javascript
converter.setValue(20)
converter.convert('kg', 'lbs') // Returns 44.09
converter.convert('f', 'c') // Returns -6.67
```

### Decimals
The same goes for setDecimals you can either chain it or set a value and the converter will use that value. Default is 2 decimals.

```javascript
converter.setDecimals(5).setValue(10).convert('kg', 'lbs') // Returns 22.04622
// or
converter.setDecimals(0)
converter.convert('kg', 'lbs') // Returns 22

```
You can retrieve the current decimal setting using getDecimals()
```javascript
converter.setDecimals(5)
converter.getDecimals(); //Returns  5
```
### Units
Public method getUnits() will show you the possible conversions.
```javascript
console.log(converter.getUnits())
//{
//  weight: [ 'kg', 'g', 'lbs', 'oz', 'ton' ],
//  speed: [ 'kmh', 'mph', 'kt', 'ms' ],
//  temperature: [ 'c', 'f', 'k' ]
//}
```
Dont try to make conversion between different units!
```javascript
converter.setValue(20).convert('kg', 'kmh') // Throws Cannot convert between kg and kmh
```

### Output formats
By default, the converter returns a number. But you can switch the output to either a string with units or a full calculation by using:
```javascript
  console.log(converter.setValue(20).setDecimals(2).convertToString('kg', 'lbs'))
  // Returns 44.09 lbs
  console.log(converter.convertToCalc('kg', 'lbs'))
  // Returns
  // 20 * 1 kg = 20
  // (20 / 0.45359237)
  // The result is: 44.09 lbs
```

## 3. Supported units
### Weight:
* 'kg'
* 'g'
* 'lbs'
* 'oz'
* 'ton' 
### Speed:
* 'kmh'
* 'mph'
* 'kt'
* 'ms' 
### Temperature:
* 'c'
* 'f'
* 'k'

## Version
Version 1.1
## Language
Javascript
## Bugs
### Displaying decimals
Due to node JS, when the result is 0.20 it will be displayed as 0.2 and so on.

## Contributions
Feel free to contributions to the unit-converter module! If you would like to add support for new types of conversions follow these steps to create your own converter class:

1. Fork and Clone the Repository
First, fork the repository and clone it to your local development environment:

```bash
git clone https://github.com/Erikwink/unit-converter.git
```
2. Create a New Converter Class
All converters should extend the BaseConverter class and follow the same structure. For example, if you're adding a converter for length you would do something like this:
Make sure the object key is named the same as the value of name for the converter to work, see example below.

```javascript

import { BaseConverter } from './BaseConverter.js';

/** Class representing a length converter */
export class LengthConverter extends BaseConverter {
  constructor() {
    super({
      formOfUnits: 'length',
      m: { name: 'm', toStandardMessure: 1 },
      km: { name: 'km', toStandardMessure: 1000 },
      mile: { name: 'mile', toStandardMessure: 1609.34 },
      // Add more units here
    });
  }
}
```
3. Register Your Converter
In the Converter class (Converter.js), you need to import and add your new converter so it can be used.

```javascript

import { LengthConverter } from './unitConverters/LengthConverter.js';

export class Converter {
  constructor() {
    const converterInstances = [
      new WeightConverter(),
      new SpeedConverter(),
      new TemperatureConverter(),
      new LengthConverter()  // Add your converter here
    ]

  }
}
```
4. Make sure to test, document and follow the code style in your classes before submiting a push request. See [Tests](./test-reports/reports/test-report.md) for details.

5. ### Special cases.
if your converter doesn't follow the same pattern for conversion you might have to ovveride the methods in the class. See example, or look at [TemperatureConverter.js](./src/js/unitConverters/TemperatureConverter.js)
```javascript
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

```

## License
This project is licensed under the MIT License - see the [LICENSE](./LICENSE.TXT) file for details.

## Testing 
The module is tested using manul tests and automated tests.
See test page more info [Tests](./TEST-REPORT.md) And [Automated-test](./test-reports/reports/test-report.md)





