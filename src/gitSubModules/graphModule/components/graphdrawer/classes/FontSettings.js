/**
 * @typedef {Object} FontSettings
 * @property {string} font - 'Arial, Helvetica, sans-serif' etc.
 * @property {number} fontSizeLabel positive integer
 */
export class FontSettings {
  fontFamily
  fontSizeLabel
  fontSizeTitle

  constructor (fontFamily, fontSizeLabel, fontSizeTitle) {
    if (typeof fontFamily !== 'string') {
      throw new TypeError('font must be a string')
    }
    if (typeof fontSizeLabel !== 'number' || fontSizeLabel < 0) {
      throw new TypeError('fontSizeLabel must be a positiv number')
    }
    if (typeof fontSizeTitle !== 'number' || fontSizeTitle < 0) {
      throw new TypeError('fontSizeTitle must be a positiv number')
    }
    this.fontFamily = fontFamily
    this.fontSizeLabel = fontSizeLabel
    this.fontSizeTitle = fontSizeTitle
  }

  applySettings(fontSettings) {
    for (const fontRequestObject of fontSettings) {
      const key = Object.keys(fontRequestObject)[0]
      this[key] = fontRequestObject[key]
    }
  }


  get ctxLabelStyle () {
    return `${this.fontSizeLabel}px ${this.fontFamily}`
  }

  get ctxTitleStyle () {
    return `${this.fontSizeTitle}px ${this.fontFamily}`
  }
}
