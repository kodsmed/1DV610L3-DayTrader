import { AxisTitles } from './AxisTitles.js'
import { CanvasProperties } from './CanvasProperties.js'
import { ColorSettings } from './ColorSettings.js'
import { FontSettings } from './FontSettings.js'
import { GraphProperties } from './GraphProperties.js'
import { MathematicalConstants } from './../enum/MathematicalConstants.js'
import validationCollection from 'validation-collection';

/**
 * This class is used to store everything that is needed to draw the graph.
 * @typedef {Object} GraphAndCanvasData
 * @property {CanvasProperties} canvasProperties - The properties of the canvas.
 * @property {GraphProperties} graphProperties - The properties of the graph.
 * @property {Array} dataset - The dataset to draw.
 * @property {number} maxNumberOfLabelsOnXAxis - The maximum number of labels on the x-axis.
 * @property {number} numberOfLabelsOnYAxis - The maximum number of labels on the y-axis.
 * @property {object} ctx - The context of the canvas.
 * @property {FontSettings} fontSettings - The font settings for the graph.
 * @property {ColorSettings} colorSetting - The color settings for the graph.
 * @property {AxisTitles} axisTitles - The titles of the axes.
 */
export class GraphAndCanvasData {
  constructor(
    canvasProperties,
    graphProperties,
    dataset,
    maxNumberOfLabelsOnXAxis,
    numberOfLabelsOnYAxis,
    fontSettings,
    colorSettings,
    ctx,
    axisTitles,
    xAxisLabels
  ) {
    this.verifyParameterTypes(
      canvasProperties,
      graphProperties,
      dataset,
      maxNumberOfLabelsOnXAxis,
      numberOfLabelsOnYAxis,
      fontSettings,
      colorSettings,
      ctx,
      axisTitles,
      xAxisLabels
    )
    this.canvasProperties = canvasProperties
    this.graphProperties = graphProperties
    this.dataset = dataset
    this.maxNumberOfLabelsOnXAxis = maxNumberOfLabelsOnXAxis
    this.numberOfLabelsOnYAxis = numberOfLabelsOnYAxis
    this.fontSettings = fontSettings
    this.colorSettings = colorSettings
    this.ctx = ctx
    this.axisTitles = axisTitles
    this.xAxisLabels = xAxisLabels
    this.numberOfSegments = this.#getNumberOfSegments(dataset)
    this.indexStepsPerSegment = this.#getIndexStepsPerSegment(dataset, this.numberOfSegments)
  }

  verifyParameterTypes(
    canvasProperties,
    graphProperties,
    dataset,
    maxNumberOfLabelsOnXAxis,
    numberOfLabelsOnYAxis,
    fontSettings,
    colorSettings,
    ctx,
    axisTitles,
    xAxisLabels
  ) {
    const validator = new validationCollection({ minimumNumberValue: 1, maximumNumberValue: 50, exactNumberValue: MathematicalConstants.BaseTen, validValueTypes: ['string'] })

    if (!(canvasProperties instanceof CanvasProperties)) {
      throw new TypeError('canvasProperties must be an instance of CanvasProperties')
    }
    if (!(graphProperties instanceof GraphProperties)) {
      throw new TypeError('graphProperties must be an instance of GraphProperties')
    }
    this.verifyDatasetIntegrity(dataset)
    if (!validator.isNumber.thatIsBetweenMinMax(maxNumberOfLabelsOnXAxis)) {
      throw new TypeError('maxNumberOfLabelsOnXAxis must be a number between 0 and 50')
    }
    if (!validator.isNumber.thatIsExactly(numberOfLabelsOnYAxis)) {
      throw new TypeError('numberOfLabelsOnYAxis must be a number, 10')
    }
    if (!(fontSettings instanceof FontSettings)) {
      throw new TypeError('fontSettings must be an instance of FontSettings')
    }
    if (!(colorSettings instanceof ColorSettings)) {
      throw new TypeError('colorSettings must be an instance of ColorSettings')
    }
    if (!validator.isObject(ctx)) {
      throw new TypeError('ctx must be an object')
    }
    if (!(axisTitles instanceof AxisTitles)) {
      throw new TypeError('axisTitles must be an instance of AxisTitles')
    }
    if (!validator.isArray.ofStrings(xAxisLabels)) {
      throw new TypeError('xAxisLabels must be an array of strings')
    }
  }

  verifyDatasetIntegrity(dataset) {
    const validator = new validationCollection({ minimumLength: 2 })
    if (!validator.isArray.ofNumbers(dataset) || !validator.isArray.withMinimumLength(dataset)) {
      throw new TypeError(validator.reportAsString)
    }
  }

  #getNumberOfSegments(dataset) {
    const maxNumberOfSegments = this.maxNumberOfLabelsOnXAxis
    let numberOfSegments = this.graphProperties.primeAdjustedLength
    while (numberOfSegments > maxNumberOfSegments) {
      // if the difference is big, divide by 2 else reduce by 1
      if (numberOfSegments > maxNumberOfSegments * 2) {
        numberOfSegments = numberOfLabelsToDraw / 2
      } else {
        numberOfSegments--
      }
    }
    return numberOfSegments
  }

  #getIndexStepsPerSegment(dataset, numberOfSegments) {
    const indexStepsPerSegment = Math.max(Math.ceil(dataset.length / numberOfSegments), 1)
    return indexStepsPerSegment
  }
}