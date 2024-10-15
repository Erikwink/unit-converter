# Test Report V2
## Summary of Test Cases
| Test Case | Description | Expected Result | Test Status | Notes |
|-----------|-------------|-----------------|-------------|-------|
| 8 | Negative values with decimals | -0.01, -2.20, -0.01 -2 | ✅ | Works except nodejs displaying -2.20 as -2.2. |
| 9 | Small values (below 0.01) | 0.01 and 0.002 | ✅ | Small values correctly rounded when below 0.01, no issues with rounding to required decimals. |
| 10 | Dynamic adjustment for small values | 0.0002 and 0.001 | ✅ |

## Test Case 8: Negative values with decimals

**Objective**: Ensure negative values are correctly handled with different decimal settings.
**Steps**:
```js
converter.setDecimals(2)
converter.setValue(-0.005).convert('kg', 'lbs')
// Expected: -0.01
converter.setValue(-1).convert('kg', 'lbs')
// Expected: -2.20

converter.setDecimals(0)
converter.setValue(-0.005).convert('kg', 'lbs')
// Exprected: -0.01
converter.setValue(-1).convert('kg', 'lbs')
// Expected: -2

```
**Result**: ✅
```bash
Result: -0.01
Result: -2.2
-------------
Result: -0.01
Result: -2
``` 

## Test Case 9: Small values (below 0.01)

**Objective**: Ensure small values below 0.01 are handled correctly.

**Steps**:
```js
converter.setDecimals(2)
converter.setValue(0.005).convert('kg', 'lbs')
// Expected: 0.01
converter.setValue(0.001).convert('kg', 'lbs')
// Expected: 0.002
converter.setDecimals(0)
converter.setValue(0.005).convert('kg', 'lbs')
// Expected: 0.01
converter.setValue(0.001).convert('kg', 'lbs')
// Expected: 0.002
```
**Result**: ✅
```bash
Result: 0.01
Result: 0.002
-------------
Result: 0.01
Result: 0.002
``` 

## Test Case 10: Dynamic adjustment for small values

**Objective**: Verify that dynamic adjustment kicks in for small values to show precise results.

**Steps**:
```js
converter.setDecimals(1)
converter.setValue(0.00009).convert('kg', 'lbs')
// Expected: 0.0002
converter.setValue(0.0005).convert('kg', 'lbs')
// Expected: 0.001
converter.setDecimals(3)
converter.setValue(0.00009).convert('kg', 'lbs')
// Expected: 0.0002
converter.setValue(0.0005).convert('kg', 'lbs')
// Expected: 0.001
```
**Result**: ✅
```bash
Result: 0.0002
Result: 0.001
-------------
Result: 0.0002
Result: 0.001
``` 
