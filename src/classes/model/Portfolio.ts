import { StockPurchase } from "./StockPurchase.js"

export class Portfolio {
  #liquidAssetsUSD: number
  #purchases: StockPurchase[]
  valueOverTime: number[] = []

  constructor() {
    this.#liquidAssetsUSD = 5000
    this.#purchases = []
  }

  getPurchasesBySymbol(ticker: string) {
    return this.#purchases.filter((purchase: StockPurchase) => purchase.symbol === ticker)
  }

  getQuantityBySymbol(ticker: string) {
    return this.getPurchasesBySymbol(ticker).reduce((total: number, purchase: StockPurchase) => total + purchase.quantity, 0)
  }

  getCostBySymbol(ticker: string) {
    return this.getPurchasesBySymbol(ticker).reduce((total: number, purchase: StockPurchase) => total + purchase.costOfPurchase, 0)
  }

  getTotalValueBySymbol(ticker: string, today: number) {
    return this.getPurchasesBySymbol(ticker).reduce((total: number, purchase: StockPurchase) => total + purchase.getValueOnDay(today), 0)
  }

  getSellValueBySymbol(ticker: string, quantity: number, today: number) {
    return this.getPurchasesBySymbol(ticker).reduce((total: number, purchase: StockPurchase) => {
      if (quantity <= 0) {
        return total
      }
      const quantityToSell = Math.min(quantity, purchase.quantity)
      quantity -= quantityToSell
      return total + quantityToSell * purchase.stock.getPriceOnDay(today)
    }, 0)
  }

  getValueOfAllStocks(today: number) {
    let totalValue = 0
    for (const purchase of this.#purchases) {
      totalValue += purchase.getValueOnDay(today)
    }
    return totalValue
  }

  getLiquidAssetsUSD() {
    return this.#liquidAssetsUSD
  }

  getTotalValueUSD(today: number) {
    return this.#liquidAssetsUSD + this.getValueOfAllStocks(today)
  }

  addPurchase(purchase: StockPurchase) {
    if (purchase.costOfPurchase > this.#liquidAssetsUSD) {
      return
    }
    this.#liquidAssetsUSD -= purchase.costOfPurchase
    this.#purchases.push(purchase)
  }

  sellQuantityBySymbol(quantity: number, ticker: string, today: number) {
    const valueOfSale = this.getSellValueBySymbol(ticker, quantity, today)
    const purchases = this.getPurchasesBySymbol(ticker)

    try {
      if (purchases.length === 0 || quantity > this.getQuantityBySymbol(ticker)) {
        return
      }

      while (quantity > 0) {
        const purchase = purchases[0]
        const quantityToSell = Math.min(quantity, purchase.quantity)
        quantity -= quantityToSell
        purchase.reduceQuantity(quantityToSell)
      }

      // remove any purchases that have no quantity left
      this.#purchases = this.#purchases.filter((purchase: StockPurchase) => purchase.quantity > 0)

      this.#liquidAssetsUSD += valueOfSale

    } catch (error) {
      return
    }
  }
}