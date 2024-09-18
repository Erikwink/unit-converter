import { Converter } from "./src/js/converter.js"
const converter = new Converter
const celsius = converter.fahrenheitToCelsius(20
)
console.log('celsius', celsius)

const farenheight = converter.celsiusToFahrenheit(20)
console.log('farenheight', farenheight)

const kilos = converter.poundsToKilos(20)
console.log('kilos', kilos)

const pounds = converter.kilosToPounds(20)
console.log('pounds', pounds)