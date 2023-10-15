import './gitSubModules/graphModule/components/graphdrawer/graphdrawer.js'
import jk224jvGraphdrawer from './gitSubModules/graphModule/components/graphdrawer/graphdrawer.js'
// NOTE: The apparent double import is deliberate. The first import declares the custom element, the second import is for the type definition. Removing either import will cause problems with the compiler/IDE respectively.
import { TimeConverter } from './classes/TimeConverter.js'
import { RawApiData } from './classes/RawApiData.js'
import { ApiDataParser } from './classes/ApiDataParser.js'
import { Stock } from './classes/Stock.js'
import { ControlsView } from './classes/view/ControlsView.js'

const graphComponent = document.createElement('jk224jv-graphdrawer') as jk224jvGraphdrawer
const container = document.querySelector('#component')
if (container) {
  container.appendChild(graphComponent)
}
graphComponent.setAxisTitles({xAxis: 'Month and Day', yAxis: 'Value in $'})
getStockHistory()

const controlsView = new ControlsView()

async function getStockHistory() {
  const ticker = 'AAPL'
  const timeConverter = new TimeConverter()
  const now = new Date()
  const oneYearAgo = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate())
  const from = timeConverter.convertDateToUnixTime(oneYearAgo)
  const to = timeConverter.convertDateToUnixTime(now)
  const response = await fetch (`http://localhost:8080/api/stocks/${ticker}?from=${from}&to=${to}`, {
    method: 'GET'
  })

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  if (response.body === null) {
    throw new Error(`Response body is null`)
  }

  const rawData = await JSON.parse(await response.text()) as RawApiData

  const parser = new ApiDataParser()
  const stock = parser.parseToStock(rawData) as Stock

  const graphComponent = document.querySelector('jk224jv-graphdrawer') as jk224jvGraphdrawer

  graphComponent.setXAxisLabels(stock.datesArray)
  console.log(stock.valueArray)
  graphComponent.renderArrayAsGraph(stock.valueArray)
  console.log(stock.valueArray)

}

const containerElement = document.querySelector("#componentBox")
const drawer = document.createElement('jk224jv-graphdrawer')
if (containerElement) {
  containerElement.appendChild(drawer)
}



