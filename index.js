import { Converter } from './src/js/Converter.js'
export { Converter }
try {
  const converter = new Converter()
  console.log(converter.setValue(10).convert('kmh', 'mph'))
  console.log(converter.getUnits())
} catch (e) {
  console.log(e)
}
