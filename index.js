import { Converter } from './src/js/Converter.js'
export { Converter }
try {
  const converter = new Converter()
  console.log('Test: Negative Values (Decimals Set to 2)')
  converter.setDecimals(2)
  console.log('Result:', converter.setValue(-0.005).convert('kg', 'lbs'))
  console.log('Result:', converter.setValue(-1).convert('kg', 'lbs'))
  console.log('---------------')

  console.log('Test: Negative Values (Decimals Set to 0)')
  converter.setDecimals(0)
  console.log('Result:', converter.setValue(-0.005).convert('kg', 'lbs'))
  console.log('Result:', converter.setValue(-1).convert('kg', 'lbs'))
  console.log('---------------')

  console.log('Test: Small Values (Decimals Set to 2)')
  converter.setDecimals(2)
  console.log('Result:', converter.setValue(0.005).convert('kg', 'lbs'))
  console.log('Result:', converter.setValue(0.001).convert('kg', 'lbs'))
  console.log('---------------')

  console.log('Test: Small Values (Decimals Set to 0)')
  converter.setDecimals(0)
  console.log('Result:', converter.setValue(0.005).convert('kg', 'lbs'))
  console.log('Result:', converter.setValue(0.001).convert('kg', 'lbs'))
  console.log('---------------')

  console.log('Test: Dynamic Adjustment for Small Values (Decimals Set to 1)')
  converter.setDecimals(1)
  console.log('Result:', converter.setValue(0.00009).convert('kg', 'lbs'))
  console.log('Result:', converter.setValue(0.0005).convert('kg', 'lbs'))
  console.log('---------------')

  console.log('Test: Dynamic Adjustment for Small Values (Decimals Set to 3)')
  converter.setDecimals(3)
  console.log('Result:', converter.setValue(0.00009).convert('kg', 'lbs'))
  console.log('Result:', converter.setValue(0.0005).convert('kg', 'lbs'))
  console.log('---------------')
} catch (e) {
  console.error(e.message)
}
