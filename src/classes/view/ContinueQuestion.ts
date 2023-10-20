export class ContinueQuestions {
  continueScreen: any

  #createStyledElement(tag: string, className: string, textContent = '') {
    const element = document.createElement(tag)
    if (className) {
      element.className = className
    }
    if (textContent != '') {
      element.textContent = textContent
    }
    return element
  }

  #createButton(text: string, colorClassName: string, clickEventName: string) {
    const button = this.#createStyledElement('button', `continue-button ${colorClassName}`, text)
    button.addEventListener('click', () => {
      const event = new CustomEvent(clickEventName as string, { bubbles: true })
      button.dispatchEvent(event)
      this.continueScreen.remove()
    })
    return button
  }

  displayContinueQuestion() {
    this.continueScreen = this.#createStyledElement('div', 'continue-background');

    const questionDiv = this.#createStyledElement('div', 'continue-content');
    const questionText = this.#createStyledElement('h1', '', 'There is a save, would you like to continue?');

    const buttonDiv = this.#createStyledElement('div', 'button-div');
    const yesButton = this.#createButton('Yes, load save', 'green', 'continueGame');
    const noButton = this.#createButton('No, start over', 'red', 'playAgain');

    buttonDiv.appendChild(yesButton)
    buttonDiv.appendChild(noButton)
    questionDiv.appendChild(questionText)
    questionDiv.appendChild(buttonDiv)
    this.continueScreen.appendChild(questionDiv)
    document.body.appendChild(this.continueScreen)
  }
}