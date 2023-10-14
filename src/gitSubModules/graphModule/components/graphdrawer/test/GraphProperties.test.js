import { GraphProperties } from '../classes/GraphProperties.js'

/**
 * Test the GraphProperties class.
 * GraphProperties is a simple class that stores the properties of the graph.
 *
 * @see GraphProperties
 * It should have the following properties:
 * @property {number} min - The minimum value of the dataset.
 * @property {number} max - The maximum value of the dataset.
 * @property {number} range - The range of the dataset.
 * @property {number} average - The average value.
 * @property {number} primeAdjustedLength - The length of the graph adjusted for the prime numbers over 20.
 */

describe('GraphProperties', () => {
  it('should throw a TypeError if dataset is not an array', () => {
    expect(() => new GraphProperties(1)).toThrow(TypeError)
  }),
  it('should throw a TypeError if dataset is null', () => {
    expect(() => new GraphProperties(null)).toThrow(TypeError)
  }),
  it('should throw a TypeError if dataset is undefined', () => {
    expect(() => new GraphProperties(undefined)).toThrow(TypeError)
  }),
  it('should throw an Error if dataset is empty', () => {
    expect(() => new GraphProperties([])).toThrow(Error)
  }),
  it('should throw a TypeError if dataset contains a none-number', () => {
    expect(() => new GraphProperties([1, 2, null])).toThrow(TypeError)
    expect(() => new GraphProperties([1, 2, undefined])).toThrow(TypeError)
    expect(() => new GraphProperties([1, 2, 'string'])).toThrow(TypeError)
    expect(() => new GraphProperties([1, 2, NaN])).toThrow(TypeError)
  }),
  it('should set the max property', () => {
    const graphProperties = new GraphProperties([1, 2, 3])
    expect(graphProperties.max).toBe(3)
  }),
  it('should set the min property', () => {
    const graphProperties = new GraphProperties([1, 2, 3])
    expect(graphProperties.min).toBe(1)
  }),
  it('should set the range property', () => {
    const graphProperties = new GraphProperties([1, 2, 3])
    expect(graphProperties.range).toBe(2)
  }),
  it('should set the average property', () => {
    let graphProperties = new GraphProperties([1, 2, 3])
    expect(graphProperties.average).toBe(2)
    graphProperties = new GraphProperties([1, 2, 3, 4])
    expect(graphProperties.average).toBe(2.5)
    graphProperties = new GraphProperties([1, 2, 3, 4, 5])
    expect(graphProperties.average).toBe(3)
  }),


  it('should set the primeAdjustedLength property', () => {
    let graphProperties = new GraphProperties([1, 2, 3])
    expect(graphProperties.primeAdjustedLength).toBe(3)
    graphProperties = new GraphProperties([1, 2, 3, 5])
    expect(graphProperties.primeAdjustedLength).toBe(4)
    let array = []
    for (let i = 1; i <= 20; i++) {
      array.push(i)
    }
    graphProperties = new GraphProperties(array)
    expect(graphProperties.primeAdjustedLength).toBe(20)
    array.push(21)
    graphProperties = new GraphProperties(array)
    expect(graphProperties.primeAdjustedLength).toBe(21)
    array.push(22)
    graphProperties = new GraphProperties(array)
    expect(graphProperties.primeAdjustedLength).toBe(22)
    array.push(23)
    graphProperties = new GraphProperties(array)
    expect(graphProperties.primeAdjustedLength).toBe(24)
    array = []
    for (let i = 1; i <= 59; i++) {
      array.push(i)
    }
    graphProperties = new GraphProperties(array)
    expect(graphProperties.primeAdjustedLength).toBe(60)
  })
})
