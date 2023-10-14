export class AxisTitles {
  #xAxis
  #yAxis

  constructor (xAxis, yAxis) {
    if (typeof xAxis !== 'string') {
      throw new TypeError('xAxis must be a string')
    }
    if (typeof yAxis !== 'string') {
      throw new TypeError('yAxis must be a string')
    }
    this.#xAxis = xAxis
    this.#yAxis = yAxis
  }

  clone () {
    return new AxisTitles(this.#xAxis, this.#yAxis)
  }

  get xAxis () {
    return this.#xAxis
  }

  get yAxis () {
    return this.#yAxis
  }
}