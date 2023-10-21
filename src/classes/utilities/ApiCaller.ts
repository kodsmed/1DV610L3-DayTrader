import { Stock } from "./../model/Stock.js"
import { STOCKS, BACKEND_URL } from "./../../config.js"
import { TimeConverter } from "./TimeConverter.js"
import { RawApiData } from "./../model/RawApiData.js"
import { ApiDataParser } from "./ApiDataParser.js"
import { MessageRenderer } from "./../view/MessageRenderer.js"

export class ApiCaller {

  async getStockHistories() {
    const maxRetries = 5
    let stocks: Stock[] = []
    const messageRenderer = new MessageRenderer()
    // the empty callback means the message wont interrupt the startup process
    // this hack means the message will be shown until the loading is done and the game starts.
    messageRenderer.showWMessageForSecondsBeforeCallback("Loading...", 1, () => {})
    const [from, to] = this.#getOneYearUnixTimeRange()

    for (const stockId of STOCKS) {

      const stock = await this.#fetchWithRetries(stockId.symbol, from, to, maxRetries)
      stocks.push(stock)

    }

    // trim stocks to same length if needed, or else a graph may end up out of bounds.
    if (!this.#areAllStocksTheSameLength(stocks)) {
      stocks = this.#trimStocksToSameLength(stocks)
    }
    return stocks
  }

  #getOneYearUnixTimeRange(): [number, number] {
    const timeConverter = new TimeConverter()
    const now = new Date()
    const oneYearAgo = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate())
    const from = timeConverter.convertDateToUnixTime(oneYearAgo)
    const to = timeConverter.convertDateToUnixTime(now)
    return [from, to]
  }

  /**
   * Try to fetch stock history for a stock ticker, retrying up to maxRetries times if the fetch fails for any reason.
   * If the fetch fails after maxRetries, an unhandled error is thrown.
   */
  async #fetchWithRetries(stockTicker: string, from: number, to: number, maxRetries: number): Promise<Stock> {
    let stock: Stock | undefined
    for (let i = 0; i < maxRetries; i++) {
      try {
        stock = await this.#getStockHistory(stockTicker, from, to) as Stock
        break
      } catch (error) {
        // wait an extra 500ms for each retry
        console.log (`Failed to fetch stock history for ${stockTicker}, retrying...`)
        await new Promise(resolve => setTimeout(resolve, 500 * (i + 1)))
        if (i === maxRetries - 1) {
          throw new Error(`Failed to fetch stock history for ${stockTicker} after ${maxRetries} retries`)
        }
      }
    }
    return stock as Stock
  }

  async #getStockHistory(stockTicker: string, fromUnixTime: number, toUnixTime: number): Promise<Stock> {
    const URL = `${BACKEND_URL}/api/stocks/${stockTicker}?from=${fromUnixTime}&to=${toUnixTime}`
    const response = await fetch(URL, {
      method: 'GET'
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    if (response.body === null) {
      throw new Error(`Response body is null`)
    }

    const rawData = await response.json() as RawApiData
    const parser = new ApiDataParser()
    const stock = parser.parseToStock(rawData) as Stock
    return stock
  }

  #areAllStocksTheSameLength(stocks: Stock[]): boolean {
    const firstStockLength = stocks[0].prices.length
    return stocks.every(stock => stock.prices.length === firstStockLength)
  }

  #trimStocksToSameLength(stocks: Stock[]): Stock[] {
    // while praxis is make a copy of the array, that is not needed here
    // if the arrays are of different length they are useless, so we can just modify the original array
    const shortestStockLength = Math.min(...stocks.map(stock => stock.prices.length))
    stocks.forEach(stock => stock.prices = stock.prices.slice(0, shortestStockLength))
    const trimmedStocks = stocks
    return trimmedStocks
  }
}