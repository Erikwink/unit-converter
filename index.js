import { Converter } from './src/js/Converter.js'
export { Converter }
try {
  const converter = new Converter()
  console.log(converter.setValue(10).convertToCalc('g', 'kg'))
  console.log('____________')
  console.log(converter.setValue(10).convertToCalc('kmh', 'mph'))
  console.log('____________')
  console.log(converter.setValue(10).convertToCalc('f', 'k'))
  console.log('____________')
  console.log(converter.setValue(10).convertToCalc('f', 'c'))
  console.log('____________')
  console.log(converter.setValue(10).convertToCalc('k', 'f'))
  console.log('____________')
  console.log(converter.setValue(10).convertToCalc('k', 'c'))
  console.log('____________')
  console.log(converter.setValue(10).convertToCalc('c', 'f'))
  console.log('____________')
  console.log(converter.setValue(10).convertToCalc('c', 'k'))
} catch (error) {
  console.error(error)
}
