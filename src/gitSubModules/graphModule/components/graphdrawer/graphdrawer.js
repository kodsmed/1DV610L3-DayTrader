/**
 * GraphDrawer is a Custom Web Element that renders a graph of an number[] on a canvas.
 *
 * @author Jimmy Karlsson <jk224jv@student.lnu.se>
 *
 * @ all users:
 * @see Please see the readme file for usage.
 *
 * @ developer: I use destructuring assignment and the nullish operator in this file.
 * They are newer and still uncommon feature of JavaScript so here is the docs for them:
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing_operator
 */
import { BackgroundRenderer } from './classes/renderers/BackgroundRenderer.js'
import { CanvasProperties } from './classes/CanvasProperties.js'
import { DataPointRenderer } from './classes/renderers/DataPointRenderer.js'
import { GraphProperties } from './classes/GraphProperties.js'
import { FontSettings } from './classes/FontSettings.js'
import { clearCanvas } from './classes/utilities/clearCanvas.js'
import { ColorSettings } from './classes/ColorSettings.js'
import { AxisTitles } from './classes/AxisTitles.js'
import { GraphAndCanvasData } from './classes/GraphAndCanvasData.js'
import { TitleRenderer } from './classes/renderers/TitleRenderer.js'
import { LineRenderer } from './classes/renderers/LineRenderer.js'
import { Validators } from './classes/utilities/Validators.js'
import { TemplateBuilder } from './classes/utilities/TemplateBuilder.js'
import { MathematicalConstants } from './enum/MathematicalConstants.js'
import { AxisRenderer } from './classes/renderers/AxisRenderer.js'
import { XAxisLabelRenderer } from './classes/renderers/XAxisLabelRenderer.js'
import { YAxisLabelRenderer } from './classes/renderers/YAxisLabelRenderer.js'
import { HorizontalGuideLineRenderer } from './classes/renderers/HorizontalGuideLineRenderer.js'
import { ZeroLineRenderer } from './classes/renderers/ZeroLineRenderer.js'
import { VerticalGuideLineRenderer } from './classes/renderers/VerticalGuideLineRenderer.js'


export default customElements.define('jk224jv-graphdrawer',
  class jk224jvGraphdrawer extends HTMLElement {
    #numberOfStepsOnYAxis
    #maxNumberOfStepsOnXAxis
    #fontSettings
    #colorSettings
    #axisTitles
    #xAxisLabels

    constructor() {
      const template = new TemplateBuilder().getDefaultTemplate()
      super()
      this.#numberOfStepsOnYAxis = MathematicalConstants.BaseTen
      this.#maxNumberOfStepsOnXAxis = 20 // < 0 and > 50 will cause errors.

      this.#fontSettings = new FontSettings('Arial', 12, 16) // {fontFamily, labelFontSize, titleFontSize}

      const initialColors = {
        graphLineColor: 'black',
        graphDotColor: 'black',
        zeroLineColor: 'gray',
        axisColor: 'black',
        labelColor: 'black',
        titleColor: 'black',
        backgroundColor: 'white'
      }
      this.#colorSettings = new ColorSettings(initialColors.graphLineColor, initialColors.graphDotColor, initialColors.zeroLineColor, initialColors.axisColor, initialColors.labelColor, initialColors.titleColor, initialColors.backgroundColor)

      this.#axisTitles = new AxisTitles('Index', 'Values')
      this.#xAxisLabels = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]

      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))
    }

    static get observedAttributes() { }


    clearCanvas() {
      clearCanvas(this.shadowRoot.querySelector('#canvas'))
    }

    renderArrayAsGraph(dataset) {
      const canvas = this.shadowRoot.querySelector('#canvas')
      const canvasProperties = new CanvasProperties(canvas)
      this.#setCanvasScale(canvas, canvasProperties)
      const graphAndCanvasDataObject = this.#graphAndCanvasDataObjectBuilder(canvas, dataset)

      new BackgroundRenderer().draw(graphAndCanvasDataObject)

      new AxisRenderer().drawYAxis(graphAndCanvasDataObject)
      new TitleRenderer().drawYAxisTitle(graphAndCanvasDataObject)
      new YAxisLabelRenderer().draw(graphAndCanvasDataObject)
      new HorizontalGuideLineRenderer().draw(graphAndCanvasDataObject)

      new AxisRenderer().drawXAxis(graphAndCanvasDataObject)
      new TitleRenderer().drawXAxisTitle(graphAndCanvasDataObject)
      new XAxisLabelRenderer(graphAndCanvasDataObject).draw(graphAndCanvasDataObject)
      new VerticalGuideLineRenderer(graphAndCanvasDataObject).draw(graphAndCanvasDataObject)

      new LineRenderer().draw(graphAndCanvasDataObject)
      new DataPointRenderer().draw(graphAndCanvasDataObject)

      new ZeroLineRenderer().drawIfInRange(graphAndCanvasDataObject)
    }

    #setCanvasScale(canvas, canvasProperties) {
      const ctx = canvas.getContext('2d')
      const devicePixelRatio = window.devicePixelRatio || 1
      canvas.width = canvasProperties.width * devicePixelRatio
      canvas.height = canvasProperties.height * devicePixelRatio
      ctx.scale(devicePixelRatio, devicePixelRatio)
    }

    verifyDataset(dataset) {
      new Validators().validateDataset(dataset)
    }

    #graphAndCanvasDataObjectBuilder(canvas, dataset) {
      const canvasProperties = new CanvasProperties(canvas)
      const graphProperties = new GraphProperties(dataset)

      return new GraphAndCanvasData(
          canvasProperties,
          graphProperties,
          dataset,
          this.#maxNumberOfStepsOnXAxis,
          this.#numberOfStepsOnYAxis,
          this.#fontSettings,
          this.#colorSettings,
          canvas.getContext('2d'),
          this.#axisTitles,
          this.#xAxisLabels
      )
    }

    setAxisTitles(axisTitles) {
      new Validators().validateAxisTitles(axisTitles)
      const currentAxisTitles = this.axisTitles

      this.#axisTitles = new AxisTitles(
        axisTitles.xAxis ?? currentAxisTitles.xAxis,
        axisTitles.yAxis ?? currentAxisTitles.yAxis
      )
    }

    setXAxisLabels(labels) {
      new Validators().validateXAxisLabels(labels)
      this.#xAxisLabels = labels
    }

    setColors(colorSettings) {
      new Validators().validateColorSettings(colorSettings)
      this.#colorSettings.applySettings(colorSettings)
    }

    /**
     * @param {Object} fontSettings - example: {fontFamily: 'Arial', labelFontSize: 12, titleFontSize: 16}
     */
    setFontSettings(fontSettings) {
      new Validators().validateFontSettings(fontSettings)
      this.#fontSettings.applySettings(fontSettings)
    }

    /**
     * @param {Object} size - example: {width: '100%', height: '250px'}
     */
    setSize(size) {
      new Validators().validateSizeObject(size)
      const container = this.shadowRoot.querySelector('#container')
      container.style.width = size.width
      container.style.height = size.height
    }
  })
