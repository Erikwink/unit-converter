## Test Specification:
The purpose of these tests is to validate the functionality, error handling, and edge cases of the Converter class, ensuring that unit conversions (weight, speed, temperature) are performed correctly and consistently.
* Setting values and converting between units.
* Handling invalid inputs.
* Decimal rounding.
* Switching between string and calculation modes.
* Handling conversions across different types (e.g., speed to weight).
* Edge case handling like zero values, negative values, and non-numeric inputs.

## Test Case 1: Convert weight from grams to pounds
Test Objective: Verify that the module correctly converts a value in grams to pounds.

Test Steps:

Create a new Converter object.
Call setValue(1000) to set the value to 1000 grams.
Call convert('g', 'lbs') to convert from grams to pounds.
Expected Result:

The result should be 2.2 pounds.
Execution Example:

```javascript

const converter = new Converter()
converter.setValue(1000)
console.log(converter.convert('g', 'lbs')) // Expected output: 2.2
```
## Test Case 2: Handle invalid value input
Test Objective: Ensure that non-numeric inputs throw an error when passed to setValue.

Test Steps:

Create a new Converter object.
Call setValue('notANumber') and observe the result.
Expected Result:

The system should throw an error with the message: "Value needs to be a number".
Execution Example:

```javascript

const converter = new Converter()
try {
  converter.setValue('notANumber')
} catch (error) {
  console.log(error.message) // Expected output: Value needs to be a number
}
```
## Test Case 3: Conversion between different unit types (should fail)
Test Objective: Verify that converting between different unit types (e.g., speed to weight) throws an error.

Test Steps:

Create a new Converter object.
Call setValue(100) to set the value to 100 kmh.
Call convert('kmh', 'kg') to attempt converting speed to weight.
Expected Result:

An error should be thrown with the message: "Cannot convert between kmh and kg".
Execution Example:

```javascript
const converter = new Converter()
converter.setValue(100)
try {
  console.log(converter.convert('kmh', 'kg'))
} catch (error) {
  console.log(error.message) // Expected output: Cannot convert between km/h and kg
}
```
## Test Case 4: Decimal precision handling
Test Objective: Ensure that decimal precision is correctly applied when converting values.

Test Steps:

Create a new Converter object.
Call setValue(1000) and then set the decimals using setDecimals(3).
Call convert('g', 'lbs') to convert from grams to pounds.
Expected Result:

The result should be 2.204 pounds.
Execution Example:

```javascript
const converter = new Converter()
converter.setValue(1000).setDecimals(3)
console.log(converter.convert('g', 'lbs')) // Expected output: 2.204
```
### 4.1 Decimals rounding point
Call Converter.setValue(37).setDecimals(1).convert('celsius', 'fahrennheit')
Call Converter.setDecimals(2).convert('celsius', 'fahrennheit')


Expected Result:
The result should be 98.6 and 98.60

Execution Example:
```js
converter.setValue(37)setDecimals(1)
  console.log(converter.convert('celsius', 'fahrenheit')) // Expected: 98.6
  converter.setDecimals(2)
  console.log(converter.convert('celsius', 'fahrenheit')) // Expected: 98.60
``` 

### 4.2 Negative numbers
Call converter.setValue(-19.454).setDecimals(0).convert('celsius', 'fahrennheit')
Call Converter.setDecimals(2).convert('celsius', 'fahrennheit')

Expected Result:
The result should be -3 and -3.01

Execution Example:
```js
converter.setValue(-19.454).setDecimals(0)
  console.log(converter.convert('celsius', 'fahrenheit')) // Expected: -3
  converter.setDecimals(2)
  console.log(converter.convert('celsius', 'fahrenheit')) // Expected: -3.01
``` 
### 4.3 Numbers below 1
Call converter.setValue(156).setDecimals(2).convert('g', 'kg')

Expected result: 
The result should be 0.15

Execution Example:
```js
  console.log(converter.setValue(156).setDecimals(2).convert('g', 'kg')) // Expected: 0.15
``` 

## Test Case 5: String mode
Test Objective: Ensure that when string mode is enabled, the result is returned as a descriptive string.

Test Steps:

Create a new Converter object.
Call setValue(1000) and enable string mode with stringMode(true).
Call convert('g', 'lbs') to convert from grams to pounds.
Expected Result:

The result should be a string: " 2.204 lbs".
Execution Example:

```javascript

const converter = new Converter()
converter.setValue(1000).stringMode(true)
console.log(converter.convert('g', 'lbs')) // Expected output: 2.204 lbs
```
## Test Case 6: Calculation mode
Test Objective: Ensure that calculation mode returns a detailed breakdown of the conversion steps.

Test Steps:

Create a new Converter object.
Call setValue(1000) and enable calculation mode with calculationMode(true).
Call convert('g', 'lbs') to convert from grams to pounds.
Expected Result:

The result should include detailed calculation steps.
Execution Example:

```javascript
const converter = new Converter()
converter.setValue(1000).calculationMode(true)
console.log(converter.convert('g', 'lbs'))
// Expected output: 
// 1000 * 0.001 g = 1 
// (1 / 0.45359237)
// The result is: 2.2 lbs
```
## Test Case 7: Negative value conversion
Test Objective: Ensure that negative values are correctly converted and rounded.

Test Steps:

Create a new Converter object.
Call setValue(-500).setDecimals(3) to set a negative value.
Call convert('g', 'lbs') to convert from grams to pounds.
Expected Result:

The result should be -1.103.
Execution Example:

```javascript

const converter = new Converter()
converter.setValue(-500).setDecimals(3)
console.log(converter.convert('g', 'lbs')) // Expected output: -1.103
```

Summary of Test Cases:
|Test Case  | Description | Expected Result |Test status|notes|
|-- | -- | -- | -- |--|
|1 | Convert 1000 grams to pounds | 2.2|✅|
|2 | Handle invalid value input | Error: "Value needs to be a number"|✅|
|3 | Conversion between different unit types (fail) | Error: "Cannot convert between kmh and kg"|✅|
|4 | Decimal precision handling | 2.204|✅|
|4.1|Decimal rounding point|98.6 and 98.60|❌|Due to nodejs it will display 98.60 as 98.6 |
|4.2|Negative numbers|-3 and -3.01|❌|Numbers below 0 will always return the full number.|
|4.3|Numbers below 1|0.15|❌|Numbers below 1 will return the full number with decimals.
|5 | String mode | "2.205 lbs"|✅|
|6 | Calculation mode | Detailed calculation steps|✅|
|7 | Negative value conversion | -1.103 |❌|Will return full number (-1.1023113109243878)|
