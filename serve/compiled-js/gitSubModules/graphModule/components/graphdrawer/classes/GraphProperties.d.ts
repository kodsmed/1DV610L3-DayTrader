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
    constructor(ArrayOfNumbers: any);
    max: number;
    min: number;
    range: number;
    average: number;
    primeAdjustedLength: any;
    #private;
}
