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

1. Clone the repository
2. Run `npm install` to install dependencies
3. Get an API key from [Finnhub.io](https://finnhub.io/register) and add it to the `.env` file.  
4. change the name of the `.env.example` file to `.env`
**Do not commit the API key!**   
**NEVER SERVE API KEYS PUBLICLY!**
3. Run `npm run launch` to start the vite server.
4. Open `http://localhost:3000` in your browser

### Development

You can run ``npm run build` to compile the Typescript files to Javascript.
Alternatively `npm run dev` is set up to watch for changes and compile on save.

### Playing the game
