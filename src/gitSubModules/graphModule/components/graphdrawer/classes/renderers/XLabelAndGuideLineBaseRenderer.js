import { BaseIteratingRenderer } from "./BaseIteratingRenderer.js";
import { PointGenerators } from "./../generators/PointGenerators.js";

export class XLabelAndGuideLineBaseRenderer extends BaseIteratingRenderer {
  #pointGenerator

  constructor() {
    super();
    this.#pointGenerator = new PointGenerators();
  }

  getPointGenerator(graphAndCanvasDataObject) {
      return this.#pointGenerator.pointGenerator(graphAndCanvasDataObject)
  }

  iterateThroughSegments (graphAndCanvasData, specificRendererCallback) {
    this.iterateThroughPoints(graphAndCanvasData, (point, index) => {
      if (index % graphAndCanvasData.indexStepsPerSegment === 0) {
        specificRendererCallback(point, index, graphAndCanvasData)
      }
      // if it's the last point, make sure it's rendered
      if (index === graphAndCanvasData.dataset.length - 1) {
        specificRendererCallback(point, index, graphAndCanvasData)
      }
    })
  }
}