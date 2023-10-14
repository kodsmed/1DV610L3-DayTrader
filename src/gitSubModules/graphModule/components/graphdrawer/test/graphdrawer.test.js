import jk224jvGraphdrawer from '../graphdrawer.js' // is marked as never used by IDE, but defines the custom element so it is needed.
import { AxisTitles } from '../classes/AxisTitles.js'
import { ColorSettings } from '../classes/ColorSettings.js'
import { Validators } from '../classes/utilities/Validators.js'
import { FontSettings } from '../classes/FontSettings.js'
import { expect, jest } from '@jest/globals'

/**
 * Test the graphdrawer class.
 * this is the main class that draws the graph and defines the custom element.
 *
 * @see graphdrawer
 * It should have the following properties:
 * @property {HTMLCanvasElement} canvas - The canvas element.
 * @property {number} numberOfStepsOnYAxis - The number of steps on the y axis.
 * @property {number} maxNumberOfStepsOnXAxis - The maximum number of steps on the x axis.
 * @property {FontSettings} fontSettings - The font settings of the graph.
 * @property {ColorSettings} colorSettings - The color settings of the graph.
 * @property {AxisTitles} axisTitles - The titles of the axes.
 */
describe('GraphDrawer', () => {

  let graphdrawerElement
  let ValidatorsSpy = jest.spyOn(Validators.prototype, 'verifyDatasetIntegrity')

  beforeEach(() => {
    graphdrawerElement = document.createElement('jk224jv-graphdrawer')
    document.body.appendChild(graphdrawerElement)
    graphdrawerElement.setColors([{ graphLineColor: 'black' }, { graphDotColor: 'black' }, { zeroLineColor: 'gray' }, { axisColor: 'black' }, { labelColor: 'black' }, { titleColor: 'black' }])
  })

  afterEach(() => {
    document.body.removeChild(graphdrawerElement)
  })

  describe('custom element', () => {
    it('should be defined', () => {
      expect(graphdrawerElement).toBeDefined()
    }),
      it('should have a shadow root', () => {
        expect(graphdrawerElement.shadowRoot).toBeDefined()
      }),
      it('should have a canvas element', () => {
        expect(graphdrawerElement.shadowRoot.querySelector('canvas')).toBeDefined()
      }),
      it('should have a canvas element with the id "canvas"', () => {
        expect(graphdrawerElement.shadowRoot.querySelector('canvas').id).toBe('canvas')
      }),
      it('the canvas element should have a width and height of 100%', () => {
        // The canvas needs to be rendered before we can get the computed style.
        requestAnimationFrame(() => {
          const computedStyle = getComputedStyle(graphdrawerElement.shadowRoot.querySelector('#canvas'))
          expect(computedStyle.width).toBe('100%')
          expect(computedStyle.height).toBe('100%')
        })
      })
  })

  describe('render', () => {
    it('should have a render method', () => {
      expect(graphdrawerElement.renderArrayAsGraph).toBeDefined()
    }),
      it('should call the verifyDatasetIntegrity method', () => {
        const spy = ValidatorsSpy
        // wait for the canvas to be rendered
        requestAnimationFrame(() => {
          graphdrawerElement.render([1, 2, 3])
          expect(spy).toHaveBeenCalled()
        })
        spy.mockRestore()
      })
  })

  describe('setters', () => {
    describe('setColors', () => {
      it('should have a setColors method', () => {
        expect(graphdrawerElement.setColors).toBeDefined()
      }),
        it('should throw TypeError if the argument is not an array of objects', () => {
          expect(() => graphdrawerElement.setColors(1)).toThrow(TypeError),
            expect(() => graphdrawerElement.setColors(null)).toThrow(TypeError),
            expect(() => graphdrawerElement.setColors(undefined)).toThrow(TypeError),
            expect(() => graphdrawerElement.setColors([])).toThrow(TypeError),
            expect(() => graphdrawerElement.setColors([1, 2, 3])).toThrow(TypeError),
            expect(() => graphdrawerElement.setColors([null, null, null])).toThrow(TypeError),
            expect(() => graphdrawerElement.setColors([undefined, undefined, undefined])).toThrow(TypeError),
            expect(() => graphdrawerElement.setColors(['string', 'string', 'string'])).toThrow(TypeError),
            expect(() => graphdrawerElement.setColors([NaN, NaN, NaN])).toThrow(TypeError)
        }),
        it('should throw TypeError on faulty objects in the array', () => {
          expect(() => graphdrawerElement.setColors([{ graphLineColor: 'red' }, 1, { graphDotColor: 'blue' }])).toThrow(TypeError),
            expect(() => graphdrawerElement.setColors([{ graphLineColor: 'red' }, null, { graphDotColor: 'blue' }])).toThrow(TypeError),
            expect(() => graphdrawerElement.setColors([{ graphLineColor: 'red' }, undefined, { graphDotColor: 'blue' }])).toThrow(TypeError),
            expect(() => graphdrawerElement.setColors([{ graphLineColor: 'red' }, 'string', { graphDotColor: 'blue' }])).toThrow(TypeError),
            expect(() => graphdrawerElement.setColors([{ graphLineColor: 'red' }, NaN, { graphDotColor: 'blue' }])).toThrow(TypeError),
            expect(() => graphdrawerElement.setColors([{ graphLineColor: 'red' }, { graphDotColor: 'blue' }, 1])).toThrow(TypeError),
            expect(() => graphdrawerElement.setColors([{ graphLineColor: 'red' }, { graphDotColor: 'blue' }, null])).toThrow(TypeError),
            expect(() => graphdrawerElement.setColors([{ graphLineColor: 'red' }, { graphDotColor: 'blue' }, undefined])).toThrow(TypeError),
            expect(() => graphdrawerElement.setColors([{ graphLineColor: 'red' }, { graphDotColor: 'blue' }, 'string'])).toThrow(TypeError),
            expect(() => graphdrawerElement.setColors([{ graphLineColor: 'red' }, { graphDotColor: 'blue' }, NaN])).toThrow(TypeError)
        }),

        describe('setAxisTitles', () => {
          it('should have a setAxisTitles method', () => {
            expect(graphdrawerElement.setAxisTitles).toBeDefined()
          }),
            it('should throw TypeError if the argument is not an object', () => {
              expect(() => graphdrawerElement.setAxisTitles(1)).toThrow(TypeError),
                expect(() => graphdrawerElement.setAxisTitles(null)).toThrow(TypeError),
                expect(() => graphdrawerElement.setAxisTitles(undefined)).toThrow(TypeError),
                expect(() => graphdrawerElement.setAxisTitles([])).toThrow(TypeError),
                expect(() => graphdrawerElement.setAxisTitles('string')).toThrow(TypeError),
                expect(() => graphdrawerElement.setAxisTitles(NaN)).toThrow(TypeError)
            }),
            it('should throw TypeError if the argument is an empty object', () => {
              expect(() => graphdrawerElement.setAxisTitles({})).toThrow(TypeError)
            }),
            it('should throw TypeError if either argument contains a non-string', () => {
              expect(() => graphdrawerElement.setAxisTitles({ xAxis: 1, yAxis: 2 })).toThrow(TypeError),
                expect(() => graphdrawerElement.setAxisTitles({ xAxis: null, yAxis: null })).toThrow(TypeError),
                expect(() => graphdrawerElement.setAxisTitles({ xAxis: undefined, yAxis: undefined })).toThrow(TypeError),
                expect(() => graphdrawerElement.setAxisTitles({ xAxis: [], yAxis: [] })).toThrow(TypeError),
                expect(() => graphdrawerElement.setAxisTitles({ xAxis: {}, yAxis: {} })).toThrow(TypeError),
                expect(() => graphdrawerElement.setAxisTitles({ xAxis: NaN, yAxis: NaN })).toThrow(TypeError)
              expect(() => graphdrawerElement.setAxisTitles({ xAxis: 'string', yAxis: 2 })).toThrow(TypeError),
                expect(() => graphdrawerElement.setAxisTitles({ xAxis: 1, yAxis: 'string' })).toThrow(TypeError),
                expect(() => graphdrawerElement.setAxisTitles({ xAxis: 'string', yAxis: null })).toThrow(TypeError),
                expect(() => graphdrawerElement.setAxisTitles({ xAxis: null, yAxis: 'string' })).toThrow(TypeError),
                expect(() => graphdrawerElement.setAxisTitles({ xAxis: 'string', yAxis: undefined })).toThrow(TypeError),
                expect(() => graphdrawerElement.setAxisTitles({ xAxis: undefined, yAxis: 'string' })).toThrow(TypeError),
                expect(() => graphdrawerElement.setAxisTitles({ xAxis: 'string', yAxis: [] })).toThrow(TypeError),
                expect(() => graphdrawerElement.setAxisTitles({ xAxis: [], yAxis: 'string' })).toThrow(TypeError),
                expect(() => graphdrawerElement.setAxisTitles({ xAxis: 'string', yAxis: {} })).toThrow(TypeError),
                expect(() => graphdrawerElement.setAxisTitles({ xAxis: {}, yAxis: 'string' })).toThrow(TypeError),
                expect(() => graphdrawerElement.setAxisTitles({ xAxis: 'string', yAxis: NaN })).toThrow(TypeError),
                expect(() => graphdrawerElement.setAxisTitles({ xAxis: NaN, yAxis: 'string' })).toThrow(TypeError)
            }),
            it('should throw TypeError if a non-valid property is passed in', () => {
              expect(() => graphdrawerElement.setAxisTitles({ xAxis: 'string', yAxis: 'string', zAxis: 'string' })).toThrow(TypeError),
                expect(() => graphdrawerElement.setAxisTitles({ unvalidProperty: 'string', yAxis: 'string' })).toThrow(TypeError),
                expect(() => graphdrawerElement.setAxisTitles({ xAxis: 'string', unvalidProperty: 'string' })).toThrow(TypeError)
            })
        })

      describe('setFontSettings', () => {
        it('should have a setFontSettings method', () => {
          expect(graphdrawerElement.setFontSettings).toBeDefined()
        }),

          it('should throw TypeError if the argument is not an object', () => {
            expect(() => graphdrawerElement.setFontSettings(1)).toThrow(TypeError),
              expect(() => graphdrawerElement.setFontSettings(null)).toThrow(TypeError),
              expect(() => graphdrawerElement.setFontSettings(undefined)).toThrow(TypeError),
              expect(() => graphdrawerElement.setFontSettings([])).toThrow(TypeError),
              expect(() => graphdrawerElement.setFontSettings('string')).toThrow(TypeError),
              expect(() => graphdrawerElement.setFontSettings(NaN)).toThrow(TypeError)
          }),

          it('should throw TypeError if the argument is an empty object', () => {
            expect(() => graphdrawerElement.setFontSettings({})).toThrow(TypeError)
          }),

          it('should throw TypeError if any of the properties are missing or invalid', () => {
            expect(() => graphdrawerElement.setFontSettings({ fontFamily: 'string', labelFontSize: 10 })).toThrow(TypeError),
              expect(() => graphdrawerElement.setFontSettings({ fontFamily: 'string', titleFontSize: 10 })).toThrow(TypeError),
              expect(() => graphdrawerElement.setFontSettings({ labelFontSize: 10, titleFontSize: 10 })).toThrow(TypeError),
              expect(() => graphdrawerElement.setFontSettings({ fontFamily: 1, labelFontSize: 10, titleFontSize: 10 })).toThrow(TypeError),
              expect(() => graphdrawerElement.setFontSettings({ fontFamily: null, labelFontSize: 10, titleFontSize: 10 })).toThrow(TypeError),
              expect(() => graphdrawerElement.setFontSettings({ fontFamily: undefined, labelFontSize: 10, titleFontSize: 10 })).toThrow(TypeError),
              expect(() => graphdrawerElement.setFontSettings({ fontFamily: [], labelFontSize: 10, titleFontSize: 10 })).toThrow(TypeError),
              expect(() => graphdrawerElement.setFontSettings({ fontFamily: {}, labelFontSize: 10, titleFontSize: 10 })).toThrow(TypeError),
              expect(() => graphdrawerElement.setFontSettings({ fontFamily: NaN, labelFontSize: 10, titleFontSize: 10 })).toThrow(TypeError),
              expect(() => graphdrawerElement.setFontSettings({ fontFamily: 'string', labelFontSize: 'string', titleFontSize: 10 })).toThrow(TypeError),
              expect(() => graphdrawerElement.setFontSettings({ fontFamily: 'string', labelFontSize: 10, titleFontSize: 'string' })).toThrow(TypeError),
              expect(() => graphdrawerElement.setFontSettings({ fontFamily: 'string', labelFontSize: null, titleFontSize: 10 })).toThrow(TypeError),
              expect(() => graphdrawerElement.setFontSettings({ fontFamily: 'string', labelFontSize: 10, titleFontSize: null })).toThrow(TypeError),
              expect(() => graphdrawerElement.setFontSettings({ fontFamily: 'string', labelFontSize: undefined, titleFontSize: 10 })).toThrow(TypeError),
              expect(() => graphdrawerElement.setFontSettings({ fontFamily: 'string', labelFontSize: 10, titleFontSize: undefined })).toThrow(TypeError),
              expect(() => graphdrawerElement.setFontSettings({ fontFamily: 'string', labelFontSize: [], titleFontSize: 10 })).toThrow(TypeError),
              expect(() => graphdrawerElement.setFontSettings({ fontFamily: 'string', labelFontSize: 10, titleFontSize: [] })).toThrow(TypeError),
              expect(() => graphdrawerElement.setFontSettings({ fontFamily: 'string', labelFontSize: {}, titleFontSize: 10 })).toThrow(TypeError),
              expect(() => graphdrawerElement.setFontSettings({ fontFamily: 'string', labelFontSize: 10, titleFontSize: {} })).toThrow(TypeError),
              expect(() => graphdrawerElement.setFontSettings({ fontFamily: 'string', labelFontSize: NaN, titleFontSize: 10 })).toThrow(TypeError),
              expect(() => graphdrawerElement.setFontSettings({ fontFamily: 'string', labelFontSize: 10, titleFontSize: NaN })).toThrow(TypeError),
              expect(() => graphdrawerElement.setFontSettings({ fontFamily: 'string', labelFontSize: -1, titleFontSize: 10 })).toThrow(TypeError),
              expect(() => graphdrawerElement.setFontSettings({ fontFamily: 'string', labelFontSize: 10, titleFontSize: -1 })).toThrow(TypeError),
              expect(() => graphdrawerElement.setFontSettings({ fontFamily: '', labelFontSize: 10, titleFontSize: 10 })).toThrow(TypeError)
          }),

          it('should throw TypeError if there are any extra properties', () => {
            expect(() => graphdrawerElement.setFontSettings({ fontFamily: 'string', labelFontSize: 10, titleFontSize: 10, extraProperty: 'string' })).toThrow(TypeError)
          })
      }),

        describe('set Size', () => {
          it('should have a setSize method', () => {
            expect(graphdrawerElement.setSize).toBeDefined()
          }),

            it('should throw TypeError if the argument is not an object', () => {
              expect(() => graphdrawerElement.setSize(1)).toThrow(TypeError),
                expect(() => graphdrawerElement.setSize(null)).toThrow(TypeError),
                expect(() => graphdrawerElement.setSize(undefined)).toThrow(TypeError),
                expect(() => graphdrawerElement.setSize([])).toThrow(TypeError),
                expect(() => graphdrawerElement.setSize('string')).toThrow(TypeError),
                expect(() => graphdrawerElement.setSize(NaN)).toThrow(TypeError)
            }),

            it('should throw TypeError if the argument is an empty object', () => {
              expect(() => graphdrawerElement.setSize({})).toThrow(TypeError)
            }),

            it('should throw TypeError if the argument does not contain a width or height property', () => {
              expect(() => graphdrawerElement.setSize({ width: 1 })).toThrow(TypeError),
                expect(() => graphdrawerElement.setSize({ height: 1 })).toThrow(TypeError)
            }),

            it('should throw TypeError if any other property is passed in', () => {
              expect(() => graphdrawerElement.setSize({ width: 1, height: 1, extraProperty: 'string' })).toThrow(TypeError)
              expect(() => graphdrawerElement.setSize({ width: 1, extraProperty: 'string' })).toThrow(TypeError),
                expect(() => graphdrawerElement.setSize({ height: 1, extraProperty: 'string' })).toThrow(TypeError)
            }),

            it('should throw TypeError if the width or height property is not a string', () => {
              expect(() => graphdrawerElement.setSize({ width: '100%', height: 1 })).toThrow(TypeError),
                expect(() => graphdrawerElement.setSize({ width: 1, height: '100%' })).toThrow(TypeError),
                expect(() => graphdrawerElement.setSize({ width: null, height: '100%' })).toThrow(TypeError),
                expect(() => graphdrawerElement.setSize({ width: '100%', height: null })).toThrow(TypeError),
                expect(() => graphdrawerElement.setSize({ width: undefined, height: '100%' })).toThrow(TypeError),
                expect(() => graphdrawerElement.setSize({ width: '100%', height: undefined })).toThrow(TypeError),
                expect(() => graphdrawerElement.setSize({ width: [], height: '100%' })).toThrow(TypeError),
                expect(() => graphdrawerElement.setSize({ width: '100%', height: [] })).toThrow(TypeError),
                expect(() => graphdrawerElement.setSize({ width: {}, height: '100%' })).toThrow(TypeError),
                expect(() => graphdrawerElement.setSize({ width: '100%', height: {} })).toThrow(TypeError),
                expect(() => graphdrawerElement.setSize({ width: NaN, height: '100%' })).toThrow(TypeError),
                expect(() => graphdrawerElement.setSize({ width: '100%', height: NaN })).toThrow(TypeError)
            }),

            it('should throw TypeError if the width or height property is not a valid css value', () => {
              expect(() => graphdrawerElement.setSize({ width: '100', height: '100%' })).toThrow(TypeError),
                expect(() => graphdrawerElement.setSize({ width: '100%', height: '100' })).toThrow(TypeError),
                expect(() => graphdrawerElement.setSize({ width: '100', height: '100px' })).toThrow(TypeError),
                expect(() => graphdrawerElement.setSize({ width: '100px', height: '100' })).toThrow(TypeError)
            }),

            it('should set the width and height of the canvas element', () => {
              graphdrawerElement.setSize({ width: '100px', height: '200px' })
              requestAnimationFrame(() => {
                expect(graphdrawerElement.shadowRoot.querySelector('canvas').width).toBe(100)
                expect(graphdrawerElement.shadowRoot.querySelector('canvas').height).toBe(200)
              })
            })
        })
    })
  })
})