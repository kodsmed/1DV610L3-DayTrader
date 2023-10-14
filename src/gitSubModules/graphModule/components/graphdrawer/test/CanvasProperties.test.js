import { CanvasProperties } from '../classes/CanvasProperties.js'

/**
 * Test the CanvasProperties class.
 * CanvasProperties is a simple class that stores the properties of the canvas.
 *
 * @see CanvasProperties
 * It should have the following properties:
 * @property {number} width - The total width of the canvas.
 * @property {number} height - The total height of the canvas.
 * @property {number} marginWidth - The width of the margin on the sides of the graphrendering area.
 * @property {number} marginHeight - The height of the margin on the top and bottom of the graphrendering area.
 * @property {number} renderAreaWidth - The width of the graphrendering area.
 * @property {number} renderAreaHeight - The height of the graphrendering area.
 */

// make a canvas element so we can test the canvas properties
beforeAll(() => {
  const canvas = document.createElement('canvas')
  canvas.id = 'canvas'
  canvas.width = 400
  canvas.height = 300
  document.body.appendChild(canvas)
})

afterAll(() => {
  const canvas = document.getElementById('canvas')
  document.body.removeChild(canvas)
})

describe('CanvasProperties', () => {
  describe('constructor', () => {
    it('should throw a TypeError if canvas is not a canvas element', () => {
      expect(() => new CanvasProperties(1)).toThrow(TypeError)
    }),
    it('should throw a TypeError if canvas is null', () => {
      expect(() => new CanvasProperties(null)).toThrow(TypeError)
    }),
    it('should throw a TypeError if canvas is undefined', () => {
      expect(() => new CanvasProperties(undefined)).toThrow(TypeError)
    }),

    // wait for the canvas to be created
    requestAnimationFrame(() => {
      const canvas = document.getElementById('canvas')
      const canvasProperties = new CanvasProperties(canvas)
      it('should set the width property', () => {
          expect(canvasProperties.width).toBe(400)
      }),
      it('should set the height property', () => {
        expect(canvasProperties.height).toBe(300)
      }),
      it('should set the marginWidth property', () => {
        expect(canvasProperties.marginWidth).toBe(40)
      }),
      it('should set the marginHeight property', () => {
        expect(canvasProperties.marginHeight).toBe(30)
      }),
      it('should set the renderAreaWidth property', () => {
        expect(canvasProperties.renderAreaWidth).toBe(320)
      }),
      it('should set the renderAreaHeight property', () => {
        expect(canvasProperties.renderAreaHeight).toBe(240)
      })
    })
  })
})