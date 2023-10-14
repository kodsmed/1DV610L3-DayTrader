export class BackgroundRenderer {
  draw(graphAndCanvasData) {
    const { canvasProperties, colorSettings, ctx } = graphAndCanvasData


    ctx.fillStyle = colorSettings.backgroundColor
    ctx.globalCompositeOperation = 'destination-under'
    ctx.fillRect(0, 0, canvasProperties.width, canvasProperties.height)
    ctx.globalCompositeOperation = 'source-over'
  }
}