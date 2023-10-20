# DayTrader - A stock trading simulator

## A game where you buy and sell stock

At the start of the game you are given a sum of money to invest in the stock market.  
You can buy and sell stocks and see how your portfolio develops over time.  
The game is over when you run out of money or a year has passed.  
The goal is to have as much money as possible at the end of the game.

The game is built in Typescript, compiled to Javascript and can be served on any web server.  
(The project comes pre-configured with Vite, but any web server will do.)  and then accessed through a web browser.  
Due to limitations in the API used, the game is limited to the US stock market and a limited number of stocks, also how fast the game can be played.

## Users

Anyone who wants to play a game where you buy and sell stocks, but don't want to risk real money.

## Requirements

☑ The game should use the Finnhub.io API to get stock prices.

☑ The system should not overstep the API limits.

☑ The game should use the graphdrawer-component to draw a graph of the stock price over time.

☑ A player should be able to "buy" and "sell" stocks, and see their portfolio.

☑ The player should be able to see the current price of a stock.

☑ The player should be able to see the current value of their portfolio.

☑ The player should be able to set the game speed, to make time skip faster or slower.  
☑ Options should be: 1day, 2days, 1week, 2weeks, 1month.  

☑ The player should be able to see sections of the graph, to see how the price has changed over time.  

☑ When the player leaves the game, the game should be saved, so that the player can continue where they left off.

☑ When the player enters the game, they should be able to continue where they left off.

☑ When the game is over, the player should be able to see their score and compare it to other players.

## Tech stack

Webbserver: vite.
Node: 20
Language Backend: Typescript
Language Frontend: Javascript, HTML/CSS
APIer: Finnhub.io Stock API

|              |                                          |
|--------------|------------------------------------------|
| Name         | Jimmy Karlsson                           |
| Student id | jk224jv                                  |
