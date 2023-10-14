export class AxisRenderer {
  drawXAxis(graphAndCanvasData) {
    const { canvasProperties, colorSettings, ctx } = graphAndCanvasData
    ctx.beginPath()
    ctx.strokeStyle = colorSettings.axisColor
    ctx.moveTo(canvasProperties.marginWidth, canvasProperties.marginHeight + canvasProperties.renderAreaHeight)
    ctx.lineTo(canvasProperties.marginWidth + canvasProperties.renderAreaWidth, canvasProperties.marginHeight + canvasProperties.renderAreaHeight)
    ctx.stroke()
  }

  drawYAxis(graphAndCanvasData) {
    const { canvasProperties, colorSettings, ctx } = graphAndCanvasData
    ctx.beginPath()
    ctx.strokeStyle = colorSettings.axisColor
    ctx.moveTo(canvasProperties.marginWidth, canvasProperties.marginHeight)
    ctx.lineTo(canvasProperties.marginWidth, canvasProperties.marginHeight + canvasProperties.renderAreaHeight)
    ctx.stroke()
  }
}