export class TemplateBuilder {
  getDefaultTemplate() {
    const template = document.createElement('template')
    // Warning: To ensure that the calculations are correct any resizing of the canvas must be done by setting the width and height of the container element or unexpected results can occur. Ideally, use the setSize method.
    template.innerHTML = `
      <style>
          #container {
            width: 100%; /* Use these if you have to manually the size. */
            height: 100%; /* Use these if you have to manually the size. */
          }
          #canvas {
            width: 100%;
            height: 100%;
          }
      </style>
      <div id="container">
        <canvas id="canvas"></canvas>
      </div>
    `
    return template
  }
}