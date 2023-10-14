import { GraphAndCanvasData } from '../classes/GraphAndCanvasData.js'
import { GraphProperties } from '../classes/GraphProperties.js'
import { CanvasProperties } from '../classes/CanvasProperties.js'
import { AxisTitles } from '../classes/AxisTitles.js'
import { FontSettings } from '../classes/FontSettings.js'
import { ColorSettings } from '../classes/ColorSettings.js'
import { expect, jest, test } from '@jest/globals'

/**
 * Test the GraphAndCanvasData class.
 * GraphAndCanvasData is a simple but big class that stores all the data needed to draw the graph on the canvas
 * and is used to pass data to the various methods without having to pass a lot of parameters.
 * @see GraphAndCanvasData
 *
 * It contains the following classes:
 * @see ColorSettings
 * @see FontSettings
 * @see GraphProperties
 * @see AxisTitles
 * @see CanvasProperties
 *
 * It should have the following properties:
 * @property {number} nonMagicZero - This is a non-magic zero. It's used to calculate the zero line. Don't change.
 * @property {CanvasProperties} canvasProperties - The properties of the canvas.
 * @property {GraphProperties} graphProperties - The properties of the graph.
 * @property {number[]} dataset - The dataset to draw.
 * @property {number} maxNumberOfLabelsOnXAxis - The maximum number of labels on the x-axis.
 * @property {number} numberOfLabelsOnYAxis - The fixed number of labels on the y-axis.
 * @property {FontSettings} fontSettings - The font settings for the graph.
 * @property {ColorSettings} colorSetting - The context of the canvas.
 * @property {object} ctx - The context of the canvas.
 * @property {AxisTitles} axisTitles - The titles of the axes.
 */

beforeAll(() => {
  // Mock the canvas
  const canvas = document.createElement('canvas')
  canvas.id = 'canvas'
  canvas.width = 1000
  canvas.height = 1000
  document.body.appendChild(canvas)
})

afterAll(() => {
  const canvas = document.getElementById('canvas')
  document.body.removeChild(canvas)
})

