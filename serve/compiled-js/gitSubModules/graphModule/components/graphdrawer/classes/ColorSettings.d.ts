/**
 * This class is used to store the color settings for the graph.
 * @typedef {Object} ColorSettings
 * @property {string} graphLineColor - 'red', 'green', 'lime', 'blue', 'yellow', 'orange', 'purple', 'black', 'gray', 'white'
 * @property {string} graphDotColor - 'red', 'green', 'lime', 'blue', 'yellow', 'orange', 'purple', 'black', 'gray', 'white'
 * @property {string} zeroLineColor - 'red', 'green', 'lime', 'blue', 'yellow', 'orange', 'purple', 'black', 'gray', 'white'
 * @property {string} axisColor - 'red', 'green', 'lime', 'blue', 'yellow', 'orange', 'purple', 'black', 'gray', 'white'
 * @property {string} labelColor - 'red', 'green', 'lime', 'blue', 'yellow', 'orange', 'purple', 'black', 'gray', 'white'
 * @property {string} titleColor - 'red', 'green', 'lime', 'blue', 'yellow', 'orange', 'purple', 'black', 'gray', 'white'
 * @property {string} backgroundColor - 'red', 'green', 'lime', 'blue', 'yellow', 'orange', 'purple', 'black', 'gray', 'white'
 */
export class ColorSettings {
    constructor(graphLineColor: any, graphDotColor: any, zeroLineColor: any, axisColor: any, labelColor: any, titleColor: any, backgroundColor: any);
    clone(): any;
    applySettings(colorSettings: any): void;
    set graphLineColor(arg: any);
    get graphLineColor(): any;
    set graphDotColor(arg: any);
    get graphDotColor(): any;
    set zeroLineColor(arg: any);
    get zeroLineColor(): any;
    set axisColor(arg: any);
    get axisColor(): any;
    set labelColor(arg: any);
    get labelColor(): any;
    set titleColor(arg: any);
    get titleColor(): any;
    set backgroundColor(arg: any);
    get backgroundColor(): any;
    #private;
}
