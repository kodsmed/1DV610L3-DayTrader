import { Stock } from "./../model/Stock.js"
import { StockPurchase } from "./../model/StockPurchase.js"
import { Portfolio } from "./../model/Portfolio.js"
import { ControlsView } from "./../view/ControlsView.js"
import { RightControlsView } from "./../view/RightControlsView.js"
import jk224jvGraphdrawer from './../../gitSubModules/graphModule/components/graphdrawer/graphdrawer.js'
import { Score } from "./../model/Score.js"
import { GameEndView } from "./../view/GameEndView.js"
import { ValueOnDay } from "./../model/ValueOnDay.js"

export class GameController {
  #stocks: Stock[]
  #scores: Score[] = []
  #selectedStock: Stock
  #portfolio: Portfolio
  #zoomLevel: number = 100
  #focusPoint: number = 100
  #gameSpeed: number = 1
  #currentDay: number = 0
  #graphComponent: any
  #rightControlsView: RightControlsView
  #controlsView: ControlsView
  #selectedHeader

  constructor(stocks: Stock[]) {
    this.#rightControlsView = new RightControlsView()
    this.#controlsView = new ControlsView()
    this.#stocks = stocks
    this.#selectedStock = stocks[0]
    this.#portfolio = new Portfolio()
    this.#graphComponent = document.querySelector('jk224jv-graphdrawer') as any
    this.#graphComponent.setAxisTitles({ xAxis: 'Month and Day', yAxis: 'Value in $' })
    const selectedHeader = document.querySelector("#selected")
    if (!selectedHeader) {
      throw new Error("Could not find selected element")
    }
    this.#selectedHeader = selectedHeader
    this.#selectedHeader.textContent = this.#selectedStock.name
  }

  startGame() {
    this.#portfolio = new Portfolio()
    this.#selectedStock = this.#stocks[0]
    this.#currentDay = 0
    this.#portfolio.valueOverTime = []
    this.#advanceTimeByDays(3)
    this.#addEventListeners()
    this.#loadScoresFromLocalStorage()
    this.#updateTheGraph()
    this.#updateThePortfolioView()
  }

  #addEventListeners() {
    document.addEventListener("stockSelected", (event: Event) => {
      const customEvent = event as CustomEvent
      if (customEvent.detail.stock) {
        const stock = this.#stocks.find((stock: Stock) => stock.symbol === customEvent.detail.stock)
        if (stock) {
          this.#selectedStock = stock
        }
      }
      this.#updateTheGraph()
      this.#updateThePortfolioView()
    })

    document.addEventListener("gameSpeedChange", (event: Event) => {
      const customEvent = event as CustomEvent
      this.#gameSpeed = customEvent.detail.gameSpeed
    })

    document.addEventListener("graphViewChange", (event: Event) => {
      const customEvent = event as CustomEvent
      console.log("graphViewChange event received", customEvent.detail.zoomLevel, customEvent.detail.focusPoint)
      this.#zoomLevel = customEvent.detail.zoomLevel
      this.#focusPoint = customEvent.detail.focusPoint
      this.#updateTheGraph()
    })

    document.addEventListener("advanceTime", () => {
      this.#advanceTime()
    })

    document.addEventListener("newHighScore", (event: Event) => {
      const customEvent = event as CustomEvent
      console.log ("newHighScore event received", customEvent.detail.scores)
      this.#scores = customEvent.detail.scores
      this.#saveScoresToLocalStorage()
    })

    document.addEventListener("buyButtonClicked", (event: Event) => {
      console.log('buyStock event received')
      const customEvent = event as CustomEvent
      if (customEvent.detail.id === 'buyMax') {
        const liquidAssets = this.#portfolio.getLiquidAssetsUSD()
        const stockPrice = this.#selectedStock.getPriceOnDay(this.#currentDay)
        const quantity = Math.floor(liquidAssets / stockPrice)
        this.#buyStock(quantity)
        return
      }
      const buttonIdAndQuantity = [{id: 'buy1', quantity: 1}, {id: 'buy5', quantity: 5}, {id: 'buy10', quantity: 10}]
      const eventButton = buttonIdAndQuantity.find((button) => button.id === customEvent.detail.id)
      if (!eventButton) {
        throw new Error(`Could not find button with id ${customEvent.detail.id}`)
      }
      this.#buyStock(eventButton.quantity)
    })

    document.addEventListener("sellButtonClicked", (event: Event) => {
      const customEvent = event as CustomEvent
      if (customEvent.detail.id === 'sellMax') {
        const quantity = this.#portfolio.getQuantityBySymbol(this.#selectedStock.symbol)
        this.#sellStock(quantity)
        return
      }
      const buttonIdAndQuantity = [{id: 'sell1', quantity: 1}, {id: 'sell5', quantity: 5}, {id: 'sell10', quantity: 10}]
      const eventButton = buttonIdAndQuantity.find((button) => button.id === customEvent.detail.id)
      if (!eventButton) {
        throw new Error(`Could not find button with id ${customEvent.detail.id}`)
      }
      this.#sellStock(eventButton.quantity)
    })

