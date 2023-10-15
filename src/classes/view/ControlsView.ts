export class ControlsView {
  zoomLevel: number;
  focusPoint: number;
  gameSpeed: number;
  #controlsView
  #zoomSlider: HTMLInputElement;
  #focusPointSlider: HTMLInputElement;
  #gameSpeedSlider: HTMLInputElement;
  #zoomReadOut: HTMLParagraphElement;
  #focusPointReadOut: HTMLParagraphElement;
  #gameSpeedReadOut: HTMLParagraphElement;
  #gameSpeedStrings: string[];

    constructor() {
      const controlView = document.querySelector("#controls");
      if (!controlView) {
        throw new Error("Could not find controls element");
      }
      this.#controlsView = controlView;
      this.#gameSpeedStrings = ["1 day", "2 days", "1 week", "2 weeks", "1 month"];
      this.#buildControlView();
      this.#zoomSlider = document.querySelector("#zoomSlider") as HTMLInputElement;
      this.#focusPointSlider = document.querySelector("#focusPointSlider") as HTMLInputElement;
      this.#gameSpeedSlider = document.querySelector("#gameSpeedSlider") as HTMLInputElement;
      this.zoomLevel = parseInt(this.#zoomSlider.value);
      this.focusPoint = parseInt(this.#focusPointSlider.value);
      this.gameSpeed = parseInt(this.#gameSpeedSlider.value);
      this.#zoomReadOut = document.querySelector("#zoomReadOut") as HTMLParagraphElement;
      this.#focusPointReadOut = document.querySelector("#focusPointReadOut") as HTMLParagraphElement;
      this.#gameSpeedReadOut = document.querySelector("#gameSpeedReadOut") as HTMLParagraphElement;
    }

    #buildControlView() {
    const controlView = this.#controlsView;

    const zoomDiv = this.#buildZoomSlider();
    controlView.appendChild(zoomDiv)
    const focusDiv = this.#buildFocusPointSlider()
    controlView.appendChild(focusDiv)
    const gameSpeedDiv = this.#buildGameSpeedSlider()
    controlView.appendChild(gameSpeedDiv)
    const advanceTimeButton = this.#buildAdvanceTimeButton()
    controlView.appendChild(advanceTimeButton)
    }

    #buildZoomSlider() {
      const div = document.createElement("div");
      const zoomSlider = document.createElement("input");
      zoomSlider.type = "range";
      zoomSlider.min = "1";
      zoomSlider.max = "100";
      zoomSlider.value = "1";
      zoomSlider.id = "zoomSlider";
      zoomSlider.addEventListener("input", (event) => {
        const slider = event.target as HTMLInputElement;
        const zoomValue = slider.value;
        const zoomLevel = parseInt(zoomValue);
        this.setZoomLevel(zoomLevel);
      });
      const label = document.createElement("label");
      label.htmlFor = "zoomSlider";
      label.textContent = "Zoom";
      const readOut = document.createElement("p");
      readOut.id = "zoomReadOut";
      readOut.textContent = "1%";
      div.appendChild(label);
      div.appendChild(zoomSlider);
      div.appendChild(readOut);
      return div;
    }

    #buildFocusPointSlider() {
      const div = document.createElement("div");
      const focusPointSlider = document.createElement("input");
      focusPointSlider.type = "range";
      focusPointSlider.min = "1";
      focusPointSlider.max = "100";
      focusPointSlider.value = "1";
      focusPointSlider.id = "focusPointSlider";
      focusPointSlider.addEventListener("input", (event) => {
        const slider = event.target as HTMLInputElement;
        const focusPointValue = slider.value;
        const focusPoint = parseInt(focusPointValue);
        this.setFocusPoint(focusPoint);
      });
      const label = document.createElement("label");
      label.htmlFor = "focusPointSlider";
      label.textContent = "Focus Point";
      div.appendChild(label);
      div.appendChild(focusPointSlider);
      const readOut = document.createElement("p");
      readOut.id = "focusPointReadOut";
      readOut.textContent = "1%";
      div.appendChild(readOut);
      return div;
    }

    #buildGameSpeedSlider() {
      const div = document.createElement("div");
      const gameSpeedSlider = document.createElement("input");
      gameSpeedSlider.type = "range";
      gameSpeedSlider.min = "1";
      gameSpeedSlider.max = "5";
      gameSpeedSlider.value = "1";
      gameSpeedSlider.id = "gameSpeedSlider";
      gameSpeedSlider.addEventListener("input", (event) => {
        const slider = event.target as HTMLInputElement;
        const gameSpeedValue = slider.value;
        const gameSpeed = parseInt(gameSpeedValue);
        this.setGameSpeed(gameSpeed);
      });
      const label = document.createElement("label");
      label.htmlFor = "gameSpeedSlider";
      label.textContent = "Game Speed";
      div.appendChild(label);
      div.appendChild(gameSpeedSlider);
      const readOut = document.createElement("p");
      readOut.id = "gameSpeedReadOut";
      readOut.textContent = this.#gameSpeedStrings[0];
      div.appendChild(readOut);
      return div;
    }

    setZoomLevel(zoomLevel: number) {
      this.zoomLevel = zoomLevel;
      this.#zoomReadOut.textContent = `${zoomLevel}%`;
      this.#emitGraphViewChange();
    }

    setFocusPoint(focusPoint: number) {
      this.focusPoint = focusPoint;
      this.#focusPointReadOut.textContent = `${focusPoint}%`;
      this.#emitGraphViewChange();
    }

    setGameSpeed(gameSpeed: number) {
      this.gameSpeed = gameSpeed;
      this.#gameSpeedReadOut.textContent = this.#gameSpeedStrings[gameSpeed - 1];
      this.#emitGameSpeedChange();
    }

    #buildAdvanceTimeButton() {
      const button = document.createElement("button");
      button.textContent = "Advance Time";
      button.addEventListener("click", () => {
        this.#emitAdvanceTime();
      });
      return button;
    }

    #emitAdvanceTime() {
      const advanceTime = new CustomEvent("advanceTime");
      this.#controlsView.dispatchEvent(advanceTime);
    }

    #emitGraphViewChange() {
      const graphViewChange = new CustomEvent("graphViewChange", {
        detail: {
          zoomLevel: this.zoomLevel,
          focusPoint: this.focusPoint,
        },
      });
      this.#controlsView.dispatchEvent(graphViewChange);
    }

    #emitGameSpeedChange() {
      const gameSpeedChange = new CustomEvent("gameSpeedChange", {
        detail: {
          gameSpeed: this.gameSpeed,
        },
      });
      this.#controlsView.dispatchEvent(gameSpeedChange);
    }
  }