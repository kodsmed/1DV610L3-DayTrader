import { PointGenerators } from "./../generators/PointGenerators.js";

export class BaseIteratingRenderer {
  #pointGenerator;

  constructor() {
      this.#pointGenerator = new PointGenerators();
  }

  // Abstract the point generator method... the javascript way.
  getPointGenerator(graphAndCanvasDataObject) {
      throw new Error("Subclasses must implement this method.");
  }

  iterateThroughPoints(graphAndCanvasDataObject, specificRendererCallback) {
      const pointGeneratorInstance = this.getPointGenerator(graphAndCanvasDataObject);
      let point = pointGeneratorInstance.next().value;
      let index = 0;
      while (point) {
          specificRendererCallback(point, index);
          point = pointGeneratorInstance.next().value;
          index++;
      }
  }
}