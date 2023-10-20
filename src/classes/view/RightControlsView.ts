import { STOCKS } from '../../config.js'
import { Portfolio } from '../model/Portfolio.js'

export class RightControlsView {
  stockSelector: HTMLSelectElement
  #portfolioView: HTMLDivElement

    constructor() {
      this.#buildRightElementContent()
      this.stockSelector = document.querySelector('#stockSelector') as HTMLSelectElement
      this.#portfolioView = document.querySelector('#portfolioView') as HTMLDivElement
      this.#addSelectorChangeListener(this.stockSelector)
      this.#addButtonClickListeners()
    }

    #getElementById(id: String) : HTMLElement {
      const element = document.querySelector(`#${id}`)
      if (!element) {
        throw new Error(`Could not find #${id} element`)
      }
      return element as HTMLElement
    }

    #buildRightElementContent() {
      const rightControlsView = this.#getElementById('right-field')
      this.#appendStockSelectorOn(rightControlsView)
      this.#appendPortfolioViewOn(rightControlsView)
      this.#appendButtonField(rightControlsView)
    }

    #appendStockSelectorOn(parent: HTMLElement) {
      const stockSelector = document.createElement('select')
      stockSelector.id = 'stockSelector'

      STOCKS.forEach((stock) => {
        const option = document.createElement('option')
        option.value = stock.symbol
        option.text = stock.name
        stockSelector.appendChild(option)
      })
      parent.appendChild(stockSelector)
    }

    #appendPortfolioViewOn(parent: HTMLElement) {
      const portfolioView = document.createElement('div')
      portfolioView.id = 'portfolioView'

      const ids = [
        'liquidAssets', 'stockQuantity', 'stockInvestmentCost', 'stockCurrentValue', 'stockValue'
      ]
      const contents = [
        'Liquid assets: $1000', 'Stock quantity: 0', 'Investment cost: $0', 'Current price/stock: $0', 'Investment value: $0'
      ]
      this.#appendParagraphElements(ids, contents, portfolioView)

      const portfolioList = document.createElement('ul')
      portfolioList.id = 'portfolioList'
      portfolioView.appendChild(portfolioList)
      parent.appendChild(portfolioView)
    }

    #appendParagraphElements(ids: string[], contents: string[], parent: HTMLElement) {
      if (ids.length != contents.length) {
        throw new Error('appendParagraphElements: Illegal argument, arrays of different length.')
      }
      for (let i = 0; i < ids.length; i++) {
        const pElement = document.createElement('p')
        pElement.id = ids[i]
        pElement.textContent = contents[i]
        parent.appendChild(pElement)
      }
    }

    #appendButtonField(parent: HTMLElement) {
      const buttonField = document.createElement('div')
      const quantityForBuyButtons = ['1', '5', '10', 'Max']
      const quantityForSellButtons = ['1', '5', '10', 'All']

      this.#appendBuyButtonsFieldOn(buttonField, quantityForBuyButtons)
      this.#appendSellButtonsFieldOn(buttonField, quantityForSellButtons)
      parent.appendChild(buttonField)

    }

    #appendBuyButtonsFieldOn(parent: HTMLElement, quantities: string[]) {
      const prefixes = ['buy', 'Buy']
      const buyButtonsField = this.#createButtonsField('buyButtonsField', prefixes, quantities)
      buyButtonsField.style.display = 'flex'
      buyButtonsField.style.justifyContent = 'space-evenly'
      parent.appendChild(buyButtonsField)
    }

    #appendSellButtonsFieldOn(parent: HTMLElement, quantities: string[]) {
      const prefixes = ['sell', 'Sell']
      const sellButtonsField = this.#createButtonsField('sellButtonsField', prefixes, quantities)
      sellButtonsField.style.display = 'flex'
      sellButtonsField.style.justifyContent = 'space-evenly'
      parent.appendChild(sellButtonsField)
    }

    #createButtonsField(fieldId:string, prefixes: string[], quantities: string[]) {
      const innerDiv = document.createElement('div')
      innerDiv.id = fieldId
      for (let i = 0; i < quantities.length; i++) {
        const button = document.createElement('button')
        button.id = `${prefixes[0]}${quantities[i]}`
        button.textContent = `${prefixes[1]} ${quantities[i]}`
        innerDiv.appendChild(button)
      }
      return innerDiv
    }

    updatePortfolioView(portfolio : Portfolio, currentDay: number, currentPrice: number) {
      const liquidAssets = this.#getElementById('liquidAssets')
      liquidAssets.textContent = `Liquid assets: $${portfolio.getLiquidAssetsUSD().toFixed(2)}`

      const stockQuantity = this.#getElementById('stockQuantity')
      stockQuantity.textContent = `Stock quantity: ${portfolio.getQuantityBySymbol(this.stockSelector.value)}`

      const stockCurrentValue = this.#getElementById('stockCurrentValue')
      stockCurrentValue.textContent = `Current price/stock: $${currentPrice.toFixed(2)}`

      const stockInvestmentCost = this.#getElementById('stockInvestmentCost')
      stockInvestmentCost.textContent = `Investment cost: $${portfolio.getCostBySymbol(this.stockSelector.value).toFixed(2)}`

      const stockValue = this.#getElementById('stockValue')
      stockValue.textContent = `Investment value: $${portfolio.getTotalValueBySymbol(this.stockSelector.value, currentDay).toFixed(2)}`

      this.#updatePortfolioList(portfolio)
    }

    #updatePortfolioList(portfolio : Portfolio){
      const portfolioList = this.#getElementById('portfolioList') as HTMLUListElement
      portfolioList.innerHTML = ''
      const stockPurchases = portfolio.getPurchasesBySymbol(this.stockSelector.value)
      stockPurchases.forEach((purchase) => {
        const listItem = document.createElement('li')
        listItem.textContent = `Purchased ${purchase.quantity} shares for $${purchase.buyPricePerStock.toFixed(2)}`
        portfolioList.appendChild(listItem)
      })
    }

    #addSelectorChangeListener(stockSelector: HTMLElement) {
      stockSelector.addEventListener('change', () => {
        this.#emitStockSelectedEvent()
      })
    }

    #addButtonClickListeners(){
      const buyButtonsField = this.#getElementById('buyButtonsField')
      buyButtonsField.addEventListener('mousedown', (event) => {
        const target = event.target as HTMLButtonElement
        this.#emitBuyButtonClickedEvent(target.id)
      })

      const sellButtonsField = this.#getElementById('sellButtonsField')
      sellButtonsField.addEventListener('mousedown', (event) => {
        const target = event.target as HTMLButtonElement
        this.#emitSellButtonClickedEvent(target.id)
      })
    }

    #emitStockSelectedEvent() {
      const event = new CustomEvent('stockSelected', {
        detail: {
          stock: this.stockSelector.value
        },
        bubbles: true
      })
      this.stockSelector.dispatchEvent(event)
    }

    #emitBuyButtonClickedEvent(id: string) {
      const event = new CustomEvent('buyButtonClicked', {
        detail: {
          id: id,
          stock: this.stockSelector.value
        },
        bubbles: true
      })
      this.stockSelector.dispatchEvent(event)
    }

    #emitSellButtonClickedEvent(id: string) {
      const event = new CustomEvent('sellButtonClicked', {
        detail: {
          id: id,
          stock: this.stockSelector.value
        },
        bubbles: true
      })
      this.stockSelector.dispatchEvent(event)
    }
}