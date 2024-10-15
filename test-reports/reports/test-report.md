# Test Report
**Total Tests**: 18
**Passed Tests**: 18
**Failed Tests**: 0
**Skipped Tests**: 0

## Test Suite: C:\Users\erikw\courses\1dv610\unit-converter\__tests__\Converter.test.js
| Test | Status | Duration |
|------|--------|----------|
| should convert weight from grams to pounds | ✔️ Passed | 3ms |
| should throw error when setting non-numeric value | ✔️ Passed | 10ms |
| should throw error when converting between different unit types | ✔️ Passed | 1ms |
| should handle decimal precision correctly when changed | ✔️ Passed | N/Ams |
| should handle negative values correctly | ✔️ Passed | N/Ams |
| should return the correct number of decimals when changed | ✔️ Passed | 1ms |
| should throw error when setting negative decimals | ✔️ Passed | N/Ams |
| should return string correctly with default decimals | ✔️ Passed | N/Ams |
| should return calculation correctly | ✔️ Passed | 1ms |
| should handle small values correctly with default decimals | ✔️ Passed | N/Ams |
| should handle values below 1 correctly with default decimals | ✔️ Passed | N/Ams |

## Test Suite: C:\Users\erikw\courses\1dv610\unit-converter\__tests__\BaseConverter.test.js
| Test | Status | Duration |
|------|--------|----------|
| should validate a correct units object | ✔️ Passed | 1ms |
| should throw error for non-object units parameter | ✔️ Passed | 6ms |
| should throw error for missing formOfUnits key | ✔️ Passed | N/Ams |
| should throw error if formOfUnits is not a string | ✔️ Passed | 1ms |
| should throw error for invalid unit structure (non-object) | ✔️ Passed | 1ms |
| should throw error for missing ToStandardMeasurement in unit | ✔️ Passed | N/Ams |
| should throw error for missing name in unit | ✔️ Passed | N/Ams |

