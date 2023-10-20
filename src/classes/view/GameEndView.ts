import { Score } from '../model/Score.js'
import { Portfolio } from '../model/Portfolio.js'

export class GameEndView {
  #portfolio: Portfolio
  #currentDay: number
  #scores: Score[]

  constructor(portfolio: Portfolio, currentDay: number, scores: Score[]) {
    this.#portfolio = portfolio
    this.#currentDay = currentDay
    this.#scores = scores
  }

  displayEndGameMessage() {
    const rightField = document.querySelector('#right-field')
    if (!rightField) {
      throw new Error('Could not find rightField element')
    }
    rightField.innerHTML = ''
    const endGameMessage = this.#buildEndGameMessage()
    rightField.appendChild(endGameMessage)
  }

  #buildEndGameMessage() {
    const endGameMessageTemplate = document.createElement('template')
    endGameMessageTemplate.innerHTML = `
      <div id='endGameMessage'>
        <h2 id='endGameText'>Game Over</h2>
        <p id='endGameScore'></p>
        <p id='percentageChange'></p>
      </div>
    `
    const endGameMessage = endGameMessageTemplate.content.firstElementChild as HTMLDivElement
    const score = this.#portfolio.getTotalValueUSD(this.#currentDay)
    const endGameScore = endGameMessage.querySelector('#endGameScore') as HTMLParagraphElement
    endGameScore.textContent = `Your final score is $${score}`

    const percentageChange = endGameMessage.querySelector('#percentageChange') as HTMLParagraphElement
    const percentageChangeValue = this.#portfolio.getPercentageChange(this.#currentDay)
    percentageChange.textContent = `You changed your portfolio value by `
    if (percentageChangeValue > 0) {
      percentageChange.textContent += `+${percentageChangeValue}%`
      percentageChange.style.color = 'green'
    } else if (percentageChangeValue < 0){
      percentageChange.textContent += `-${percentageChangeValue}%`
      percentageChange.style.color = 'red'
    }
    endGameMessage.appendChild(percentageChange)

    if (this.#portfolio.getTotalValueUSD(this.#currentDay) > this.#scores[this.#scores.length - 1].score) {
      const template = document.createElement('template')
      template.innerHTML = `
        <div id='newHighScore'>
          <h3>New High Score!</h3>
            <label for='playerName'>Enter your name:</label>
            <input type='text' id='playerName' name='playerName' required minlength='3' maxlength='32'>
            <input type='button' id='playerNameSubmit' value='Submit'>
        </div>
      `
      endGameMessage.appendChild(template.content)
      endGameMessage.querySelector('#playerNameSubmit')?.addEventListener('click', (event) => {
        event.preventDefault()
        this.#handleHighScoreFormSubmit(event)
      })
    } else {
      const scoreTable = this.#buildScoreTable(this.#scores)
      endGameMessage.appendChild(scoreTable)
      endGameMessage.appendChild(this.#buildPlayAgainButton())
    }
    return endGameMessage
  }

  #handleHighScoreFormSubmit(event: Event) {
    const textField = document.querySelector('#playerName') as HTMLInputElement

    const playerName = `${textField.value}` as string

    const score = this.#portfolio.getTotalValueUSD(this.#currentDay)
    const newScore = new Score(playerName, score)
    this.#scores.push(newScore)
    this.#scores.sort((a, b) => b.score - a.score)
    this.#scores.pop()
    this.#emitNewHighScoreEvent(this.#scores)
    const scoreTable = this.#buildScoreTable(this.#scores)
    const endGameMessage = document.querySelector('#endGameMessage')
    if (!endGameMessage) {
      throw new Error('Could not find endGameMessage element')
    }
    endGameMessage.appendChild(scoreTable)
    document.querySelector('#newHighScore')?.remove()
    endGameMessage.appendChild(this.#buildPlayAgainButton())
  }

  #buildPlayAgainButton() {

    const playAgainButton = document.createElement('button')
    playAgainButton.id = 'playAgainButton'
    playAgainButton.textContent = 'Play Again'
    playAgainButton.addEventListener('click', () => {
      const event = new CustomEvent('playAgain', {
        bubbles: true
      })
      playAgainButton.dispatchEvent(event)
    })
    return playAgainButton
  }

  #buildScoreTable(scores: Score[]) {
    const tableTemplate = document.createElement('template')
    tableTemplate.innerHTML = `
      <table id='scoreTable'>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Score</th>
        </tr>
      </table>
    `
    const scoreTable = tableTemplate.content.firstElementChild as HTMLTableElement
    scores.forEach((score, index) => {
      const row = document.createElement('tr')
      const rank = document.createElement('td')
      rank.textContent = `${index + 1}`
      row.appendChild(rank)
      const name = document.createElement('td')
      name.textContent = `${score.playerName}`
      row.appendChild(name)
      const scoreValue = document.createElement('td')
      scoreValue.textContent = `${score.score}`
      row.appendChild(scoreValue)
      scoreTable.appendChild(row)
    })
    return scoreTable
  }

  #emitNewHighScoreEvent(scores: Score[]) {
    const event = new CustomEvent('newHighScore', {
      detail: {
        scores: scores
      },
      bubbles: true
    })
    document.dispatchEvent(event)
  }
}