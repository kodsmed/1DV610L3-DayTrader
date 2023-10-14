export class XLabelAndGuideLineBaseRenderer extends BaseIteratingRenderer {
    getPointGenerator(graphAndCanvasDataObject: any): Generator<{
        xCoordinate: number;
        yCoordinate: number;
    }, void, unknown>;
    iterateThroughSegments(graphAndCanvasData: any, specificRendererCallback: any): void;
    #private;
}
import { BaseIteratingRenderer } from "./BaseIteratingRenderer.js";
