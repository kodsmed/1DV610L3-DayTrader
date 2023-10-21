import { Stock } from "./../model/Stock.js"
import { StockPurchase } from "./../model/StockPurchase.js"
import { Portfolio } from "./../model/Portfolio.js"
import { ControlsView } from "./../view/ControlsView.js"
import { RightControlsView } from "./../view/RightControlsView.js"
import { MessageRenderer } from "../view/MessageRenderer.js"
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
  #advanceTimeTimeout: any

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
    this.#addEventListeners()
  }

  async startGame() {
    this.#portfolio = new Portfolio()
    this.#selectedStock = this.#stocks[0]
    this.#currentDay = 0
    this.#portfolio.valueOverTime = []
    const welcomeScreen = new MessageRenderer()
    const message = "Welcome to Day Trader!"
    const seconds = 1
    welcomeScreen.showWMessageForSecondsBeforeCallback(message, seconds, this.#resumeStartGame.bind(this))
  }

  #resumeStartGame() {
    if (this.#isThereASavedGame()) {
      new ContinueQuestions().displayContinueQuestion()
    } else {
      this.#newGame()
    }
  }

  #newGame() {
    this.#advanceTimeByDays(1)
    this.#finalizeGameStart()
  }

  #finalizeGameStart() {
    this.#loadScoresFromLocalStorage()
    this.#updateTheGraph()
    this.#updateThePortfolioView()
    this.#controlsView.enableButtons()
  }

  #addEventListeners() {
    this.#removeAllEventListeners()
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
        if (quantity === 0) {
          return
        }
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
      if (customEvent.detail.id === 'sellAll') {
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

  #removeAllEventListeners() {
    document.removeEventListener("stockSelected", () => {})
    document.removeEventListener("gameSpeedChange", () => {})
    document.removeEventListener("graphViewChange", () => {})
    document.removeEventListener("advanceTime", () => {})
    document.removeEventListener("newHighScore", () => {})
    document.removeEventListener("buyButtonClicked", () => {})
    document.removeEventListener("sellButtonClicked", () => {})
    document.removeEventListener("playAgain", () => {})
    document.removeEventListener("continueGame", () => {})
  }

  #updateTheGraph() {
    this.#selectedHeader.textContent = this.#selectedStock.name + " (Day " + this.#currentDay + " of " + (this.#selectedStock.prices.length - 1) + ")"
    this.#graphComponent.setAxisTitles({ xAxis: 'Month and Day', yAxis: 'Value in $' })
    const allDatesArray = this.#selectedStock.datesArray
    const allValueArray = this.#selectedStock.valueArray
    const [from, to] = this.#getGraphViewRange(this.#currentDay, this.#zoomLevel, this.#focusPoint)
    const datesArray = allDatesArray.slice(from, to)
    const valueArray = allValueArray.slice(from, to)
    this.#graphComponent.setXAxisLabels(datesArray)
    this.#graphComponent.renderArrayAsGraph(valueArray)
  }

  #getGraphViewRange(currentDay: number, zoomLevel: number, focusPoint: number): [number, number] {
    const miniumRangeRequired = 2
    const selectedRange = Math.floor(zoomLevel / 100 * currentDay)
    const calculatedRange = Math.max(selectedRange, miniumRangeRequired)
    const selectedFocusPoint = Math.floor(focusPoint / 100 * currentDay)
    const from = Math.max(0, selectedFocusPoint - calculatedRange)
    const to = Math.min(currentDay, selectedFocusPoint + calculatedRange) + 1
    return [from, to]
  }

  #updateThePortfolioView() {
    this.#rightControlsView.updatePortfolioView(
        this.#portfolio,
        this.#currentDay,
        this.#selectedStock.getPriceOnDay(this.#currentDay)
    )
  }

  #advanceTime() {
    if (!this.#isTimeAllowedToAdvance()) {
      return
    }
    const speedFactors = [1, 2, 7, 14, 30]
    const speedFactor = speedFactors[this.#gameSpeed - 1]
    this.#advanceTimeByDays(speedFactor)
  }

  #isTimeAllowedToAdvance() {
    // only allow advancing time once every 0.1 seconds
    if (this.#advanceTimeTimeout) {
      return false
    }
    this.#advanceTimeTimeout = setTimeout(() => {
      this.#advanceTimeTimeout = false
    }, 100)
    return true
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
    if(this.#currentDay > 1) {
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