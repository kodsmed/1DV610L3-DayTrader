import { MathematicalConstants } from "./../../enum/MathematicalConstants.js";
import { XLabelAndGuideLineBaseRenderer } from "./XLabelAndGuideLineBaseRenderer.js";

export class XAxisLabelRenderer extends XLabelAndGuideLineBaseRenderer {
  draw(graphAndCanvasData) {
    const { ctx, colorSettings, fontSettings } = graphAndCanvasData
    ctx.font = fontSettings.ctxLabelStyle
    ctx.fillStyle = colorSettings.labelColor
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    this.iterateThroughSegments(graphAndCanvasData, (point, index, graphAndCanvasData) => {
      const { canvasProperties, fontSettings } = graphAndCanvasData
      const labelFontSize = parseInt(fontSettings.ctxLabelStyle, MathematicalConstants.BaseTen)
      const label = this.#getLabelContent(graphAndCanvasData, index)
      const labelLength = ctx.measureText(label).width
      const x = point.xCoordinate - labelLength / 2
      const y = canvasProperties.marginHeight + canvasProperties.renderAreaHeight + Math.ceil(labelFontSize * 2)
      ctx.fillText(label, x, y);
    })
  }

  #getLabelContent(graphAndCanvasData, labelIndex){
    const { xAxisLabels } = graphAndCanvasData
    if (this.#isCustomLabelsToBeDrawn(graphAndCanvasData)) {
      return xAxisLabels[labelIndex]
    } else {
      return (graphAndCanvasData.indexStepsPerSegment  * labelIndex).toString()
    }
  }

  #isCustomLabelsToBeDrawn(graphAndCanvasData) {
    return graphAndCanvasData.xAxisLabels.length == graphAndCanvasData.dataset.length
  }
}