    document.addEventListener("playAgain", () => {
      const rightField = document.querySelector("#right-field")
      if (!rightField) {
        throw new Error("Could not find right-field element")
      }
      rightField.innerHTML = ""
      this.#rightControlsView = new RightControlsView()
      this.#controlsView.enableButtons()
      this.startGame()
    })
  }

  #updateTheGraph() {
    this.#selectedHeader.textContent = this.#selectedStock.name
    this.#graphComponent.setAxisTitles({ xAxis: 'Month and Day', yAxis: 'Value in $' })
    const allDatesArray = this.#selectedStock.datesArray
    const allValueArray = this.#selectedStock.valueArray
    const maxSlice = 3 + Math.floor(allDatesArray.length * (this.#zoomLevel / 100))
    const allowedMaxSlice = Math.min(maxSlice, this.#currentDay)
    const sliceStart = Math.floor(allDatesArray.length * (this.#focusPoint / 100))
    const allowedSliceStart = Math.min(sliceStart, this.#currentDay - allowedMaxSlice)
    const sliceEnd = allowedSliceStart + allowedMaxSlice
    const datesArray = allDatesArray.slice(allowedSliceStart, sliceEnd)
    const valueArray = allValueArray.slice(allowedSliceStart, sliceEnd)
    this.#graphComponent.setXAxisLabels(datesArray)
    this.#graphComponent.renderArrayAsGraph(valueArray)
  }

  #updateThePortfolioView() {
    this.#rightControlsView.updatePortfolioView(
        this.#portfolio,
        this.#currentDay,
        this.#selectedStock.getPriceOnDay(this.#currentDay)
    )
  }

  #advanceTime() {
    const speedFactors = [1, 2, 7, 14, 30]
    const speedFactor = speedFactors[this.#gameSpeed - 1]
    this.#advanceTimeByDays(speedFactor)
  }

  #advanceTimeByDays(days: number) {
    for (let i = 0; i < days; i++) {
      this.#advanceTimeByOneDay()
    }
  }

  #advanceTimeByOneDay() {
    this.#portfolio.valueOverTime.push(this.#portfolio.getTotalValueUSD(this.#currentDay))
    if (this.#currentDay >= this.#selectedStock.prices.length - 1) {
      this.#endGame()
      return
    } else {
      this.#currentDay++
    }
    if(this.#currentDay > 2) {
      this.#updateTheGraph()
      this.#updateThePortfolioView()
    }
  }

  #buyStock(quantity: number) {
    const stockPrice = this.#selectedStock.getPriceOnDay(this.#currentDay)
    const stockPurchase = new StockPurchase(this.#selectedStock, stockPrice, quantity)
    this.#portfolio.addPurchase(stockPurchase)
    this.#updateThePortfolioView()
  }

  #sellStock(quantity: number) {
    this.#portfolio.sellQuantityBySymbol(quantity, this.#selectedStock.symbol, this.#currentDay)
    this.#updateThePortfolioView()
  }

  #endGame() {
    const valueOverTime = this.#makeStockOfThePortfolioValueOverTime()
    this.#selectedStock = valueOverTime
    this.#updateTheGraph()
    this.#controlsView.disableButtons()
    const gameEndView = new GameEndView(this.#portfolio, this.#currentDay, this.#scores)
    gameEndView.displayEndGameMessage()
  }

  #makeStockOfThePortfolioValueOverTime() {
    const datesArray = this.#selectedStock.prices.map((price: ValueOnDay) => price.date)
    const valueOverTime = this.#portfolio.valueOverTime
    const valueOnDayArray = []
    for (let i = 0; i < datesArray.length; i++) {
      const valueOnDay = new ValueOnDay(datesArray[i], valueOverTime[i])
      valueOnDayArray.push(valueOnDay)
    }

    return new Stock('Portfolio', 'Portfolio', valueOnDayArray)
  }

  #loadScoresFromLocalStorage() {
    const scores = localStorage.getItem("DayTraderScores")
    if (scores) {
      this.#scores = JSON.parse(scores)
    } else {
      this.#scores = [
        { playerName: "", score: 0 },
        { playerName: "", score: 0 },
        { playerName: "", score: 0 },
        { playerName: "", score: 0 },
        { playerName: "", score: 0 },
      ]
    }
  }

  #saveScoresToLocalStorage() {
    localStorage.setItem("DayTraderScores", JSON.stringify(this.#scores))
  }
}