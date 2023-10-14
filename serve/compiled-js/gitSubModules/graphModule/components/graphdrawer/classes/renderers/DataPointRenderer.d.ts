export class DataPointRenderer extends BaseIteratingRenderer {
    getPointGenerator(graphAndCanvasDataObject: any): Generator<{
        xCoordinate: number;
        yCoordinate: number;
    }, void, unknown>;
    draw(graphAndCanvasData: any): void;
    #private;
}
import { BaseIteratingRenderer } from './BaseIteratingRenderer.js';
