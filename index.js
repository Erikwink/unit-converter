import { Converter } from './src/js/Converter.js'
export { Converter }

try {
  const converter = new Converter()
  console.log(converter.setValue(10).convert('kg', 'lbs'))
  converter.stringMode(true)
  console.log(converter.setValue(20).convert('kg', 'lbs'))
  converter.calculationMode(true)
  console.log(converter.setValue(20).convert('kg', 'lbs'))
  console.log(converter.setValue(20).convert('kg', 'kmh'))

  /* newConverter.setValue(20)

  newConverter.calculationMode(false)
  console.log(newConverter.convert('oz', 'lbs'))
  console.log(newConverter.convert('kg', 'oz'))
  console.log(newConverter.convert('kmh', 'ms'))
  console.log(newConverter.setValue(100).convert('kmh', 'ms'))
  console.log(newConverter.setValue(100).convert('kelvin', 'celsius'))
  console.log(newConverter.setValue(100).convert('fahrenheit', 'kelvin'))
  console.log('------------------')
  newConverter.setValue(20)
  newConverter.setDecimals(1)
  newConverter.calculationMode(true)
  console.log(newConverter.convert('oz', 'lbs'))
  console.log(newConverter.convert('kg', 'oz'))
  console.log(newConverter.convert('kmh', 'ms'))
  console.log(newConverter.setValue(100).convert('kmh', 'ms'))
  console.log(newConverter.setValue(100).convert('kelvin', 'celsius'))
  console.log(newConverter.setValue(100).convert('fahrenheit', 'kelvin'))
  console.log(newConverter.getUnits()) */
} catch (error) {
  console.log(error.message)
}
