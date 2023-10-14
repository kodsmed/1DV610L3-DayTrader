import { ColorSettings } from '../classes/ColorSettings.js'

/**
 * Test the ColorSettings class.
 * ColorSettings is a simple class that stores the colors of the graph.
 *
 * @see ColorSettings
 * It should have the following properties:
 * @property {string} graphLineColor - The color of the graph line.
 * @property {string} graphDotColor - The color of the graph dots.
 * @property {string} zeroLineColor - The color of the zero line.
 * @property {string} axisColor - The color of the axes.
 * @property {string} labelColor - The color of the labels.
 * @property {string} titleColor - The color of the titles.
 * @property {string} backgroundColor - The color of the background.
 *
 * Allowed colors are: 'red', 'green', 'lime', 'blue', 'yellow', 'orange', 'purple', 'black', 'gray', 'white'
 */

describe('ColorSettings', () => {
  it ('should throw a TypeError if graphLineColor is not a string', () => {
    expect(() => new ColorSettings(1, 'green', 'red', 'blue', 'black', 'white', 'white')).toThrow(TypeError)
  }),
  it ('should throw a TypeError if graphLineColor is null', () => {
    expect(() => new ColorSettings(null, 'green', 'red', 'blue', 'black', 'white', 'white')).toThrow(TypeError)
  }),
  it ('should throw a TypeError if graphLineColor is undefined', () => {
    expect(() => new ColorSettings(undefined, 'green', 'red', 'blue', 'black', 'white', 'white')).toThrow(TypeError)
  }),
  it ('should throw a TypeError if graphLineColor is not a valid color', () => {
    expect(() => new ColorSettings('chartreuse', 'green', 'red', 'blue', 'black', 'white', 'white')).toThrow(TypeError)
  }),
  it ('should throw a TypeError if graphDotColor is not a string', () => {
    expect(() => new ColorSettings('red', 1, 'red', 'blue', 'black', 'white', 'white')).toThrow(TypeError)
  }),
  it ('should throw a TypeError if graphDotColor is null', () => {
    expect(() => new ColorSettings('red', null, 'red', 'blue', 'black', 'white', 'white')).toThrow(TypeError)
  }),
  it ('should throw a TypeError if graphDotColor is undefined', () => {
    expect(() => new ColorSettings('red', undefined, 'red', 'blue', 'black', 'white', 'white')).toThrow(TypeError)
  }),
  it ('should throw a TypeError if graphDotColor is not a valid color', () => {
    expect(() => new ColorSettings('red', 'chartreuse', 'red', 'blue', 'black', 'white', 'white')).toThrow(TypeError)
  }),
  it ('should throw a TypeError if zeroLineColor is not a string', () => {
    expect(() => new ColorSettings('red', 'green', 1, 'blue', 'black', 'white', 'white')).toThrow(TypeError)
  }),
  it ('should throw a TypeError if zeroLineColor is null', () => {
    expect(() => new ColorSettings('red', 'green', null, 'blue', 'black', 'white', 'white')).toThrow(TypeError)
  }),
  it ('should throw a TypeError if zeroLineColor is undefined', () => {
    expect(() => new ColorSettings('red', 'green', undefined, 'blue', 'black', 'white', 'white')).toThrow(TypeError)
  }),
  it ('should throw a TypeError if zeroLineColor is not a valid color', () => {
    expect(() => new ColorSettings('red', 'green', 'chartreuse', 'blue', 'black', 'white', 'white')).toThrow(TypeError)
  }),
  it ('should throw a TypeError if axisColor is not a string', () => {
    expect(() => new ColorSettings('red', 'green', 'red', 1, 'black', 'white', 'white')).toThrow(TypeError)
  }),
  it ('should throw a TypeError if axisColor is null', () => {
    expect(() => new ColorSettings('red', 'green', 'red', null, 'black', 'white', 'white')).toThrow(TypeError)
  }),
  it ('should throw a TypeError if axisColor is undefined', () => {
    expect(() => new ColorSettings('red', 'green', 'red', undefined, 'black', 'white', 'white')).toThrow(TypeError)
  }),
  it ('should throw a TypeError if axisColor is not a valid color', () => {
    expect(() => new ColorSettings('red', 'green', 'red', 'chartreuse', 'black', 'white', 'white')).toThrow(TypeError)
  }),
  it ('should throw a TypeError if labelColor is not a string', () => {
    expect(() => new ColorSettings('red', 'green', 'red', 'blue', 1, 'white', 'white')).toThrow(TypeError)
  }),
  it ('should throw a TypeError if labelColor is null', () => {
    expect(() => new ColorSettings('red', 'green', 'red', 'blue', null, 'white', 'white')).toThrow(TypeError)
  }),
  it ('should throw a TypeError if labelColor is undefined', () => {
    expect(() => new ColorSettings('red', 'green', 'red', 'blue', undefined, 'white', 'white')).toThrow(TypeError)
  }),
  it ('should throw a TypeError if labelColor is not a valid color', () => {
    expect(() => new ColorSettings('red', 'green', 'red', 'blue', 'chartreuse', 'white', 'white')).toThrow(TypeError)
  }),
  it ('should throw a TypeError if titleColor is not a string', () => {
    expect(() => new ColorSettings('red', 'green', 'red', 'blue', 'black', 1, 'white')).toThrow(TypeError)
  }),
  it ('should throw a TypeError if titleColor is null', () => {
    expect(() => new ColorSettings('red', 'green', 'red', 'blue', 'black', null, 'white')).toThrow(TypeError)
  }),
  it ('should throw a TypeError if titleColor is undefined', () => {
    expect(() => new ColorSettings('red', 'green', 'red', 'blue', 'black', undefined, 'white')).toThrow(TypeError)
  }),
  it ('should throw a TypeError if titleColor is not a valid color', () => {
    expect(() => new ColorSettings('red', 'green', 'red', 'blue', 'black', 'chartreuse', 'white')).toThrow(TypeError)
  }),
  it ('should throw a TypeError if backgroundColor is not a string', () => {
    expect(() => new ColorSettings('red', 'green', 'red', 'blue', 'black', 'white', 1)).toThrow(TypeError)
  }),
  it ('should throw a TypeError if backgroundColor is null', () => {
    expect(() => new ColorSettings('red', 'green', 'red', 'blue', 'black', 'white', null)).toThrow(TypeError)
  }),
  it ('should throw a TypeError if backgroundColor is undefined', () => {
    expect(() => new ColorSettings('red', 'green', 'red', 'blue', 'black', 'white', undefined)).toThrow(TypeError)
  }),
  it ('should throw a TypeError if backgroundColor is not a valid color', () => {
    expect(() => new ColorSettings('red', 'green', 'red', 'blue', 'black', 'white', 'chartreuse')).toThrow(TypeError)
  }),
  it ('should set the graphLineColor property', () => {
    const colorSettings = new ColorSettings('red', 'green', 'red', 'blue', 'black', 'white', 'white')
    expect(colorSettings.graphLineColor).toBe('red')
  }),
  it ('should set the graphDotColor property', () => {
    const colorSettings = new ColorSettings('red', 'green', 'red', 'blue', 'black', 'white', 'white')
    expect(colorSettings.graphDotColor).toBe('green')
  }),
  it ('should set the zeroLineColor property', () => {
    const colorSettings = new ColorSettings('red', 'green', 'red', 'blue', 'black', 'white', 'white')
    expect(colorSettings.zeroLineColor).toBe('red')
  }),
  it ('should set the axisColor property', () => {
    const colorSettings = new ColorSettings('red', 'green', 'red', 'blue', 'black', 'white', 'white')
    expect(colorSettings.axisColor).toBe('blue')
  }),
  it ('should set the labelColor property', () => {
    const colorSettings = new ColorSettings('red', 'green', 'red', 'blue', 'black', 'white', 'white')
    expect(colorSettings.labelColor).toBe('black')
  }),
  it ('should set the titleColor property', () => {
    const colorSettings = new ColorSettings('red', 'green', 'red', 'blue', 'black', 'white', 'white')
    expect(colorSettings.titleColor).toBe('white')
  }),
  it ('should set the backgroundColor property', () => {
    const colorSettings = new ColorSettings('red', 'green', 'red', 'blue', 'black', 'white', 'gray')
    expect(colorSettings.backgroundColor).toBe('gray')
  })
})
