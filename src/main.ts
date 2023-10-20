import './gitSubModules/graphModule/components/graphdrawer/graphdrawer.js'
import jk224jvGraphdrawer from './gitSubModules/graphModule/components/graphdrawer/graphdrawer.js'
// NOTE: The apparent double import above is deliberate. The first import declares the custom element, the second import is for the type definition. Removing either import will cause problems with the compiler/IDE respectively even if IDE claims the second is un-used.
import { ApiCaller } from './classes/utilities/ApiCaller.js'
import { GameController } from './classes/controller/GameController.js'
import { Stock } from './classes/model/Stock.js'

const graphComponent = document.createElement('jk224jv-graphdrawer') as any
const container = document.querySelector('#component')
if (container) {
  container.appendChild(graphComponent)
}

graphComponent.setAxisTitles({xAxis: 'Month and Day', yAxis: 'Value in $'})
const apiCaller = new ApiCaller()
const stocks = await apiCaller.getStockHistories()

function runGame(stocks: Stock[]) {
  try {
    const gameController = new GameController(stocks)
    gameController.startGame()
  }
  catch (error) {
    runGame(stocks)
  }
}

runGame(stocks)
