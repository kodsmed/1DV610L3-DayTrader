import { generateChecksum } from "../utilities/CheckSumGenerator.js"
import { Stock } from "./Stock.js"
import { StockPurchase } from "./StockPurchase.js"

export class Portfolio {
  #liquidAssetsUSD: number
  #purchases: StockPurchase[]
  valueOverTime: number[] = []
  #startingFunds = 5000

  constructor() {
    this.#liquidAssetsUSD = this.#startingFunds
    this.#purchases = []
  }

  #setLiquidAssets(liquidAssetsUSD: number) {
    // only to be used when loading portfolio state
    if(liquidAssetsUSD < 0) throw new Error('Liquid assets cannot be negative')
    this.#liquidAssetsUSD = liquidAssetsUSD
  }

  #setPurchases(purchases: StockPurchase[]) {
    // only to be used when loading portfolio state
    this.#purchases = purchases
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
    const sum = (this.#liquidAssetsUSD + this.getValueOfAllStocks(today))
    return Math.round(sum * 100) / 100
  }

  getPercentageChange(today: number) {
    const change = this.getTotalValueUSD(today) - this.#startingFunds
    const percentageChange = (change / this.#startingFunds) * 100
    return Math.round(percentageChange * 100) / 100
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

  async savePortfolioState() {
    const serializedPortfolio = {
    liquidAssetsUSD: this.getLiquidAssetsUSD(),
    purchases: this.#purchases.map((purchase: StockPurchase) => ({
        symbol: purchase.symbol,
        buyPrice: purchase.buyPricePerStock,
        quantity: purchase.quantity
        })
      )
    }
    const jsonPortfolio = JSON.stringify(serializedPortfolio)
    const checksum = await generateChecksum(jsonPortfolio)
    localStorage.setItem('portfolio', jsonPortfolio)
    localStorage.setItem('portfolioChecksum', checksum)
  }

  async loadPortfolioState(stocks: Stock[]) {
    const serializedPortfolioData = await JSON.parse(localStorage.getItem('portfolio') || '{}');
    const checksum = await generateChecksum(JSON.stringify(serializedPortfolioData))
    if (checksum !== localStorage.getItem('portfolioChecksum')) {
      throw new Error('Portfolio data is corrupt')
    }
    const stockPurchases: StockPurchase[] = serializedPortfolioData.purchases.map((purchaseData: { symbol: string; buyPrice: number; quantity: number; }) => {
        const stock = stocks.find(stock => stock.symbol === purchaseData.symbol);
        return new StockPurchase(stock as Stock, purchaseData.buyPrice, purchaseData.quantity);
    });
    this.#setLiquidAssets(serializedPortfolioData.liquidAssetsUSD)
    this.#setPurchases(stockPurchases)
  }
}