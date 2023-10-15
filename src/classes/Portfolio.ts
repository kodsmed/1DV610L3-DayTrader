import { StockPurchase } from "./StockPurchase.js";

export class Portfolio {
  #liquidAssetsUSD: number;
  #purchases: StockPurchase[];

  constructor() {
    this.#liquidAssetsUSD = 1000;
    this.#purchases = [];
  }

  #getPurchasesBySymbol(ticker: string) {
    return this.#purchases.filter((purchase: StockPurchase) => purchase.symbol === ticker);
  }

  getQuantityBySymbol(ticker: string) {
    return this.#getPurchasesBySymbol(ticker).reduce((total: number, purchase: StockPurchase) => total + purchase.quantity, 0);
  }

  getCostBySymbol(ticker: string) {
    return this.#getPurchasesBySymbol(ticker).reduce((total: number, purchase: StockPurchase) => total + purchase.costOfPurchase, 0);
  }

  getSellValueBySymbol(ticker: string, quantity: number, today: Date) {
    return this.#getPurchasesBySymbol(ticker).reduce((total: number, purchase: StockPurchase) => {
      if (quantity <= 0) {
        return total;
      }
      const quantityToSell = Math.min(quantity, purchase.quantity);
      quantity -= quantityToSell;
      return total + quantityToSell * purchase.stock.getPriceOnDay(today).valueInUSD;
    }, 0);
  }

  getValueOfAllStocks(today: Date) {
    return this.#purchases.reduce((total: number, purchase: StockPurchase) => total + purchase.getValueOnDay(today), 0);
  }

  get liquidAssetsUSD() {
    return this.#liquidAssetsUSD;
  }

  getTotalValueUSD(today: Date) {
    return this.#liquidAssetsUSD + this.getValueOfAllStocks(today);
  }

  addPurchase(purchase: StockPurchase) {
    this.#liquidAssetsUSD -= purchase.costOfPurchase;
    this.#purchases.push(purchase);
  }

  sellQuantityBySymbol(quantity: number, ticker: string, today: Date) {
    const valueOfSale = this.getSellValueBySymbol(ticker, quantity, today);
    const purchases = this.#getPurchasesBySymbol(ticker);

    try {
      if (purchases.length === 0) {
        throw new Error(`Cannot sell ${quantity} shares of ${ticker} because you don't own any shares of ${ticker}.`);
      }

      // reduce the quantity recursively until we've sold the desired amount
      purchases.forEach((purchase: StockPurchase) => {
        if (quantity > 0) {
          purchase.reduceQuantity(quantity);
          quantity = Math.max(0, quantity - purchase.quantity);
        }
      });
      // remove any purchases that have no quantity left
      this.#purchases = this.#purchases.filter((purchase: StockPurchase) => purchase.quantity > 0);

      this.#liquidAssetsUSD += valueOfSale;

    } catch (error) {
      this.#purchases = purchases;
      return
    }
  }
}