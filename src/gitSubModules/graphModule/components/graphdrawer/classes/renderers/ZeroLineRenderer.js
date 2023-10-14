import { MathematicalConstants } from "./../../enum/MathematicalConstants.js"

export class ZeroLineRenderer {
  drawIfInRange(graphAndCanvasData) {
    const { canvasProperties, graphProperties, colorSettings, ctx } = graphAndCanvasData
    const mathematicalZero = MathematicalConstants.Zero
    if (graphProperties.min < MathematicalConstants.Zero && graphProperties.max > mathematicalZero) {
      ctx.beginPath()
      ctx.strokeStyle = colorSettings.zeroLineColor
      const heightStep = Math.ceil(graphProperties.range / graphAndCanvasData.numberOfLabelsOnYAxis)
      const yCoordinate = canvasProperties.marginHeight + canvasProperties.renderAreaHeight - (mathematicalZero - graphProperties.min) / heightStep * (canvasProperties.renderAreaHeight / graphAndCanvasData.numberOfLabelsOnYAxis)
      ctx.moveTo(
        canvasProperties.marginWidth, yCoordinate
      )
      ctx.lineTo(
        canvasProperties.marginWidth + canvasProperties.renderAreaWidth, yCoordinate
      )
      ctx.stroke()
    }
  }
}