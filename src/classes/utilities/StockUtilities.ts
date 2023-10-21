import { STOCKS } from "./../../config.js";

export class StockUtilities {
  public getStockName(ticker: string) {
    for (const stock of STOCKS) {
        if (stock.symbol === ticker) {
            return stock.name;
        }
    }
    return "Unknown";
  }
}