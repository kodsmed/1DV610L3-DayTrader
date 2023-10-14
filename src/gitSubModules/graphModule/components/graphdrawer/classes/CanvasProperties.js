/**
 * This class is used to calculate and store the properties of the canvas.
 *
 * @typedef {Object} CanvasProperties
 * @param {HTMLCanvasElement} canvas - The canvas element.
 * @property {number} width - The total width of the canvas.
 * @property {number} height - The total height of the canvas.
 * @property {number} marginWidth - The margins on the sides of the graphrendering area.
 * @property {number} marginHeight - The margins on the top and bottom of the graphrendering area.
 * @property {number} renderAreaWidth - The width of the graphrendering area.
 * @property {number} renderAreaHeight - The height of the graphrendering area.
 */
export class CanvasProperties {
  constructor (canvas) {
    if (!(canvas instanceof HTMLCanvasElement)) {
      throw new TypeError('canvas must be an instance of HTMLCanvasElement')
    }
    const computedStyle = getComputedStyle(canvas)
    const baseTen = 10 // We're using base 10. Don't change.
    const marginRatio = 0.10 // 15% margin, 65% render area. Change if you want to.
    this.width = parseInt(computedStyle.getPropertyValue('width'), baseTen)
    this.height = parseInt(computedStyle.getPropertyValue('height'), baseTen)
    this.marginWidth = this.width * marginRatio
    this.marginHeight = this.height * marginRatio
    this.renderAreaWidth = this.width - this.marginWidth * 2
    this.renderAreaHeight = this.height - this.marginHeight * 2
  }
}