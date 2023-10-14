import { BaseIteratingYAxisRenderer } from "./BaseIteratingYAxisRenderer.js";

export class HorizontalGuideLineRenderer extends BaseIteratingYAxisRenderer {
  draw(graphAndCanvasData) {
    const { canvasProperties, colorSettings, ctx } = graphAndCanvasData
    ctx.strokeStyle = colorSettings.axisColor
    ctx.setLineDash([1, 5])

    this.iterateThroughPoints(graphAndCanvasData, (point, index) => {
    ctx.beginPath()
    ctx.moveTo(canvasProperties.marginWidth, point.yCoordinate)
    ctx.lineTo(canvasProperties.marginWidth + canvasProperties.renderAreaWidth, point.yCoordinate)
    ctx.stroke()
    })

    ctx.setLineDash([])
  }
}