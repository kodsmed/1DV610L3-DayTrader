import 'graphdrawer/component'
import jk224jvGraphdrawer  from 'graphdrawer/type'
// NOTE: The apparent double import above is deliberate. The first import declares the custom element, the second import is for the type definition.
import { ApiCaller } from './classes/utilities/ApiCaller.js'
import { GameController } from './classes/controller/GameController.js'
import { MessageRenderer } from './classes/view/MessageRenderer.js'

declare global {
  interface HTMLElementTagNameMap {
    'jk224jv-graphdrawer': jk224jvGraphdrawer;
  }
}

const graphComponent = document.createElement('jk224jv-graphdrawer')
const container = document.querySelector('#component')
if (container) {
  container.appendChild(graphComponent)
}


graphComponent.setAxisTitles({xAxis: 'Month and Day', yAxis: 'Value in $'})
const apiCaller = new ApiCaller()


async function runGame() {
  try {
    const stocks = await apiCaller.getStockHistories()
    const gameController = new GameController(stocks)
    gameController.startGame()
  }
  catch (error) {
    const messageRenderer = new MessageRenderer()
    const errorMessage = "Something went wrong. Please refresh the page and try again."
    // Display the error message then do nothing
    messageRenderer.showWMessageForSecondsBeforeCallback(errorMessage, 0, () => {})
  }
}

runGame()
