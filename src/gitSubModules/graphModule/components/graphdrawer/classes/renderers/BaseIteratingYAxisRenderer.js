import { PointGenerators } from './../generators/PointGenerators.js';
import { BaseIteratingRenderer } from './BaseIteratingRenderer.js';

export class BaseIteratingYAxisRenderer extends BaseIteratingRenderer {
  #pointGenerator

  constructor() {
    super();
    this.#pointGenerator = new PointGenerators();
  }

  getPointGenerator(graphAndCanvasDataObject) {
      return this.#pointGenerator.yAxisPointGenerator(graphAndCanvasDataObject);
  }
}