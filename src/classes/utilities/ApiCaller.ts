import { Stock } from "./../model/Stock.js"
import { STOCKS } from "./../../config.js"
import { TimeConverter } from "./TimeConverter.js"
import { RawApiData } from "./../model/RawApiData.js"
import { ApiDataParser } from "./ApiDataParser.js"

export class ApiCaller {

  async getStockHistories() {
    const stocks: Stock[] = []
    const timeConverter = new TimeConverter()
    const now = new Date()
    const oneYearAgo = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate())
    const from = timeConverter.convertDateToUnixTime(oneYearAgo)
    const to = timeConverter.convertDateToUnixTime(now)

    for (const stockId of STOCKS) {

      const response = await fetch(`http://localhost:8080/api/stocks/${stockId.symbol}?from=${from}&to=${to}`, {
        method: 'GET'
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      if (response.body === null) {
        throw new Error(`Response body is null`)
      }

      const rawData = await JSON.parse(await response.text()) as RawApiData

      const parser = new ApiDataParser()
      const stock = parser.parseToStock(rawData) as Stock
      stocks.push(stock)

      if (!this.#isAllStocksTheSameLength(stocks)) {
        this.#trimStocksToSameLength(stocks)
      }
    }
    return stocks
  }

  #isAllStocksTheSameLength(stocks: Stock[]) {
    const firstStockLength = stocks[0].prices.length
    return stocks.every(stock => stock.prices.length === firstStockLength)
  }

  #trimStocksToSameLength(stocks: Stock[]) {
    const shortestStockLength = Math.min(...stocks.map(stock => stock.prices.length))
    stocks.forEach(stock => stock.prices = stock.prices.slice(0, shortestStockLength))
  }
}