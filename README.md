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
import { converter } from 'unit-converter'
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
converter.convert('fahrenheit', 'celsius') // Returns -6.67
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
converter.getDecimals(); Returns // 5
```
### Units
Public method getUnits() will show you the possible conversions.
```javascript
console.log(converter.getUnits())
//{
//  weight: [ 'kg', 'g', 'lbs', 'oz', 'ton' ],
//  speed: [ 'kmh', 'mph', 'knots', 'ms' ],
//  temperature: [ 'celsius', 'fahrenheit', 'kelvin' ]
//}
```
Dont try to make conversion between different units!
```javascript
converter.setValue(20).convert('kg', 'kmh') // Throws Cannot convert between kg and kmh
```

### Output formats
By default, the converter returns a number. But you can switch the output to either a string with units or a full calculation by using:
```javascript
converter.calculationMode(true) // Returns 44.09 lbs
converter.stringMode(true) 
// Returns
// 20 * 1 kg = 20
// (20 / 0.45359237)
// The result is: 44.09 lbs
```

## 3. supported units
### weight:
* 'kg'
* 'g'
* 'lbs'
* 'oz'
* 'ton' 
### speed:
* 'kmh'
* 'mph'
* 'knots'
* 'ms' 
### temperature:
* 'celsius'
* 'fahrenheit'
* 'kelvin'

## dependecies
Unit-converter har inga beroenden till andra npm-paket.
## version
Version 1.0
## bugs
decimals and negative numbers
## contributions
Feel free to contributions to the unit-converter module! If you would like to add support for new types of conversions follow these steps to create your own converter class:

1. Fork and Clone the Repository
First, fork the repository and clone it to your local development environment:

```bash
git clone https://github.com/Erikwink/unit-converter.git
```
2. Create a New Converter Class
All converters should extend the BaseConverter class and follow the same structure. For example, if you're adding a converter for length you would do something like this:

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
4. Make sure to test, document and follow the code style in your classes before submiting a push request. See tests for details.

5. ### Special cases.
if your converter doesn't follow the same pattern for conversion you might have to ovveride the methods in the class. see example
```javascript
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

```


## contact
## license
This project is licensed under the MIT License - see the [LICENSE](./LICENSE.TXT) file for details.

## ändringar efter läsning
toStandard blev toStandardUnit desciptiv names, kan förstå det direkt, samma med fromStandard
samma med from -> fromUnit

metoder ska bara göra en sak returnera eller ändra inne i klassen...
jag returnerar ofta this för chaining vilket motverkar den tesen...

getters och setters..... tydligare för en programmerare

## testing 
mycket tester för att returnera rätt värde och att få chaining att fungera

## check decimals

om number är större än 1  (=  inte 0.001) och decimalerna är satta till 0 -> ingen untantagsregel gäller, retunera number, lägga till math.floor/math.ceil senare???

gör om till string för att räkna ut vart . sitter
om ingen . returnera number

while loop för att kolla hur många 0 efter . 
decimalsNeeded === skillnaden mellan fösta incke 0an och index för decimaltecken, om inga 0 hittas visa 1 decimal

kolla om decimaler är satta till 0 och number är mindre än 1
returnera antalet decimaler som behövs för att visa annat än 0

om inga decimaler är satta, visas 2 decimaler
kolla decimalsSetByUser satta mot decimalsNeeded för att se vilken som behövs användas = finalDecimals

fakorera finalDecimals med math.pow för att göra om till heltal och sedan ta bort decimaler för att sedan dividera tillbaks till rätt tal och behålla decimaler. 
## fixes

## notes
set value or setvalue()?????????

få med associations till convertersarna i documentering

INTE SKRIVA KOD TILL SIG SJÄLV UTAN TILL ANDRA!!!!
INTE KOMMENTERA VAD KODEN GÖR... EX IF EQUAL DOES THIS....

ju mer man klurar på problemet ju simplare blir det.... gångra allt till ett standarmått för att sedan dela med det konverterade numret, väldigt mycket simplare

## att ha med 
1 installation, hur man ska installera paketet, använd standardsätt?
2 publica metoder, hur man bör använda dessa. argument de tar returvärden
kort hur man använder programmet
3 användningsområden
4 beroenden
5 kända buggar ur ett användarperspektiv(kodare) buggrapport/issues
6 framtidsvisioner, breaking changes/kan nått sabba användandet
7 version
8 kommunication med utvecklare
9 kontributions??
10 licens / copyright, MIT? refer to a source page föreläsning 3




