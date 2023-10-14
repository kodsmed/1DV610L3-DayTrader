export function clearCanvas(canvas){
  const ctx = canvas.getContext('2d')
  const origoX = 0
  const origoY = 0
  ctx.clearRect(origoX, origoY, canvas.width, canvas.height)
}