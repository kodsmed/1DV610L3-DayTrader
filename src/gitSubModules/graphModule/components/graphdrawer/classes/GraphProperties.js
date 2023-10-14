  import { PrimeChecker } from './utilities/PrimeChecker.js'
  import { Validators } from './utilities/Validators.js'

  /**
   * Class to calculate the properties of a dataset.
   * @typedef {Object} GraphProperties
   * @property {number} max - The maximum value of the dataset.
   * @property {number} min - The minimum value of the dataset.
   * @property {number} range - The range of the dataset.
   * @property {number} average - The average value.
   * @property {number} primeAdjustedLength - The length of the graph adjusted for the prime numbers over 20.
   */
  export class GraphProperties {
  max
  min
  range
  average
  primeAdjustedLength

    constructor (ArrayOfNumbers) {
      new Validators().verifyDatasetIntegrity(ArrayOfNumbers)
      this.max = Math.max(...ArrayOfNumbers)
      this.min = Math.min(...ArrayOfNumbers)
      this.range = Math.max(this.max - this.min, 1)
      this.average = ArrayOfNumbers.reduce((accumulatedValue, currentValue) => accumulatedValue + currentValue, 0) / ArrayOfNumbers.length
      this.primeAdjustedLength = this.#getPrimeAdjustedLength(ArrayOfNumbers)
    }

    #getPrimeAdjustedLength (dataset) {
      if (dataset.length < 20) {
        return dataset.length
      }

      const primeChecker = new PrimeChecker()
      if (dataset.length > 20 && primeChecker.isPrime(dataset.length)) {
        return dataset.length + 1
      }

      return dataset.length
    }
  }