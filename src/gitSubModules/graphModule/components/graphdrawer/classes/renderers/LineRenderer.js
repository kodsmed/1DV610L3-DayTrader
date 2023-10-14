import { BaseIteratingRenderer } from './BaseIteratingRenderer.js'
import { PointGenerators } from './../generators/PointGenerators.js'

export class LineRenderer extends BaseIteratingRenderer{
  #pointGenerator

  constructor() {
    super()
    this.#pointGenerator = new PointGenerators()
  }

  getPointGenerator(graphAndCanvasDataObject) {
    return this.#pointGenerator.pointGenerator(graphAndCanvasDataObject)
  }

  draw(graphAndCanvasData) {
    const { ctx } = graphAndCanvasData

    const startingPoint = this.#getLineStartingPoint(graphAndCanvasData)
    ctx.moveTo(startingPoint.xCoordinate, startingPoint.yCoordinate)

    ctx.beginPath()
    ctx.strokeStyle = graphAndCanvasData.colorSettings.graphLineColor

    this.iterateThroughPoints(graphAndCanvasData, (point, index) => {
      ctx.lineTo(point.xCoordinate, point.yCoordinate);
    })
    ctx.stroke();
  }

  #getLineStartingPoint(graphAndCanvasData) {
    const pointGeneratorInstance = this.#pointGenerator.pointGenerator(graphAndCanvasData)
    return pointGeneratorInstance.next().value
  }

}