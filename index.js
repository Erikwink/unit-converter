import { Converter } from './src/js/Converter.js'
export { Converter }

try {
  const converter = new Converter()
  converter.stringMode(true)
  console.log(converter.setValue(-500).setDecimals(2).convert('g', 'lbs'))
} catch (error) {
  console.log(error.message)
}
