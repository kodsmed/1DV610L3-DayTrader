export default class jk224jvGraphdrawer extends HTMLElement {
  constructor();
  static observedAttributes: any[];
  clearCanvas(): void;
  renderArrayAsGraph(dataset: any[]): void;
  verifyDataset(dataset: any[]): void;
  setAxisTitles(axisTitles: {xAxis?: string, yAxis?: string}): void;
  setXAxisLabels(labels: string[]): void;
  setColors(colorSettings: any): void;
  setFontSettings(fontSettings: {fontFamily: string, labelFontSize: number, titleFontSize: number}): void;
  setSize(size: {width: string, height: string}): void;
}