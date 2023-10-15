import { RawApiData } from "./RawApiData.js";
import { TimeConverter } from "./TimeConverter.js";
import { Stock } from "./Stock.js";
import { ValueOnDay } from "./ValueOnDay.js";
import { getStockName } from "../config.js";

export class ApiDataParser {
    parseToStock(rawData: RawApiData) {
        const timeConverter = new TimeConverter();
        const prices = rawData.timestamps.map((timestamp, index) => new ValueOnDay(timeConverter.convertUnixTimeToDate(timestamp), rawData.closePrices[index]));
        const name = getStockName(rawData.ticker);
        return new Stock(name, rawData.ticker, prices);
    }
}