/**
 * This file contains all the configuration variables for the application.
 * Wrong configuration may break the application functionality.
 */

/**
 * The complete URL of the backend API including protocol, hostname and port, e.g. http://localhost:8080
 */
export const BACKEND_URL = "http://localhost:8080";

/**
 * STOCKS is a list of stocks that are "tradable" in the application, you can add more stocks here,
 * but that will require longer loading times for the application, and makes the saves larger. More then 10 stocks is not recommended.
 * The name of the stock is the full name of the company, the symbol is the stock ticker, e.g. AAPL for Apple Inc.
 *
 * IMPORTANT: THE SYMBOL VALUE MUST BE AN AUTHENTIC AND UNIQUE STOCK TICKER.
 */
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
