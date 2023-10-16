import { Stock } from './Stock.js'

export class StockPurchase {
  stock: Stock
  #buyPrice: number
  #quantity: number

  constructor(stock: Stock, buyPrice: number, quantity: number) {
    this.stock = stock
    this.#buyPrice = buyPrice
    this.#quantity = quantity
  }

  get buyPricePerStock() {
    return this.#buyPrice
  }

  get quantity() {
    return this.#quantity
  }

  get costOfPurchase() {
    return this.buyPricePerStock * this.quantity
  }

  getValueOnDay(date: number) {
    return this.stock.getPriceOnDay(date) * this.quantity || 0
  }

  get symbol() {
    return this.stock.symbol
  }

  get name() {
    return this.stock.name
  }

  reduceQuantity(quantity: number) {
    if (quantity > this.quantity) {
      throw new Error(`Cannot sell ${quantity} shares of ${this.symbol} because you only have ${this.quantity} shares.`)
    }
    this.#quantity -= quantity
  }
}