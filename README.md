# Unit Converter

A chainable unit converter for weight, speed, and temperature. Allows for conversions between multiple units, handling various output formats (numbers, strings, or calculations) and custom decimal precision.

## 1. Installation

You can install the package directly from GitHub:

```bash
npm install github:Erikwink/unit-converter

import { converter } from 'unit-converter'
## usage
instaciate a new object using new Converter()
unit-converter allows for chaing with the setValue method
converter.setvalue(10).convert('kg','lbs')
or you can just set a value and the converter will use that value for untill you change it again. converter.setValue(10)

You can set the amount of decimals you want with the setDecimals()
standard is 2 decimals
you can also use getDecimals() to see what the converter is set to

Public method getUnits() will show you the possible conversions
// {
  weight: [ 'kg', 'g', 'lbs', 'oz', 'ton' ],
  speed: [ 'kmh', 'mph', 'knots', 'ms' ],
  temperature: [ 'celsius', 'fahrenheit', 'kelvin' ]
}

you can switch between getting a number in return or a string with unit, or the calculation.
standard is number, and the by setting stringMode(true) or calculationMode(true) you can change the desired output.

## methods
## supported units
  weight: [ 'kg', 'g', 'lbs', 'oz', 'ton' ],
  speed: [ 'kmh', 'mph', 'knots', 'ms' ],
  temperature: [ 'celsius', 'fahrenheit', 'kelvin' ]

## dependecies
## version
## bugs
## contributions
## contact
## license

## ändringar efter läsning
toStandard blev toStandardUnit desciptiv names, kan förstå det direkt, samma med fromStandard
samma med from -> fromUnit

## testing 
mycket tester för att returnera rätt värde och att få chaining att fungera

## check decimals

om number är större än 1  (=  inte 0.001) och decimalerna är satta till 0 -> ingen untantagsregel gäller, retunera number, lägga till math.floor/math.ceil senare???

gör om till string för att räkna ut vart . sitter
om ingen . returnera number

while loop för att kolla hur många 0 efter . 
decimalsNeeded === skillnaden mellan fösta incke 0an och index för decimaltecken, om inga 0 hittas visa 1 decimal

kolla om decimaler är satta till 0 och number är mindre än 1
returnera antalet decimaler som behövs för att visa annat än 0

om inga decimaler är satta, visas 2 decimaler
kolla decimalsSetByUser satta mot decimalsNeeded för att se vilken som behövs användas = finalDecimals

fakorera finalDecimals med math.pow för att göra om till heltal och sedan ta bort decimaler för att sedan dividera tillbaks till rätt tal och behålla decimaler. 
## fixes

## notes
set value or setvalue()?????????

få med associations till convertersarna i documentering

INTE SKRIVA KOD TILL SIG SJÄLV UTAN TILL ANDRA!!!!
INTE KOMMENTERA VAD KODEN GÖR... EX IF EQUAL DOES THIS....

ju mer man klurar på problemet ju simplare blir det.... gångra allt till ett standarmått för att sedan dela med det konverterade numret, väldigt mycket simplare

decimals are set to 0, change with setDecimals

// import {} if using ecma script module, otherwise?

## att ha med 
1 installation, hur man ska installera paketet, använd standardsätt?
2 publica metoder, hur man bör använda dessa. argument de tar returvärden
kort hur man använder programmet
3 användningsområden
4 beroenden
5 kända buggar ur ett användarperspektiv(kodare) buggrapport/issues
6 framtidsvisioner, breaking changes/kan nått sabba användandet
7 version
8 kommunication med utvecklare
9 kontributions??
10 licens / copyright, MIT? refer to a source page föreläsning 3




