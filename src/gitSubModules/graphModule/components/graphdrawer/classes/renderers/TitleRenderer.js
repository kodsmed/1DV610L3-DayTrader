export class TitleRenderer {
  drawXAxisTitle(graphAndCanvasData) {
    const { canvasProperties, colorSettings, fontSettings, ctx, axisTitles } = graphAndCanvasData
    const titleFontSize = parseInt(fontSettings.ctxTitleStyle, 10)

    ctx.save()
    ctx.translate(canvasProperties.marginWidth + Math.floor(canvasProperties.renderAreaWidth / 2) + Math.floor(ctx.measureText(axisTitles.xAxis).width / 2), canvasProperties.marginHeight * 2 + canvasProperties.renderAreaHeight)
    ctx.font = fontSettings.ctxTitleStyle
    ctx.fillStyle = colorSettings.titleColor
    ctx.textAlign = 'center'
    ctx.textBaseline = 'bottom'
    ctx.fillText(axisTitles.xAxis, 0, 0)
    ctx.restore()
  }

  drawYAxisTitle(graphAndCanvasData) {
    const { canvasProperties, colorSettings, fontSettings, ctx, axisTitles } = graphAndCanvasData

    const titleFontSize = parseInt(fontSettings.ctxTitleStyle, 10)

    ctx.save()
    // Translate the canvas to the y-axis title position.
    ctx.translate(titleFontSize, canvasProperties.marginHeight + canvasProperties.renderAreaHeight / 2)
    ctx.rotate(-Math.PI / 2) // Rotate the canvas 90 degrees counter clockwise.
    ctx.font = fontSettings.ctxTitleStyle
    ctx.fillStyle = colorSettings.titleColor
    ctx.textAlign = 'center'
    ctx.textBaseline = 'bottom'
    ctx.fillText(axisTitles.yAxis, 0, 0)
    ctx.restore()
  }
}