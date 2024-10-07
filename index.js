import { Converter } from './src/js/Converter.js'
export { Converter }
try {
  const converter = new Converter()
  console.log(converter.setValue(10).convert('kg', 'lbs'))
  console.log(converter.convertToCalc('kg', 'lbs'))
  console.log(converter.convertToString('kg', 'lbs'))
  console.log(converter.setValue(2).convert('c', 'f'))
} catch (e) {
  console.error(e)
}
