import { Converter } from "./src/js/converter.js"
const converter = new Converter
try {

converter.setDecimals(2)

console.log(converter.setWeight(10).from('kg').to('lbs')) 
console.log(converter.setWeight(10).from('kg').to('oz')) 
converter.setDecimals(5)
console.log(converter.setWeight(100).from('kg').to('lbs')) 
console.log(converter.setWeight(100).from('kg').to('oz')) 
converter.setDecimals(0)
console.log(converter.setWeight(100).from('oz').to('lbs')) 
console.log(converter.setWeight(10).from('oz').to('kg')) 




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

} catch(error) {
console.log(error.message)
}