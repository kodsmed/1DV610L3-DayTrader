import { XLabelAndGuideLineBaseRenderer } from "./XLabelAndGuideLineBaseRenderer.js"

export class VerticalGuideLineRenderer extends XLabelAndGuideLineBaseRenderer {
  constructor(graphAndCanvasData) {
    super(graphAndCanvasData)
  }

  draw(graphAndCanvasData) {
    const { canvasProperties, colorSettings, ctx } = graphAndCanvasData
    ctx.strokeStyle = colorSettings.axisColor
    ctx.setLineDash([1, 5])
    this.iterateThroughSegments(graphAndCanvasData, (point, index) => {
      const x = point.xCoordinate
      const y = canvasProperties.marginHeight + canvasProperties.renderAreaHeight
      ctx.beginPath()
      ctx.moveTo(x, y)
      ctx.lineTo(x, canvasProperties.marginHeight)
      ctx.stroke()
    })
    ctx.setLineDash([])
  }
}
