

export class MessageRenderer {
  constructor() {
  }

  showWMessageForSecondsBeforeCallback(message:string, secondsDelay: number, callBackAfterDelay: () => void) {
    const delay = Math.max(secondsDelay, 0.5) * 1000
    const component = document.querySelector("jk224jv-graphdrawer")
    if (!component) {
      throw new Error("Could not find graph component")
    }
    const graphComponent = component
    graphComponent.clearCanvas()

    const canvas = graphComponent.shadowRoot?.querySelector("canvas")
    if (!canvas) {
      throw new Error("Could not find canvas element")
    }

    this.#setCanvasScale(canvas)

    const context = canvas.getContext("2d")
    if (!context) {
      throw new Error("Could not get canvas context")
    }
    context.font = "30px Arial"
    context.fillStyle = "black"
    context.textAlign = "center"
    context.fillText(message, canvas.width / 2, canvas.height / 2)

    setTimeout(() => {
      callBackAfterDelay()
    }, delay)
    return
  }

  #setCanvasScale(canvas: HTMLCanvasElement) {
    const computedStyle = getComputedStyle(canvas)
    const MathematicalNumberBaseTen = 10
    const width = parseInt(computedStyle.getPropertyValue('width'), MathematicalNumberBaseTen)
    const height = parseInt(computedStyle.getPropertyValue('height'), MathematicalNumberBaseTen)
    const devicePixelRatio = window.devicePixelRatio || 1
    canvas.width = width * devicePixelRatio
    canvas.height = height * devicePixelRatio
    const ctx = canvas.getContext('2d')
    if (!ctx) {
      throw new Error("Could not get canvas context")
    }
    ctx.scale(devicePixelRatio, devicePixelRatio)
  }
}