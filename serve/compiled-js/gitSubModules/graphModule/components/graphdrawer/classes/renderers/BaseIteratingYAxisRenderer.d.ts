export class BaseIteratingYAxisRenderer extends BaseIteratingRenderer {
    getPointGenerator(graphAndCanvasDataObject: any): Generator<{
        xCoordinate: number;
        yCoordinate: number;
    }, void, unknown>;
    #private;
}
import { BaseIteratingRenderer } from './BaseIteratingRenderer.js';
