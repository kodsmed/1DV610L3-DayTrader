import { RawApiData } from "../model/RawApiData.js"
import { TimeConverter } from "./TimeConverter.js"
import { Stock } from "../model/Stock.js"
import { ValueOnDay } from "../model/ValueOnDay.js"
import { StockUtilities } from "./stockUtilities.js"

export class ApiDataParser {
    parseToStock(rawData: RawApiData) {
        const timeConverter = new TimeConverter()
        const stockUtilities = new StockUtilities()
        const prices = rawData.timestamps.map((timestamp, index) => new ValueOnDay(timeConverter.convertUnixTimeToDate(timestamp), rawData.closePrices[index]))
        const name = stockUtilities.getStockName(rawData.ticker)
        return new Stock(name, rawData.ticker, prices)
    }
}