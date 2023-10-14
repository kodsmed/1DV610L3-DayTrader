export function prepareCanvas(canvas) {
  const ctx = canvas.getContext('2d')

  const devicePixelRatio = window.devicePixelRatio || 1
  canvas.width = canvasProperties.width * devicePixelRatio
  canvas.height = canvasProperties.height * devicePixelRatio
  ctx.scale(devicePixelRatio, devicePixelRatio)
}