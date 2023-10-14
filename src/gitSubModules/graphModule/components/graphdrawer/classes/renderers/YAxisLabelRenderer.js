import { BaseIteratingYAxisRenderer } from "./BaseIteratingYAxisRenderer.js";

export class YAxisLabelRenderer extends BaseIteratingYAxisRenderer {
  constructor(graphAndCanvasDataObject) {
    super(graphAndCanvasDataObject);
  }

  draw(graphAndCanvasData) {
    const { graphProperties, colorSettings, fontSettings, ctx } = graphAndCanvasData
    ctx.font = fontSettings.ctxLabelStyle
    ctx.fillStyle = colorSettings.labelColor
    ctx.textAlign = 'right'
    ctx.textBaseline = 'middle'
    const axisToLabelMargin = Math.floor(fontSettings.fontSizeLabel / 2)

    let adjustedMin, adjustedRange
    // Check if the range is very small, in that case adjust the properties.
    if (graphProperties.range < 2) {
      adjustedMin = Math.floor(graphProperties.average) - 5
      adjustedRange = 10
    } else {
      adjustedMin = graphProperties.min
      adjustedRange = graphProperties.range
    }

    this.iterateThroughPoints(graphAndCanvasData, (point, index) => {
      const totalNrOfLabels = graphAndCanvasData.numberOfLabelsOnYAxis
      const adjustedX = point.xCoordinate - axisToLabelMargin
      const rangeToHeightRatio = Math.ceil((adjustedRange) / totalNrOfLabels)
      ctx.fillText(adjustedMin + (index * rangeToHeightRatio), adjustedX, point.yCoordinate)
    })
  }
}