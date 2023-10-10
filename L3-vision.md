# Daytrader - A stock trading simulator

## A game where you buy and sell stock.

At the start of the game you are given a sum of money to invest in the stock market.  
You can buy and sell stocks and see how your portfolio develops over time.  
The game is over when you run out of money or a year has passed.  
The goal is to have as much money as possible at the end of the game.

The game is built in Typescript, compiled to Javascript and can be served on any web server.  
(The project comes preconfigured with Vite, but any web server will do.)  and then accessed through a web browser.  
Due to limitations in the API used, the game is limited to the US stock market and a limited number of stocks, also how fast the game can be played.

## Users

Anyone who wants to play a game where you buy and sell stocks, but don't want to risk real money.

## Requirements

The game should use the graphdrawer-component to draw a graph of the stock price over time.

The game should use the Polygon.io API to get stock prices.

The system should not overstep the API limits.

A player should be able to "buy" and "sell" stocks, and see their portfolio.

The player should be able to see the current price of a stock.

The player should be able to see the current value of their portfolio.

The player should be able to set the gamespeed, to make time skip faster or slower.  
Options should be: 1day, 2days, 1week, 2weeks, 1month.  
At jumps over 1 day, the game should "guess" the price of the stock, based on the previous price and the current price.

The player should be able to view the graph of a stock, to see how the price has changed over time.

The player should be able to see sections of the graph, to see how the price has changed over time.  
Section sizes should be: 1day, 2days, 1week, 2weeks, 1month.

If the player runs out of money, the game should be over.

When the player leaves the game, the game should be saved, so that the player can continue where they left off.

When the player enters the game, they should be able to continue where they left off.

When the game is over, the player should be able to see their score and compare it to other players.

## Tech stack

Webbserver: vite.
Node: 20
Language Backend: Typescript
Language Frontend: Javascript, HTML/CSS
APIer: Polygon.io API Stock API

|              |                                          |
|--------------|------------------------------------------|
| Name         | Jimmy Karlsson                           |
| Student id | jk224jv                                  |
