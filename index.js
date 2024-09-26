import { Converter } from './src/js/Converter.js'

try {
  const newConverter = new Converter()
  newConverter.setValue(20)
  newConverter.setDecimals(5)
  newConverter.toggleShowCalculations(true)
  console.log(newConverter.convert('oz', 'lbs'))
  console.log(newConverter.convert('kg', 'oz'))
  console.log(newConverter.convert('kmh', 'ms'))
  console.log(newConverter.setValue(100).convert('kmh', 'ms'))
  console.log(newConverter.setValue(100).convert('kelvin', 'celsius'))
  console.log(newConverter.setValue(100).convert('fahrenheit', 'kelvin'))
} catch (error) {
  console.log(error.message)
}
