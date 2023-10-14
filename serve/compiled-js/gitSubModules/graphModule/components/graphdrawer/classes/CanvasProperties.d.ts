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
    constructor(canvas: any);
    width: number;
    height: number;
    marginWidth: number;
    marginHeight: number;
    renderAreaWidth: number;
    renderAreaHeight: number;
}
