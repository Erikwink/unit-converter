import { Converter } from './src/js/converter.js'
import { NewConverter } from './src/js/newConverter.js'
// eslint-disable-next-line no-unused-vars
const converter = new Converter()

try {
  const newConverter = new NewConverter()
  newConverter.setValue(20)
 /*  newConverter.setDecimals(0) */
  /* console.log(newConverter.convert('kg', 'lbs'))
  console.log(newConverter.convert('kg', 'oz'))
  newConverter.setDecimals(1)
  console.log(newConverter.convert('kmh', 'ms'))
  console.log(newConverter.setValue(100).convert('kmh', 'ms')) */

  console.log(newConverter.setValue(100).convert('kelvin', 'celsius'))
  console.log(newConverter.setValue(100).convert('fahrenheit', 'kelvin'))

  /*    converter.setNumber(10)
    converter.setDecimals(5)
    console.log(converter.getDecimals())
   console.log(converter.testFrom('kmh').testTo('g'))
   console.log('-------------------------')
   console.log(converter.testFrom('mph').testTo('ms'))
   console.log('-------------------------')
   console.log(converter.testFrom('ms').testTo('knots'))
   console.log('-------------------------')
   console.log(converter.testFrom('knots').testTo('mph'))
   console.log('|||----------------------------|||')
   converter.returnString()
   console.log(converter.testFrom('g').testTo('kg'))
   console.log('-------------------------')
   console.log(converter.testFrom('kg').testTo('oz'))
   converter.showCalculations()
   console.log('-------------------------')
   console.log(converter.testFrom('lbs').testTo('kg'))
   console.log('-------------------------')
   console.log(converter.testFrom('g').testTo('oz'))

   console.log(converter.showUnits()) */

  /*
console.log(converter.setWeight(10).from('kg').to('lbs'))
console.log(converter.setWeight(10).from('kg').to('oz'))
converter.setDecimals(5)
console.log(converter.setWeight(100).from('kg').to('lbs'))
console.log(converter.setWeight(100).from('kg').to('oz'))
console.log(converter.getDecimals())
converter.setDecimals(0)
console.log(converter.setWeight(100).from('oz').to('lbs'))
console.log(converter.setWeight(10).from('oz').to('kg'))
console.log(converter.showUnits())

console.log(converter.to('kg'))
console.log(converter.from('kg')) */

  /* console.log('------------------------------------')
console.log(converter.setWeight(10).from('g').to('lbs'))
console.log(converter.setWeight(10).from('lbs').to('oz'))
console.log(converter.setWeight(10).from('g').to('kg'))
console.log(converter.setWeight(10).from('kg').to('g'))
console.log('------------------------------------')
converter.setDecimals(1)
console.log(converter.from('g').to('lbs'))
console.log(converter.from('lbs').to('oz'))
console.log(converter.from('g').to('kg'))
console.log(converter.from('kg').to('g'))  */
  // works
} catch (error) {
  console.log(error.message)
}
