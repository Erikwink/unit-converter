/** A Class which converts different units of messurment.
 *
 */
export class Converter {
    #standardWeightKilos = 0
    #originalWeight = 0
    #numberOfDecimals = 0

    /** Constructor.
     *
     */
    constructor() {

    }

    /** Sets the amount of decimals.
     * 
     * @param {number} decimals - The number of decimals.
     */
    setDecimals(decimals) {
        if(decimals >= 0) {
            this.#numberOfDecimals = decimals
            console.log('decimals set', this.#numberOfDecimals)
        }
        else if(!Number(decimals) || decimals < 0) {
            throw new Error('decimals need to be an integer')
        }

    
    }

    /** Gets the amount of decimals the converter is set to.
     * 
     * @returns The amount of decimals the converter is set to.
     */
    getDecimals() {
        return this.#numberOfDecimals
    }


    /** Adjust the decimals of the number.
     * 
     * @param {number} number - The number to adjust. 
     * @returns {number} The adjusted number.
     */
    checkDecimals(number) {
        if (this.#numberOfDecimals === 0 && number >= 1) {
            // check if the number is 0,5 or bigger than return math floor or math ceil???????
            return Math.floor(number)
        }
    
        const numberStr = number.toString()
        const decimalIndex = numberStr.indexOf('.')
    
        // If no decimal retun number
        if (decimalIndex === -1) {
            return number
        }
    
        // Check for zeros after decimal
        let firstNonZeroIndex = decimalIndex + 1
        while (numberStr[firstNonZeroIndex] === '0' && firstNonZeroIndex < numberStr.length) {
            firstNonZeroIndex++
        }
        
    
        // Calculate decimals
        let decimalsNeeded = firstNonZeroIndex - decimalIndex
    
        // If integers found, decimalsNeeded = 1
        if (decimalsNeeded === numberStr.length) {
            decimalsNeeded = 1
        }
    
        if (this.#numberOfDecimals === 0 && number < 1) {
            const factor = Math.pow(10, decimalsNeeded)
            return Math.floor(number * factor) / factor
        }
    
        // If numberOfDecimals are null, set to 2
        const decimalsSetByUser = this.#numberOfDecimals || 2
    
        // Check if decimalsNeeded are greater than decimalsSetByUser
        const finalDecimals = Math.max(decimalsNeeded, decimalsSetByUser)
    
        // Factor the number to remove decimals
        const factor = Math.pow(10, finalDecimals)
        return Math.floor(number * factor) / factor
    }
    


    /** Set the starting weight for the Conversion
     * 
     * @param {number} weight 
     * @returns {object} - this object for chaning to work.
     */
    setWeight(weight) {
        if (!Number(weight) || weight < 0) {
            throw new Error('Weight must be a number bigger then 0')
        }
        this.#originalWeight = weight
        return this

    }

    /**
     *
     * @param unit
     * @param weight
     */
    from(unit) {
        if (typeof unit !== 'string') {
            throw new Error('from(string) please enter a string')
        }
        switch (unit) {
            case 'kg':
                this.#standardWeightKilos = this.#originalWeight
                return this
            case 'g':
                this.#standardWeightKilos = this.#originalWeight / 1000
                return this
            case 'lbs':
                this.#standardWeightKilos = this.#originalWeight * 0.45359237
                return this
            case 'oz':
                this.#standardWeightKilos = this.#originalWeight / 35.2739619
                return this
            default:
                throw new Error('from(unit) must be a string, kg, g, lbs, oz')
        }
    }

    /**
     *
     * @param unit
     */
    to(unit) {
        if (typeof unit !== 'string') {
            throw new Error('to(string) please enter a string')
        }
        let result
        switch (unit) {
            case 'kg':
                result = this.checkDecimals(this.#standardWeightKilos)
                return result
            case 'g':
                result = this.checkDecimals(this.#standardWeightKilos * 1000)
                return result
            case 'lbs':

                result = this.checkDecimals(this.#standardWeightKilos / 0.45359237)
                return result
            case 'oz':
                result = this.checkDecimals(this.#standardWeightKilos * 35.2739619)
                return result
            default:
                throw new Error('to(unit) must be a string, kg, g, lbs, oz')
        }
    }

    
    // kilometer to miles
    // miles to kilometer

    // showcalculations?
    // show lbs, and grams?? breakout to module? blackbox?
    
    // showUnits visar vilka måttenheter som kan användas
}
