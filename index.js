import { Converter } from "./src/js/converter.js"
const converter = new Converter

try {
/* const pounds = converter.fromGrams(1000).toPounds()
console.log('pounds', pounds)
const kilos = converter.fromGrams(1000)
console.log(kilos) */

console.log(converter.from('kg'))


console.log(converter.setWeight(10).from('kg').to('lbs')) 
console.log(converter.setWeight(10).from('kg').to('oz')) 
console.log(converter.setWeight(10).from('kg').to('kg')) 
console.log(converter.setWeight(10).from('kg').to('g')) 
console.log('------------------------------------')
console.log(converter.setWeight(10).from('g').to('lbs')) 
console.log(converter.setWeight(10).from('lbs').to('oz')) 
console.log(converter.setWeight(10).from('g').to('kg')) 
console.log(converter.setWeight(10).from('kg').to('g')) 
console.log('------------------------------------')
console.log(converter.from('g').to('lbs')) 
console.log(converter.from('lbs').to('oz')) 
console.log(converter.from('g').to('kg')) 
console.log(converter.from('kg').to('g')) 
// works

} catch(error) {
console.log(error.message)
}