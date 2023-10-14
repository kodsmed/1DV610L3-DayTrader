import validationCollection from 'validation-collection';
/**
 * This class is used to store the color settings for the graph.
 * @typedef {Object} ColorSettings
 * @property {string} graphLineColor - 'red', 'green', 'lime', 'blue', 'yellow', 'orange', 'purple', 'black', 'gray', 'white'
 * @property {string} graphDotColor - 'red', 'green', 'lime', 'blue', 'yellow', 'orange', 'purple', 'black', 'gray', 'white'
 * @property {string} zeroLineColor - 'red', 'green', 'lime', 'blue', 'yellow', 'orange', 'purple', 'black', 'gray', 'white'
 * @property {string} axisColor - 'red', 'green', 'lime', 'blue', 'yellow', 'orange', 'purple', 'black', 'gray', 'white'
 * @property {string} labelColor - 'red', 'green', 'lime', 'blue', 'yellow', 'orange', 'purple', 'black', 'gray', 'white'
 * @property {string} titleColor - 'red', 'green', 'lime', 'blue', 'yellow', 'orange', 'purple', 'black', 'gray', 'white'
 * @property {string} backgroundColor - 'red', 'green', 'lime', 'blue', 'yellow', 'orange', 'purple', 'black', 'gray', 'white'
 */
export class ColorSettings {
  #graphLineColor
  #graphDotColor
  #zeroLineColor
  #axisColor
  #labelColor
  #titleColor
  #backgroundColor

  constructor (graphLineColor, graphDotColor, zeroLineColor, axisColor, labelColor, titleColor, backgroundColor) {
    const defaultColor = 'black'
    const backgroundDefaultColor = 'white'
    const validColors = ['red', 'green', 'lime', 'blue', 'yellow', 'orange', 'purple', 'black', 'gray', 'white']
    const mockArgumentObject = { graphLineColor: graphLineColor, graphDotColor: graphDotColor, zeroLineColor: zeroLineColor, axisColor: axisColor, labelColor: labelColor, titleColor: titleColor, backgroundColor: backgroundColor }
    const validator = new validationCollection({ validValues: validColors })

    if(!validator.isObject.thatMustHaveSanctionedValues(mockArgumentObject)) {
      throw new TypeError(validator.reportAsString)
    }
    this.#graphLineColor = graphLineColor || defaultColor
    this.#graphDotColor = graphDotColor || defaultColor
    this.#zeroLineColor = zeroLineColor || defaultColor
    this.#axisColor = axisColor || defaultColor
    this.#labelColor = labelColor || defaultColor
    this.#titleColor = titleColor || defaultColor
    this.#backgroundColor = backgroundColor || backgroundDefaultColor
  }

  clone() {
    return new ColorSettings(this.#graphLineColor, this.#graphDotColor, this.#zeroLineColor, this.#axisColor, this.#labelColor, this.#titleColor, this.#backgroundColor)
  }

  applySettings(colorSettings) {
    for (const colorRequestObject of colorSettings) {
      const key = Object.keys(colorRequestObject)[0]
      this[key] = colorRequestObject[key]
    }
  }

  get graphLineColor () {
    return this.#graphLineColor
  }

  get graphDotColor () {
    return this.#graphDotColor
  }

  get zeroLineColor () {
    return this.#zeroLineColor
  }

  get axisColor () {
    return this.#axisColor
  }

  get labelColor () {
    return this.#labelColor
  }

  get titleColor () {
    return this.#titleColor
  }

  get backgroundColor () {
    return this.#backgroundColor
  }

  #validateColorString (color) {
    const validator = new validationCollection({ validValues: ['red', 'green', 'lime', 'blue', 'yellow', 'orange', 'purple', 'black', 'gray', 'white'] })
    if (!validator.isString(color)) {
      throw new TypeError(validator.reportAsString)
    }
  }

  set graphLineColor (color) {
    this.#validateColorString(color)
    this.#graphLineColor = color
  }

  set graphDotColor (color) {
    this.#validateColorString(color)
    this.#graphDotColor = color
  }

  set zeroLineColor (color) {
    this.#validateColorString(color)
    this.#zeroLineColor = color
  }

  set axisColor (color) {
    this.#validateColorString(color)
    this.#axisColor = color
  }

  set labelColor (color) {
    this.#validateColorString(color)
    this.#labelColor = color
  }

  set titleColor (color) {
    this.#validateColorString(color)
    this.#titleColor = color
  }

  set backgroundColor (color) {
    this.#validateColorString(color)
    this.#backgroundColor = color
  }
}