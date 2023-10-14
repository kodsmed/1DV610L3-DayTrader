/**
 * @typedef {Object} FontSettings
 * @property {string} font - 'Arial, Helvetica, sans-serif' etc.
 * @property {number} fontSizeLabel positive integer
 */
export class FontSettings {
    constructor(fontFamily: any, fontSizeLabel: any, fontSizeTitle: any);
    fontFamily: string;
    fontSizeLabel: number;
    fontSizeTitle: number;
    applySettings(fontSettings: any): void;
    get ctxLabelStyle(): string;
    get ctxTitleStyle(): string;
}
