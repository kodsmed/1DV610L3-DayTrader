# Lab 3 - The App

This is part of the course [1dv610 - Introduction to Software Quality](https://coursepress.lnu.se/kurs/introduktion-till-mjukvarukvalitet/) at [Linnaeus University](https://lnu.se/).  
The goal is to create an application following the Clean Code principles and that utilize the module created in [Lab 2 - graphdrawer](https://github.com/kodsmed/graphdrawer).

## A stock trading simulator

At the start of the game you are given a sum of money to invest in the stock market.  
You can buy and sell stocks and see how your portfolio develops over time.  
The game is over when you run out of money or a year has passed.  
The goal is to have as much money as possible at the end of the game.

The game is built in Typescript, compiled to Javascript and can be served on any web server.  
(The project comes pre-configured with Vite, but any web server will do.)  and then accessed through a web browser.  
Due to limitations in the API used, the game is limited to the US stock market and a limited number of stocks,  
also how fast the game can be played.

## Usage

### Installation

0. Install and start the [DayTrader-BackEnd](https://github.com/kodsmed/1DV610L3-DayTrader-BackEnd)
1. Clone the repository
2. If the backend runs on anything but localhost:8080, update the `BACKEND_URL` in `src/config.ts` to point to the backend server.
3. Run `npm install` to install dependencies
4. Run `npm run dev` to start the vite server.
5. Open `http://localhost:3000` (port may vary, but it will tell you what port it uses.) in your browser
(6). If you want a production build, run `npx tsc` followed by `npm run build` and serve the `serve` at a web server of your choice. Don't forget the backend.

### Development

You can run `npm run devTS`, to continuously compile the Typescript files to Javascript.  
It is set up to compile to the `serve` folder, which is picked up by the vite server.

The internal graphdrawer module is set up as a git submodule, so should you want to update it to a later version,  
you can run `git clone https://github.com/kodsmed/graphdrawer --recurse-submodule`.

### Playing the game
