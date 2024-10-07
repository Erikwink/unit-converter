import { Converter } from './src/js/Converter.js'
export { Converter }
try {
  const converter = new Converter()
  console.log(converter.convert('f', 'c'))
  console.log(converter.getUnits())
} catch (e) {
  console.error(e)
}
