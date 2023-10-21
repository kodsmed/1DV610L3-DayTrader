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
    const endGameMessage = this.#buildEndGameMessageFromTemplate()
    this.#appendEndGameScoreToParent(endGameMessage)
    this.#appendPercentageChangeToParent(endGameMessage)

    const playersScore = this.#portfolio.getTotalValueUSD(this.#currentDay)
    const lowestHighScore = this.#scores[this.#scores.length - 1].score
    if (playersScore > lowestHighScore) {
      this.#handleNewHighScore(endGameMessage)
    } else {
      this.#appendScoreTableToParent(endGameMessage)
      this.#appendPlayAgainButtonToParent(endGameMessage)
    }
    return endGameMessage
  }

  #buildEndGameMessageFromTemplate() {
    const endGameMessageTemplate = document.createElement('template')
    endGameMessageTemplate.innerHTML = `
      <div id='endGameMessage'>
        <h2 id='endGameText'>Game Over</h2>
      </div>
    `
    const endGameMessage = endGameMessageTemplate.content.firstElementChild as HTMLDivElement
    return endGameMessage
  }

  #appendEndGameScoreToParent(parent: HTMLDivElement) {
    const score = this.#portfolio.getTotalValueUSD(this.#currentDay)
    const endGameScore = document.createElement('p')
    endGameScore.id = 'endGameScore'
    endGameScore.textContent = `Your final score is $${score}`
    parent.appendChild(endGameScore)
  }

  #appendPercentageChangeToParent(parent: HTMLDivElement) {
    const percentageChange = document.createElement('p')
    percentageChange.id = 'percentageChange'
    const percentageChangeValue = this.#portfolio.getPercentageChange(this.#currentDay)
    percentageChange.textContent = `You changed your portfolio value by `
    if (percentageChangeValue > 0) {
      percentageChange.textContent += `+${percentageChangeValue}%`
      percentageChange.style.color = 'green'
    } else if (percentageChangeValue < 0) {
      percentageChange.textContent += `-${percentageChangeValue}%`
      percentageChange.style.color = 'red'
    } else {
      percentageChange.textContent += `${percentageChangeValue}%`
    }
    parent.appendChild(percentageChange)
  }

  #handleNewHighScore(parent: HTMLDivElement) {
    const template = document.createElement('template')
    template.innerHTML = `
        <div id='newHighScore'>
          <h3>New High Score!</h3>
            <label for='playerName'>Enter your name:</label>
            <input type='text' id='playerName' name='playerName' required minlength='3' maxlength='32'>
            <input type='button' id='playerNameSubmit' value='Submit'>
        </div>
      `
    parent.appendChild(template.content)
    parent.querySelector('#playerNameSubmit')?.addEventListener('click', (event) => {
      event.preventDefault()
      this.#handleHighScoreFormSubmit(event)
    })
  }

  #appendScoreTableToParent(parent: HTMLDivElement) {
    const scoreTable = this.#buildScoreTable(this.#scores)
    parent.appendChild(scoreTable)
  }

  #appendPlayAgainButtonToParent(parent: HTMLDivElement) {
    const playAgainButton = this.#buildPlayAgainButton()
    parent.appendChild(playAgainButton)
  }

  #handleHighScoreFormSubmit(event: Event) {
    const playerName = this.#getPlayersName()
    const score = this.#portfolio.getTotalValueUSD(this.#currentDay)
    this.#scores = this.#sortNewScoreIntoScores(playerName, score, this.#scores)
    this.#emitNewHighScoreEvent(this.#scores)

    document.querySelector('#newHighScore')?.remove()

    const endGameMessage = document.querySelector('#endGameMessage') as HTMLDivElement
    if (!endGameMessage) {
      throw new Error('Could not find endGameMessage element')
    }
    this.#appendScoreTableToParent(endGameMessage)
    this.#appendPlayAgainButtonToParent(endGameMessage)
  }

  #getPlayersName() {
    const textField = document.querySelector('#playerName') as HTMLInputElement

    const playerName = `${textField.value}` as string
    return playerName
  }

  #sortNewScoreIntoScores(playerName: string, score: number, scores: Score[]) {
    const newScore = new Score(playerName, score)
    this.#scores.push(newScore)
    this.#scores.sort((a, b) => b.score - a.score)
    this.#scores.pop()
    return this.#scores
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