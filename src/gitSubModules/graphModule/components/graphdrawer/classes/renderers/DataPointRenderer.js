import { BaseIteratingRenderer } from './BaseIteratingRenderer.js'
import { PointGenerators } from './../generators/PointGenerators.js'

export class DataPointRenderer extends BaseIteratingRenderer{
  #pointGenerator

  constructor() {
    super()
    this.#pointGenerator = new PointGenerators()
  }

  getPointGenerator(graphAndCanvasDataObject) {
    return this.#pointGenerator.pointGenerator(graphAndCanvasDataObject)
  }

  draw(graphAndCanvasData) {
    const { ctx, colorSettings  } = graphAndCanvasData

    this.iterateThroughPoints(graphAndCanvasData, (point, index) => {
      const dotRadius = 3
      const startAngle = 0
      const stopAngle = 2 * Math.PI // A full circle.
      ctx.beginPath()
      ctx.arc(point.xCoordinate, point.yCoordinate, dotRadius, startAngle, stopAngle)
      ctx.fillStyle = colorSettings.graphDotColor
      ctx.fill()
    })
  }
}