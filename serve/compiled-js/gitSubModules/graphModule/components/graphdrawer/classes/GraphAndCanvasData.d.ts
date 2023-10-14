/**
 * This class is used to store everything that is needed to draw the graph.
 * @typedef {Object} GraphAndCanvasData
 * @property {CanvasProperties} canvasProperties - The properties of the canvas.
 * @property {GraphProperties} graphProperties - The properties of the graph.
 * @property {Array} dataset - The dataset to draw.
 * @property {number} maxNumberOfLabelsOnXAxis - The maximum number of labels on the x-axis.
 * @property {number} numberOfLabelsOnYAxis - The maximum number of labels on the y-axis.
 * @property {object} ctx - The context of the canvas.
 * @property {FontSettings} fontSettings - The font settings for the graph.
 * @property {ColorSettings} colorSetting - The color settings for the graph.
 * @property {AxisTitles} axisTitles - The titles of the axes.
 */
export class GraphAndCanvasData {
    constructor(canvasProperties: any, graphProperties: any, dataset: any, maxNumberOfLabelsOnXAxis: any, numberOfLabelsOnYAxis: any, fontSettings: any, colorSettings: any, ctx: any, axisTitles: any, xAxisLabels: any);
    canvasProperties: any;
    graphProperties: any;
    dataset: any;
    maxNumberOfLabelsOnXAxis: any;
    numberOfLabelsOnYAxis: any;
    fontSettings: any;
    colorSettings: any;
    ctx: any;
    axisTitles: any;
    xAxisLabels: any;
    numberOfSegments: any;
    indexStepsPerSegment: number;
    verifyParameterTypes(canvasProperties: any, graphProperties: any, dataset: any, maxNumberOfLabelsOnXAxis: any, numberOfLabelsOnYAxis: any, fontSettings: any, colorSettings: any, ctx: any, axisTitles: any, xAxisLabels: any): void;
    verifyDatasetIntegrity(dataset: any): void;
    #private;
}
