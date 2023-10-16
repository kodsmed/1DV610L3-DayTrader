import { STOCKS } from "../../config.js"
import { Portfolio } from "../model/Portfolio.js"

export class RightControlsView {
  stockSelector: HTMLSelectElement
  #portfolioView: HTMLDivElement

    constructor() {
      this.#buildRightControlsView()
      this.stockSelector = document.querySelector("#stockSelector") as HTMLSelectElement
      this.#portfolioView = document.querySelector("#portfolioView") as HTMLDivElement
    }

    #buildRightControlsView() {
      const rightControlsView = document.querySelector("#right-field")
      if (!rightControlsView) {
        throw new Error("Could not find rightControls element")
      }
      const stockSelector = document.createElement("select")
      stockSelector.id = "stockSelector"
      rightControlsView.appendChild(stockSelector)
      this.stockSelector = stockSelector

      STOCKS.forEach((stock) => {
        const option = document.createElement("option")
        option.value = stock.symbol
        option.text = stock.name
        stockSelector.appendChild(option)
      })

      this.stockSelector.addEventListener("change", () => {
        this.#emitStockSelectedEvent()
      })

      const portfolioView = document.createElement("div")
      portfolioView.id = "portfolioView"
      rightControlsView.appendChild(portfolioView)
      this.#portfolioView = portfolioView
      this.#buildPortfolioView()
      this.#buildActionButtonsField()
    }

    #buildPortfolioView() {
      const portfolioView = document.querySelector("#portfolioView")
      if (!portfolioView) {
        throw new Error("Could not find portfolioView element")
      }
      const liquidAssets = document.createElement("p")
      liquidAssets.id = "liquidAssets"
      portfolioView.appendChild(liquidAssets)
      liquidAssets.textContent = "Liquid assets: $1000"
      const stockQuantity = document.createElement("p")
      stockQuantity.id = "stockQuantity"
      stockQuantity.textContent = "Stock quantity: 0"
      portfolioView.appendChild(stockQuantity)
      const stockInvestmentCost = document.createElement("p")
      stockInvestmentCost.id = "stockInvestmentCost"
      portfolioView.appendChild(stockInvestmentCost)
      stockInvestmentCost.textContent = "Investment cost: $0"
      const stockCurrentValue = document.createElement("p")
      stockCurrentValue.id = "stockCurrentValue"
      portfolioView.appendChild(stockCurrentValue)
      stockCurrentValue.textContent = "Current price/stock: $0"
      const stockValue = document.createElement("p")
      stockValue.id = "stockValue"
      portfolioView.appendChild(stockValue)
      stockValue.textContent = "Investment value: $0"
      const portfolioList = document.createElement("ul")
      portfolioList.id = "portfolioList"
      portfolioView.appendChild(portfolioList)
    }

    #buildActionButtonsField() {
      const rightControlsView = document.querySelector("#right-field")
      if (!rightControlsView) {
        throw new Error("Could not find rightControls element")
      }
      const actionButtonsField = document.createElement("div")
      actionButtonsField.id = "actionButtonsField"
      rightControlsView.appendChild(actionButtonsField)

      const buyButtonsField = document.createElement("div")
      buyButtonsField.id = "buyButtonsField"
      actionButtonsField.appendChild(buyButtonsField)
      const buyButton = document.createElement("button")
      buyButton.id = "buy1"
      buyButton.textContent = "Buy"
      buyButtonsField.appendChild(buyButton)
      const buyFiveButton = document.createElement("button")
      buyFiveButton.id = "buy5"
      buyFiveButton.textContent = "Buy 5"
      buyButtonsField.appendChild(buyFiveButton)
      const buyTenButton = document.createElement("button")
      buyTenButton.id = "buy10"
      buyTenButton.textContent = "Buy 10"
      buyButtonsField.appendChild(buyTenButton)
      const buyMaxButton = document.createElement("button")
      buyMaxButton.id = "buyMax"
      buyMaxButton.textContent = "Buy Max"
      buyButtonsField.appendChild(buyMaxButton)

      const sellButtonField = document.createElement("div")
      sellButtonField.id = "sellButtonField"
      actionButtonsField.appendChild(sellButtonField)
      const sellButton = document.createElement("button")
      sellButton.id = "sell1"
      sellButton.textContent = "Sell"
      sellButtonField.appendChild(sellButton)
      const sellFiveButton = document.createElement("button")
      sellFiveButton.id = "sell5"
      sellFiveButton.textContent = "Sell 5"
      sellButtonField.appendChild(sellFiveButton)
      const sellTenButton = document.createElement("button")
      sellTenButton.id = "sell10"
      sellTenButton.textContent = "Sell 10"
      sellButtonField.appendChild(sellTenButton)
      const sellMaxButton = document.createElement("button")
      sellMaxButton.id = "sellMax"
      sellMaxButton.textContent = "Sell All"
      sellButtonField.appendChild(sellMaxButton)

      buyButtonsField.addEventListener("click", (event) => {
        const target = event.target as HTMLButtonElement
        this.#emitBuyButtonClickedEvent(target.id)
      })
      sellButtonField.addEventListener("click", (event) => {
        const target = event.target as HTMLButtonElement
        this.#emitSellButtonClickedEvent(target.id)
      })

      buyButtonsField.style.display = "flex"
      buyButtonsField.style.justifyContent = "space-evenly"
      sellButtonField.style.display = "flex"
      sellButtonField.style.justifyContent = "space-evenly"
    }

    #emitStockSelectedEvent() {
      const event = new CustomEvent("stockSelected", {
        detail: {
          stock: this.stockSelector.value
        },
        bubbles: true
      })
      this.stockSelector.dispatchEvent(event)
    }

    #emitBuyButtonClickedEvent(id: string) {
      const event = new CustomEvent("buyButtonClicked", {
        detail: {
          id: id,
          stock: this.stockSelector.value
        },
        bubbles: true
      })
      this.stockSelector.dispatchEvent(event)
    }

    #emitSellButtonClickedEvent(id: string) {
      const event = new CustomEvent("sellButtonClicked", {
        detail: {
          id: id,
          stock: this.stockSelector.value
        },
        bubbles: true
      })
      this.stockSelector.dispatchEvent(event)
    }

    updatePortfolioView(portfolio : Portfolio, currentDay: number, currentPrice: number) {
      console.log("updatePortfolioView")
      const portfolioView = this.#portfolioView

      const liquidAssets = portfolioView.querySelector("#liquidAssets") as HTMLParagraphElement
      if (!liquidAssets) {
        throw new Error("Could not find liquidAssets element")
      }
      liquidAssets.textContent = `Liquid assets: $${portfolio.getLiquidAssetsUSD().toFixed(2)}`

      const stockQuantity = portfolioView.querySelector("#stockQuantity") as HTMLParagraphElement
      if (!stockQuantity) {
        throw new Error("Could not find stockQuantity element")
      }
      stockQuantity.textContent = `Stock quantity: ${portfolio.getQuantityBySymbol(this.stockSelector.value)}`

      const stockCurrentValue = portfolioView.querySelector("#stockCurrentValue") as HTMLParagraphElement
      if (!stockCurrentValue) {
        throw new Error("Could not find stockCurrentValue element")
      }
      stockCurrentValue.textContent = `Current price/stock: $${currentPrice.toFixed(2)}`

      const stockInvestmentCost = portfolioView.querySelector("#stockInvestmentCost") as HTMLParagraphElement
      if (!stockInvestmentCost) {
        throw new Error("Could not find stockInvestmentCost element")
      }
      stockInvestmentCost.textContent = `Investment cost: $${portfolio.getCostBySymbol(this.stockSelector.value).toFixed(2)}`

      const stockValue = portfolioView.querySelector("#stockValue") as HTMLParagraphElement
      if (!stockValue) {
        throw new Error("Could not find stockValue element")
      }
      stockValue.textContent = `Investment value: $${portfolio.getTotalValueBySymbol(this.stockSelector.value, currentDay).toFixed(2)}`

      const portfolioList = portfolioView.querySelector("#portfolioList") as HTMLUListElement
      if (!portfolioList) {
        throw new Error("Could not find portfolioList element")
      }
      portfolioList.innerHTML = ""
      const stockPurchases = portfolio.getPurchasesBySymbol(this.stockSelector.value)
      stockPurchases.forEach((purchase) => {
        const listItem = document.createElement("li")
        listItem.textContent = `Purchased ${purchase.quantity} shares for $${purchase.buyPricePerStock.toFixed(2)}`
        portfolioList.appendChild(listItem)
      })
    }

}