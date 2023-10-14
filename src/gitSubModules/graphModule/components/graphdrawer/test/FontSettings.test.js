import { FontSettings } from '../classes/FontSettings.js'

/**
 * Test the FontSettings class.
 * FontSettings is a simple class that stores the font settings of the graph.
 *
 * @see FontSettings
 * It should have the following properties:
 * @property {string} font - The font to use.
 * @property {number} fontSizeLabel - The size of the font for the labels.
 * @property {number} fontSizeTitle - The size of the font for the title.
 */
describe('FontSettings', () => {
  it ('should throw a TypeError if font is not a string', () => {
    expect(() => new FontSettings(1, 12, 24)).toThrow(TypeError)
  }),
  it ('should throw a TypeError if fontSizeLabel is not a number', () => {
    expect(() => new FontSettings('Arial', '12', 24)).toThrow(TypeError)
  }),
  it ('should throw a TypeError if fontSizeTitle is not a number', () => {
    expect(() => new FontSettings('Arial', 12, '24')).toThrow(TypeError)
  }),
  it ('should throw a TypeError if font is null', () => {
    expect(() => new FontSettings(null, 12, 24)).toThrow(TypeError)
  })
  it ('should throw a TypeError if fontSizeLabel is null', () => {
    expect(() => new FontSettings('Arial', null, 24)).toThrow(TypeError)
  }),
  it ('should throw a TypeError if fontSizeTitle is null', () => {
    expect(() => new FontSettings('Arial', 12, null)).toThrow(TypeError)
  }),
  it ('should throw a TypeError if font is undefined', () => {
    expect(() => new FontSettings(undefined, 12, 24)).toThrow(TypeError)
  }),
  it ('should throw a TypeError if fontSizeLabel is undefined', () => {
    expect(() => new FontSettings('Arial', undefined, 24)).toThrow(TypeError)
  }),
  it ('should throw a TypeError if fontSizeTitle is undefined', () => {
    expect(() => new FontSettings('Arial', 12, undefined)).toThrow(TypeError)
  }),
  it ('getters should return ctx style properties as string', () => {
    const fontSettings = new FontSettings('Arial', 12, 24)
    expect(fontSettings.ctxLabelStyle).toBe('12px Arial')
    expect(fontSettings.ctxTitleStyle).toBe('24px Arial')
  })
})