describe('GraphAndCanvasData', () => {
  describe('constructor', () => {
    it('should throw a TypeError if canvasProperties is not a valid CanvasProperties object', () => {
      // Wait for the canvas to be created
      requestAnimationFrame(() => {
        //const validCanvasProperties = new CanvasProperties(document.getElementById('canvas'))
        const validGraphProperties = new GraphProperties([1,2,3])
        const validDataset = [1,2,3]
        const validMaxNumberOfLabelsOnXAxis = 20
        const validNumberOfLabelsOnYAxis = 10
        const validFontSettings = new FontSettings('Arial', 12, 'black')
        const validColorSettings = new ColorSettings('black', 'white', 'red', 'green', 'blue', 'black')
        const validCtx = document.getElementById('canvas').getContext('2d')
        const validAxisTitles = new AxisTitles('x', 'y')

        expect(() => new GraphAndCanvasData('nonValid', validGraphProperties, validDataset, validMaxNumberOfLabelsOnXAxis, validNumberOfLabelsOnYAxis, validFontSettings, validColorSettings, validCtx, validAxisTitles)).toThrow(TypeError),
        expect(() => new GraphAndCanvasData(1, validGraphProperties, validDataset, validMaxNumberOfLabelsOnXAxis, validNumberOfLabelsOnYAxis, validFontSettings, validColorSettings, validCtx, validAxisTitles)).toThrow(TypeError),
        expect(() => new GraphAndCanvasData(null, validGraphProperties, validDataset, validMaxNumberOfLabelsOnXAxis, validNumberOfLabelsOnYAxis, validFontSettings, validColorSettings, validCtx, validAxisTitles)).toThrow(TypeError),
        expect(() => new GraphAndCanvasData(undefined, validGraphProperties, validDataset, validMaxNumberOfLabelsOnXAxis, validNumberOfLabelsOnYAxis, validFontSettings, validColorSettings, validCtx, validAxisTitles)).toThrow(TypeError)
      })
    }),
    it('should throw a TypeError if graphProperties is not a valid GraphProperties object', () => {
      // Wait for the canvas to be created
      requestAnimationFrame(() => {
        const validCanvasProperties = new CanvasProperties(document.getElementById('canvas'))
        //const validGraphProperties = new GraphProperties([1,2,3])
        const validDataset = [1,2,3]
        const validMaxNumberOfLabelsOnXAxis = 20
        const validNumberOfLabelsOnYAxis = 10
        const validFontSettings = new FontSettings('Arial', 12, 'black')
        const validColorSettings = new ColorSettings('black', 'white', 'red', 'green', 'blue', 'black')
        const validCtx = document.getElementById('canvas').getContext('2d')
        const validAxisTitles = new AxisTitles('x', 'y')

        expect(() => new GraphAndCanvasData(validCanvasProperties, 'nonValid', validDataset, validMaxNumberOfLabelsOnXAxis, validNumberOfLabelsOnYAxis, validFontSettings, validColorSettings, validCtx, validAxisTitles)).toThrow(TypeError),
        expect(() => new GraphAndCanvasData(validCanvasProperties, 1, validDataset, validMaxNumberOfLabelsOnXAxis, validNumberOfLabelsOnYAxis, validFontSettings, validColorSettings, validCtx, validAxisTitles)).toThrow(TypeError),
        expect(() => new GraphAndCanvasData(validCanvasProperties, null, validDataset, validMaxNumberOfLabelsOnXAxis, validNumberOfLabelsOnYAxis, validFontSettings, validColorSettings, validCtx, validAxisTitles)).toThrow(TypeError),
        expect(() => new GraphAndCanvasData(validCanvasProperties, undefined, validDataset, validMaxNumberOfLabelsOnXAxis, validNumberOfLabelsOnYAxis, validFontSettings, validColorSettings, validCtx, validAxisTitles)).toThrow(TypeError),
        expect(() => new GraphAndCanvasData(validCanvasProperties, [null, 1, 2], validDataset, validMaxNumberOfLabelsOnXAxis, validNumberOfLabelsOnYAxis, validFontSettings, validColorSettings, validCtx, validAxisTitles)).toThrow(TypeError),
        expect(() => new GraphAndCanvasData(validCanvasProperties, [1, undefined, 3], validDataset, validMaxNumberOfLabelsOnXAxis, validNumberOfLabelsOnYAxis, validFontSettings, validColorSettings, validCtx, validAxisTitles)).toThrow(TypeError),
        expect(() => new GraphAndCanvasData(validCanvasProperties, [1, 2, NaN], validDataset, validMaxNumberOfLabelsOnXAxis, validNumberOfLabelsOnYAxis, validFontSettings, validColorSettings, validCtx, validAxisTitles)).toThrow(TypeError),
        expect(() => new GraphAndCanvasData(validCanvasProperties, Infinity, validDataset, validMaxNumberOfLabelsOnXAxis, validNumberOfLabelsOnYAxis, validFontSettings, validColorSettings, validCtx, validAxisTitles)).toThrow(TypeError),
        expect(() => new GraphAndCanvasData(validCanvasProperties, -Infinity, validDataset, validMaxNumberOfLabelsOnXAxis, validNumberOfLabelsOnYAxis, validFontSettings, validColorSettings, validCtx, validAxisTitles)).toThrow(TypeError)
      })
    }),
    it('should throw a TypeError if dataset is not a valid array', () => {
      // Wait for the canvas to be created
      requestAnimationFrame(() => {
        const validCanvasProperties = new CanvasProperties(document.getElementById('canvas'))
        const validGraphProperties = new GraphProperties([1,2,3])
        //const validDataset = [1,2,3]
        const validMaxNumberOfLabelsOnXAxis = 20
        const validNumberOfLabelsOnYAxis = 10
        const validFontSettings = new FontSettings('Arial', 12, 'black')
        const validColorSettings = new ColorSettings('black', 'white', 'red', 'green', 'blue', 'black')
        const validCtx = document.getElementById('canvas').getContext('2d')
        const validAxisTitles = new AxisTitles('x', 'y')

        expect(()=> new GraphAndCanvasData(validCanvasProperties, validGraphProperties, 'nonValid', validMaxNumberOfLabelsOnXAxis, validNumberOfLabelsOnYAxis, validFontSettings, validColorSettings, validCtx, validAxisTitles)).toThrow(TypeError),
        expect(()=> new GraphAndCanvasData(validCanvasProperties, validGraphProperties, 1, validMaxNumberOfLabelsOnXAxis, validNumberOfLabelsOnYAxis, validFontSettings, validColorSettings, validCtx, validAxisTitles)).toThrow(TypeError),
        expect(()=> new GraphAndCanvasData(validCanvasProperties, validGraphProperties, null, validMaxNumberOfLabelsOnXAxis, validNumberOfLabelsOnYAxis, validFontSettings, validColorSettings, validCtx, validAxisTitles)).toThrow(TypeError),
        expect(()=> new GraphAndCanvasData(validCanvasProperties, validGraphProperties, undefined, validMaxNumberOfLabelsOnXAxis, validNumberOfLabelsOnYAxis, validFontSettings, validColorSettings, validCtx, validAxisTitles)).toThrow(TypeError),
        expect(()=> new GraphAndCanvasData(validCanvasProperties, validGraphProperties, {}, validMaxNumberOfLabelsOnXAxis, validNumberOfLabelsOnYAxis, validFontSettings, validColorSettings, validCtx, validAxisTitles)).toThrow(TypeError),
        expect(()=> new GraphAndCanvasData(validCanvasProperties, validGraphProperties, true, validMaxNumberOfLabelsOnXAxis, validNumberOfLabelsOnYAxis, validFontSettings, validColorSettings, validCtx, validAxisTitles)).toThrow(TypeError),
        expect(()=> new GraphAndCanvasData(validCanvasProperties, validGraphProperties, false, validMaxNumberOfLabelsOnXAxis, validNumberOfLabelsOnYAxis, validFontSettings, validColorSettings, validCtx, validAxisTitles)).toThrow(TypeError),
        expect(()=> new GraphAndCanvasData(validCanvasProperties, validGraphProperties, [], validMaxNumberOfLabelsOnXAxis, validNumberOfLabelsOnYAxis, validFontSettings, validColorSettings, validCtx, validAxisTitles)).toThrow(TypeError),
        expect(()=> new GraphAndCanvasData(validCanvasProperties, validGraphProperties, NaN, validMaxNumberOfLabelsOnXAxis, validNumberOfLabelsOnYAxis, validFontSettings, validColorSettings, validCtx, validAxisTitles)).toThrow(TypeError),
        expect(()=> new GraphAndCanvasData(validCanvasProperties, validGraphProperties, Infinity, validMaxNumberOfLabelsOnXAxis, validNumberOfLabelsOnYAxis, validFontSettings, validColorSettings, validCtx, validAxisTitles)).toThrow(TypeError),
        expect(()=> new GraphAndCanvasData(validCanvasProperties, validGraphProperties, -Infinity, validMaxNumberOfLabelsOnXAxis, validNumberOfLabelsOnYAxis, validFontSettings, validColorSettings, validCtx, validAxisTitles)).toThrow(TypeError),
        expect(()=> new GraphAndCanvasData(validCanvasProperties, validGraphProperties, [1,2,NaN], validMaxNumberOfLabelsOnXAxis, validNumberOfLabelsOnYAxis, validFontSettings, validColorSettings, validCtx, validAxisTitles)).toThrow(TypeError),
        expect(()=> new GraphAndCanvasData(validCanvasProperties, validGraphProperties, [1,2,undefined], validMaxNumberOfLabelsOnXAxis, validNumberOfLabelsOnYAxis, validFontSettings, validColorSettings, validCtx, validAxisTitles)).toThrow(TypeError),
        expect(()=> new GraphAndCanvasData(validCanvasProperties, validGraphProperties, [1,2,null], validMaxNumberOfLabelsOnXAxis, validNumberOfLabelsOnYAxis, validFontSettings, validColorSettings, validCtx, validAxisTitles)).toThrow(TypeError),
        expect(()=> new GraphAndCanvasData(validCanvasProperties, validGraphProperties, [1,2,'string'], validMaxNumberOfLabelsOnXAxis, validNumberOfLabelsOnYAxis, validFontSettings, validColorSettings, validCtx, validAxisTitles)).toThrow(TypeError)
      })
    }),
    it('should throw a TypeError if maxNumberOfLabelsOnXAxis is not a valid number', () => {
      // Wait for the canvas to be created
      requestAnimationFrame(() => {
        const validCanvasProperties = new CanvasProperties(document.getElementById('canvas'))
        const validGraphProperties = new GraphProperties([1,2,3])
        const validDataset = [1,2,3]
        //const validMaxNumberOfLabelsOnXAxis = 20
        const validNumberOfLabelsOnYAxis = 10
        const validFontSettings = new FontSettings('Arial', 12, 'black')
        const validColorSettings = new ColorSettings('black', 'white', 'red', 'green', 'blue', 'black')
        const validCtx = document.getElementById('canvas').getContext('2d')
        const validAxisTitles = new AxisTitles('x', 'y')

        expect(()=> new GraphAndCanvasData(validCanvasProperties, validGraphProperties, validDataset, 'nonValid', validNumberOfLabelsOnYAxis, validFontSettings, validColorSettings, validCtx, validAxisTitles)).toThrow(TypeError),
        expect(()=> new GraphAndCanvasData(validCanvasProperties, validGraphProperties, validDataset, null, validNumberOfLabelsOnYAxis, validFontSettings, validColorSettings, validCtx, validAxisTitles)).toThrow(TypeError),
        expect(()=> new GraphAndCanvasData(validCanvasProperties, validGraphProperties, validDataset, undefined, validNumberOfLabelsOnYAxis, validFontSettings, validColorSettings, validCtx, validAxisTitles)).toThrow(TypeError),
        expect(()=> new GraphAndCanvasData(validCanvasProperties, validGraphProperties, validDataset, {}, validNumberOfLabelsOnYAxis, validFontSettings, validColorSettings, validCtx, validAxisTitles)).toThrow(TypeError),
        expect(()=> new GraphAndCanvasData(validCanvasProperties, validGraphProperties, validDataset, true, validNumberOfLabelsOnYAxis, validFontSettings, validColorSettings, validCtx, validAxisTitles)).toThrow(TypeError),
        expect(()=> new GraphAndCanvasData(validCanvasProperties, validGraphProperties, validDataset, false, validNumberOfLabelsOnYAxis, validFontSettings, validColorSettings, validCtx, validAxisTitles)).toThrow(TypeError),
        expect(()=> new GraphAndCanvasData(validCanvasProperties, validGraphProperties, validDataset, [], validNumberOfLabelsOnYAxis, validFontSettings, validColorSettings, validCtx, validAxisTitles)).toThrow(TypeError),
        expect(()=> new GraphAndCanvasData(validCanvasProperties, validGraphProperties, validDataset, NaN, validNumberOfLabelsOnYAxis, validFontSettings, validColorSettings, validCtx, validAxisTitles)).toThrow(TypeError),
        expect(()=> new GraphAndCanvasData(validCanvasProperties, validGraphProperties, validDataset, Infinity, validNumberOfLabelsOnYAxis, validFontSettings, validColorSettings, validCtx, validAxisTitles)).toThrow(TypeError),
        expect(()=> new GraphAndCanvasData(validCanvasProperties, validGraphProperties, validDataset, -Infinity, validNumberOfLabelsOnYAxis, validFontSettings, validColorSettings, validCtx, validAxisTitles)).toThrow(TypeError),
        expect(()=> new GraphAndCanvasData(validCanvasProperties, validGraphProperties, validDataset, 51, validNumberOfLabelsOnYAxis, validFontSettings, validColorSettings, validCtx, validAxisTitles)).toThrow(TypeError),
        expect(()=> new GraphAndCanvasData(validCanvasProperties, validGraphProperties, validDataset, 0, validNumberOfLabelsOnYAxis, validFontSettings, validColorSettings, validCtx, validAxisTitles)).toThrow(TypeError)
      })
    }),
    it('should throw a TypeError if numberOfLabelsOnYAxis is not a valid number', () => {
      // Wait for the canvas to be created
      requestAnimationFrame(() => {
        const validCanvasProperties = new CanvasProperties(document.getElementById('canvas'))
        const validGraphProperties = new GraphProperties([1,2,3])
        const validDataset = [1,2,3]
        const validMaxNumberOfLabelsOnXAxis = 20
        //const validNumberOfLabelsOnYAxis = 10
        const validFontSettings = new FontSettings('Arial', 12, 'black')
        const validColorSettings = new ColorSettings('black', 'white', 'red', 'green', 'blue', 'black')
        const validCtx = document.getElementById('canvas').getContext('2d')
        const validAxisTitles = new AxisTitles('x', 'y')

        expect(()=> new GraphAndCanvasData(validCanvasProperties, validGraphProperties, validDataset, validMaxNumberOfLabelsOnXAxis,
           'nonValid', validFontSettings, validColorSettings, validCtx, validAxisTitles)).toThrow(TypeError),
        expect(()=> new GraphAndCanvasData(validCanvasProperties, validGraphProperties, validDataset, validMaxNumberOfLabelsOnXAxis, null, validFontSettings, validColorSettings, validCtx, validAxisTitles)).toThrow(TypeError),
        expect(()=> new GraphAndCanvasData(validCanvasProperties, validGraphProperties, validDataset, validMaxNumberOfLabelsOnXAxis, undefined, validFontSettings, validColorSettings, validCtx, validAxisTitles)).toThrow(TypeError),
        expect(()=> new GraphAndCanvasData(validCanvasProperties, validGraphProperties, validDataset, validMaxNumberOfLabelsOnXAxis, {}, validFontSettings, validColorSettings, validCtx, validAxisTitles)).toThrow(TypeError),
        expect(()=> new GraphAndCanvasData(validCanvasProperties, validGraphProperties, validDataset, validMaxNumberOfLabelsOnXAxis, true, validFontSettings, validColorSettings, validCtx, validAxisTitles)).toThrow(TypeError),
        expect(()=> new GraphAndCanvasData(validCanvasProperties, validGraphProperties, validDataset, validMaxNumberOfLabelsOnXAxis, false, validFontSettings, validColorSettings, validCtx, validAxisTitles)).toThrow(TypeError),
        expect(()=> new GraphAndCanvasData(validCanvasProperties, validGraphProperties, validDataset, validMaxNumberOfLabelsOnXAxis, [], validFontSettings, validColorSettings, validCtx, validAxisTitles)).toThrow(TypeError),
        expect(()=> new GraphAndCanvasData(validCanvasProperties, validGraphProperties, validDataset, validMaxNumberOfLabelsOnXAxis, NaN, validFontSettings, validColorSettings, validCtx, validAxisTitles)).toThrow(TypeError),
        expect(()=> new GraphAndCanvasData(validCanvasProperties, validGraphProperties, validDataset, validMaxNumberOfLabelsOnXAxis, Infinity, validFontSettings, validColorSettings, validCtx, validAxisTitles)).toThrow(TypeError),
        expect(()=> new GraphAndCanvasData(validCanvasProperties, validGraphProperties, validDataset, validMaxNumberOfLabelsOnXAxis, -Infinity, validFontSettings, validColorSettings, validCtx, validAxisTitles)).toThrow(TypeError)
        })
      }),
      it('should throw a TypeError if fontSettings is not a valid FontSettings object', () => {
        // Wait for the canvas to be created
        requestAnimationFrame(() => {
          const validCanvasProperties = new CanvasProperties(document.getElementById('canvas'))
          const validGraphProperties = new GraphProperties([1,2,3])
          const validDataset = [1,2,3]
          const validMaxNumberOfLabelsOnXAxis = 20
          const validNumberOfLabelsOnYAxis = 10
          //const validFontSettings = new FontSettings('Arial', 12, 'black')
          const validColorSettings = new ColorSettings('black', 'white', 'red', 'green', 'blue', 'black')
          const validCtx = document.getElementById('canvas').getContext('2d')
          const validAxisTitles = new AxisTitles('x', 'y')

          expect(()=> new GraphAndCanvasData(validCanvasProperties, validGraphProperties, validDataset, validMaxNumberOfLabelsOnXAxis, validNumberOfLabelsOnYAxis, 'nonValid', validColorSettings, validCtx, validAxisTitles)).toThrow(TypeError),
          expect(()=> new GraphAndCanvasData(validCanvasProperties, validGraphProperties, validDataset, validMaxNumberOfLabelsOnXAxis, validNumberOfLabelsOnYAxis, 1, validColorSettings, validCtx, validAxisTitles)).toThrow(TypeError),
          expect(()=> new GraphAndCanvasData(validCanvasProperties, validGraphProperties, validDataset, validMaxNumberOfLabelsOnXAxis, validNumberOfLabelsOnYAxis, null, validColorSettings, validCtx, validAxisTitles)).toThrow(TypeError),
          expect(()=> new GraphAndCanvasData(validCanvasProperties, validGraphProperties, validDataset, validMaxNumberOfLabelsOnXAxis, validNumberOfLabelsOnYAxis, undefined, validColorSettings, validCtx, validAxisTitles)).toThrow(TypeError)
        })
      }),
      it('should throw a TypeError if colorSettings is not a valid ColorSettings object', () => {
        // Wait for the canvas to be created
        requestAnimationFrame(() => {
          const validCanvasProperties = new CanvasProperties(document.getElementById('canvas'))
          const validGraphProperties = new GraphProperties([1,2,3])
          const validDataset = [1,2,3]
          const validMaxNumberOfLabelsOnXAxis = 20
          const validNumberOfLabelsOnYAxis = 10
          const validFontSettings = new FontSettings('Arial', 12, 'black')
          //const validColorSettings = new ColorSettings('black', 'white', 'red', 'green', 'blue', 'black')
          const validCtx = document.getElementById('canvas').getContext('2d')
          const validAxisTitles = new AxisTitles('x', 'y')

          expect(()=> new GraphAndCanvasData(validCanvasProperties, validGraphProperties, validDataset, validMaxNumberOfLabelsOnXAxis, validNumberOfLabelsOnYAxis, validFontSettings, 'nonValid', validCtx, validAxisTitles)).toThrow(TypeError),
          expect(()=> new GraphAndCanvasData(validCanvasProperties, validGraphProperties, validDataset, validMaxNumberOfLabelsOnXAxis, validNumberOfLabelsOnYAxis, validFontSettings, 1, validCtx, validAxisTitles)).toThrow(TypeError),
          expect(()=> new GraphAndCanvasData(validCanvasProperties, validGraphProperties, validDataset, validMaxNumberOfLabelsOnXAxis, validNumberOfLabelsOnYAxis, validFontSettings, null, validCtx, validAxisTitles)).toThrow(TypeError),
          expect(()=> new GraphAndCanvasData(validCanvasProperties, validGraphProperties, validDataset, validMaxNumberOfLabelsOnXAxis, validNumberOfLabelsOnYAxis, validFontSettings, undefined, validCtx, validAxisTitles)).toThrow(TypeError)
        })
      }),
      it('should throw a TypeError if ctx is not a valid context', () => {
        // Wait for the canvas to be created
        requestAnimationFrame(() => {
          const validCanvasProperties = new CanvasProperties(document.getElementById('canvas'))
          const validGraphProperties = new GraphProperties([1,2,3])
          const validDataset = [1,2,3]
          const validMaxNumberOfLabelsOnXAxis = 20
          const validNumberOfLabelsOnYAxis = 10
          const validFontSettings = new FontSettings('Arial', 12, 'black')
          const validColorSettings = new ColorSettings('black', 'white', 'red', 'green', 'blue', 'black')
          //const validCtx = document.getElementById('canvas').getContext('2d')
          const validAxisTitles = new AxisTitles('x', 'y')

          expect(()=> new GraphAndCanvasData(validCanvasProperties, validGraphProperties, validDataset, validMaxNumberOfLabelsOnXAxis, validNumberOfLabelsOnYAxis, validFontSettings, validColorSettings, 'nonValid', validAxisTitles)).toThrow(TypeError),
          expect(()=> new GraphAndCanvasData(validCanvasProperties, validGraphProperties, validDataset, validMaxNumberOfLabelsOnXAxis, validNumberOfLabelsOnYAxis, validFontSettings, validColorSettings, 1, validAxisTitles)).toThrow(TypeError),
          expect(()=> new GraphAndCanvasData(validCanvasProperties, validGraphProperties, validDataset, validMaxNumberOfLabelsOnXAxis, validNumberOfLabelsOnYAxis, validFontSettings, validColorSettings, null, validAxisTitles)).toThrow(TypeError),
          expect(()=> new GraphAndCanvasData(validCanvasProperties, validGraphProperties, validDataset, validMaxNumberOfLabelsOnXAxis, validNumberOfLabelsOnYAxis, validFontSettings, validColorSettings, undefined, validAxisTitles)).toThrow(TypeError),
          expect(()=> new GraphAndCanvasData(validCanvasProperties, validGraphProperties, validDataset, validMaxNumberOfLabelsOnXAxis, validNumberOfLabelsOnYAxis, validFontSettings, validColorSettings, {}, validAxisTitles)).toThrow(TypeError),
          expect(()=> new GraphAndCanvasData(validCanvasProperties, validGraphProperties, validDataset, validMaxNumberOfLabelsOnXAxis, validNumberOfLabelsOnYAxis, validFontSettings, validColorSettings, [], validAxisTitles)).toThrow(TypeError)
        })
      }),
      it('should throw a TypeError if axisTitles is not a valid AxisTitles object', () => {
        // Wait for the canvas to be created
        requestAnimationFrame(() => {
          const validCanvasProperties = new CanvasProperties(document.getElementById('canvas'))
          const validGraphProperties = new GraphProperties([1,2,3])
          const validDataset = [1,2,3]
          const validMaxNumberOfLabelsOnXAxis = 20
          const validNumberOfLabelsOnYAxis = 10
          const validFontSettings = new FontSettings('Arial', 12, 'black')
          const validColorSettings = new ColorSettings('black', 'white', 'red', 'green', 'blue', 'black')
          const validCtx = document.getElementById('canvas').getContext('2d')
          //const validAxisTitles = new AxisTitles('x', 'y')

          expect(()=> new GraphAndCanvasData(validCanvasProperties, validGraphProperties, validDataset, validMaxNumberOfLabelsOnXAxis, validNumberOfLabelsOnYAxis, validFontSettings, validColorSettings, validCtx, 'nonValid')).toThrow(TypeError),
          expect(()=> new GraphAndCanvasData(validCanvasProperties, validGraphProperties, validDataset, validMaxNumberOfLabelsOnXAxis, validNumberOfLabelsOnYAxis, validFontSettings, validColorSettings, validCtx, 1)).toThrow(TypeError),
          expect(()=> new GraphAndCanvasData(validCanvasProperties, validGraphProperties, validDataset, validMaxNumberOfLabelsOnXAxis, validNumberOfLabelsOnYAxis, validFontSettings, validColorSettings, validCtx, null)).toThrow(TypeError),
          expect(()=> new GraphAndCanvasData(validCanvasProperties, validGraphProperties, validDataset, validMaxNumberOfLabelsOnXAxis, validNumberOfLabelsOnYAxis, validFontSettings, validColorSettings, validCtx, undefined)).toThrow(TypeError),
          expect(()=> new GraphAndCanvasData(validCanvasProperties, validGraphProperties, validDataset, validMaxNumberOfLabelsOnXAxis, validNumberOfLabelsOnYAxis, validFontSettings, validColorSettings, validCtx, {})).toThrow(TypeError),
          expect(()=> new GraphAndCanvasData(validCanvasProperties, validGraphProperties, validDataset, validMaxNumberOfLabelsOnXAxis, validNumberOfLabelsOnYAxis, validFontSettings, validColorSettings, validCtx, [])).toThrow(TypeError)
        })
      })
    })

    describe('getters', () => {

      // Wait for the canvas to be created
      requestAnimationFrame(() => {
        const validCanvasProperties = new CanvasProperties(document.getElementById('canvas'))
        const validGraphProperties = new GraphProperties([1,2,3])
        const validDataset = [1,2,3]
        const validMaxNumberOfLabelsOnXAxis = 20
        const validNumberOfLabelsOnYAxis = 10
        const validFontSettings = new FontSettings('Arial', 12, 'black')
        const validColorSettings = new ColorSettings('black', 'white', 'red', 'green', 'blue', 'black')
        const validCtx = document.getElementById('canvas').getContext('2d')
        const validAxisTitles = new AxisTitles('x', 'y')

        const graphAndCanvasData = new GraphAndCanvasData(validCanvasProperties, validGraphProperties, validDataset, validMaxNumberOfLabelsOnXAxis, validNumberOfLabelsOnYAxis, validFontSettings, validColorSettings, validCtx, validAxisTitles)

        it('should return the correct value for nonMagicZero', () => {
          expect(graphAndCanvasData.nonMagicZero).toBe(0)
        }),
        it('should return the correct value for canvasProperties', () => {
          expect(graphAndCanvasData.canvasProperties).toBe(validCanvasProperties)
        }),
        it('should return the correct value for graphProperties', () => {
          expect(graphAndCanvasData.graphProperties).toBe(validGraphProperties)
        }),
        it('should return the correct value for dataset', () => {
          expect(graphAndCanvasData.dataset).toBe(validDataset)
        }),
        it('should return the correct value for maxNumberOfLabelsOnXAxis', () => {
          expect(graphAndCanvasData.maxNumberOfLabelsOnXAxis).toBe(validMaxNumberOfLabelsOnXAxis)
        }),
        it('should return the correct value for numberOfLabelsOnYAxis', () => {
          expect(graphAndCanvasData.numberOfLabelsOnYAxis).toBe(validNumberOfLabelsOnYAxis)
        }),
        it('should return the correct value for fontSettings', () => {
          expect(graphAndCanvasData.fontSettings).toBe(validFontSettings)
        }),
        it('should return the correct value for colorSettings', () => {
          expect(graphAndCanvasData.colorSettings).toBe(validColorSettings)
        }),
        it('should return the correct value for ctx', () => {
          expect(graphAndCanvasData.ctx).toBe(validCtx)
        }),
        it('should return the correct value for axisTitles', () => {
          expect(graphAndCanvasData.axisTitles).toBe(validAxisTitles)
        })
      })
    })
  })