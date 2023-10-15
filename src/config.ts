export const BACKEND_URL = "http://localhost:8080";
export const STOCKS = [
    {
      name: "Apple Inc",
      symbol: "AAPL"
    },
    {
      name: "Microsoft Corporation",
      symbol: "MSFT"
    },
    {
      name: "Alphabet Inc",
      symbol: "GOOGL"
    },
    {
      name: "International Business Machines Corp",
      symbol: "IBM"
    }
  ]

export function getStockName(ticker: string) {
  for (const stock of STOCKS) {
      if (stock.symbol === ticker) {
          return stock.name;
      }
  }
  return "Unknown";
}