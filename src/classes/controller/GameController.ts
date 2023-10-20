import { Stock } from "./../model/Stock.js"
import { StockPurchase } from "./../model/StockPurchase.js"
import { Portfolio } from "./../model/Portfolio.js"
import { ControlsView } from "./../view/ControlsView.js"
import { RightControlsView } from "./../view/RightControlsView.js"
import { Score } from "./../model/Score.js"
import { GameEndView } from "./../view/GameEndView.js"
import { ValueOnDay } from "./../model/ValueOnDay.js"
import { generateChecksum } from "../utilities/CheckSumGenerator.js"
import { ContinueQuestions } from "../view/ContinueQuestion.js"

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
    this.#graphComponent = document.querySelector('jk224jv-graphdrawer')
    this.#graphComponent.setAxisTitles({ xAxis: 'Month and Day', yAxis: 'Value in $' })
    const selectedHeader = document.querySelector("#selected")
    if (!selectedHeader) {
      throw new Error("Could not find selected element")
    }
    this.#selectedHeader = selectedHeader
    this.#selectedHeader.textContent = this.#selectedStock.name
  }

  async startGame() {
    this.#portfolio = new Portfolio()
    this.#selectedStock = this.#stocks[0]
    this.#currentDay = 0
    this.#portfolio.valueOverTime = []
    this.#showFiveSecondsWelcomeMessage()
    this.#addEventListeners()
    if (this.#isThereASavedGame()) {
      new ContinueQuestions().displayContinueQuestion()
    } else {
      this.#newGame()
    }
  }

  #showFiveSecondsWelcomeMessage() {
    this.#graphComponent.clearCanvas()

    const canvas = document.querySelector("#canvas")
  }
  #newGame() {
    this.#advanceTimeByDays(3)
    this.#finalizeGameStart()
  }

  #finalizeGameStart() {
    this.#loadScoresFromLocalStorage()
    this.#updateTheGraph()
    this.#updateThePortfolioView()
    this.#controlsView.enableButtons()
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
      this.#zoomLevel = customEvent.detail.zoomLevel
      this.#focusPoint = customEvent.detail.focusPoint
      this.#updateTheGraph()
    })

    document.addEventListener("advanceTime", () => {
      this.#advanceTime()
    })

    document.addEventListener("newHighScore", (event: Event) => {
      const customEvent = event as CustomEvent
      this.#scores = customEvent.detail.scores
      this.#saveScoresToLocalStorage()
    })

    document.addEventListener("buyButtonClicked", (event: Event) => {
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
      this.#clearSavedGameState()
      this.startGame()
    })

    document.addEventListener("continueGame", async () => {
      await this.#loadGameState()
      this.#finalizeGameStart()
    })

    window.onbeforeunload = () => {
      this.#saveGameState()
    }
  }

  #updateTheGraph() {
    this.#selectedHeader.textContent = this.#selectedStock.name + " (Day " + this.#currentDay + " of " + (this.#selectedStock.prices.length - 1) + ")"
    this.#graphComponent.setAxisTitles({ xAxis: 'Month and Day', yAxis: 'Value in $' })
    const allDatesArray = this.#selectedStock.datesArray
    const allValueArray = this.#selectedStock.valueArray
    const maxSlice = 3 + Math.floor(allDatesArray.length * (this.#zoomLevel / 100))
    const allowedMaxSlice = Math.min(maxSlice, this.#currentDay)
    const sliceStart = Math.floor(allDatesArray.length * (this.#focusPoint / 100))
    const allowedSliceStart = Math.min(sliceStart, this.#currentDay - allowedMaxSlice)
    const sliceEnd = allowedSliceStart + allowedMaxSlice
    const datesArray = allDatesArray.slice(allowedSliceStart, sliceEnd + 1)
    const valueArray = allValueArray.slice(allowedSliceStart, sliceEnd + 1)
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
    this.#clearSavedGameState()
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

  #isThereASavedGame() {
    const gameState = localStorage.getItem('gameState');
    const portfolio = localStorage.getItem('portfolio');
    if (gameState != null && portfolio != null) {
      return true
    }
    return false
  }

  #clearSavedGameState() {
    localStorage.removeItem('gameState');
    localStorage.removeItem('gameStateChecksum');
    localStorage.removeItem('portfolio');
    localStorage.removeItem('portfolioChecksum');
  }

  async #saveGameState() {
    if (this.#currentDay <= 3) {
      // Don't save game state until after the first 3 days, the array is too small to render.
      return
    }
    if (this.#currentDay >= this.#selectedStock.prices.length - 1) {
      // Don't save game state if the game is over
      return
    }
    const gameState = {
        stocks: this.#stocks,
        currentDay: this.#currentDay
    };

    const serializedState = JSON.stringify(gameState);
    const checksum = await generateChecksum(serializedState);
    localStorage.setItem('gameState', serializedState);
    localStorage.setItem('gameStateChecksum', checksum);

    this.#portfolio.savePortfolioState();
  }

  async #loadGameState() {
    const serializedState = localStorage.getItem('gameState');
    const storedChecksum = localStorage.getItem('gameStateChecksum');
    if (!serializedState || !storedChecksum) {
      throw new Error("Could not load game state from local storage")
    }

    const checksum = await generateChecksum(serializedState);
    if (checksum !== storedChecksum) {
      throw new Error("Checksums do not match, cannot load game state")
    }
    const gameState = JSON.parse(serializedState);
    // GTP helped with this map function
    this.#stocks = gameState.stocks.map((stockData: { name: string, symbol: string, prices: { date: string, valueInUSD: number }[] }) => {
      return new Stock(stockData.name, stockData.symbol, stockData.prices.map(this.#convertToValueOnDay))
    })

    this.#selectedStock = this.#stocks[0]
    this.#currentDay = gameState.currentDay;
    await this.#portfolio.loadPortfolioState(this.#stocks);
  }

 #convertToValueOnDay (priceData: { date: string; valueInUSD: number; }) {
    return new ValueOnDay(new Date(priceData.date), priceData.valueInUSD);
  }
}