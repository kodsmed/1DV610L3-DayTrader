import { PointGenerators } from "./../generators/PointGenerators.js";
import { BaseIteratingRenderer } from "./BaseIteratingRenderer.js";

export class BaseIteratingXAxisRenderer extends BaseIteratingRenderer {
  #pointGenerator

  constructor() {
    super();
    this.#pointGenerator = new PointGenerators();
  }

  getPointGenerator(graphAndCanvasDataObject) {
      return this.#pointGenerator.pointGenerator(graphAndCanvasDataObject)
  }
}