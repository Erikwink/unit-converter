import { Converter } from './src/js/Converter.js'
export { Converter }
try {
  const converter = new Converter()
  converter.setDecimals(2)
  console.log(converter.setValue(2).convertToCalc('c', 'k'))
  console.log(converter.setValue(65).convertToCalc('f', 'k'))
  console.log(converter.setValue(22).convertToCalc('c', 'f'))
  console.log(converter.setValue(25).convertToString('f', 'c'))
} catch (e) {
  console.error(e.message)
}
