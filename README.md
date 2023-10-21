# Lab 3 - The App

This is part of the course [1dv610 - Introduction to Software Quality](https://coursepress.lnu.se/kurs/introduktion-till-mjukvarukvalitet/) at [Linnaeus University](https://lnu.se/).  
The goal is to create an application following the Clean Code principles and that utilize the module created in [Lab 2 - graphdrawer](https://github.com/kodsmed/graphdrawer).

## A stock trading simulator

At the start of the game you are given a sum of money to invest in the stock market.  
You can buy and sell stocks and see how your portfolio develops over time.  
The game is over when a year has passed.  
The goal is to have as much money as possible at the end of the game.

The game is built in Typescript, compiled to Javascript and can be served on any web server.  
(The project comes pre-configured with Vite, but any web server will do.)  and then accessed through a web browser.  
Due to limitations in the API used, the game is limited to the US stock market and a limited number of stocks.

### Demo video

[![DayTrader - Demo video](https://i.ytimg.com/vi/Fmf_Z6If8-4/hqdefault.jpg)](http://www.youtube.com/watch?v=Fmf_Z6If8-4 "DayTrader - Demo video")

## Usage

### Installation

0. Install and start the [DayTrader-BackEnd](https://github.com/kodsmed/1DV610L3-DayTrader-BackEnd)
1. Clone the repository
2. If the backend runs on anything but localhost:8080, update the `BACKEND_URL` in `src/config.ts` to point to the backend server.
3. Run `npm install` to install dependencies
4. Run `npx tsc` to compile the Typescript files to Javascript (or `npm run devTS` to continuously compile)
5. Run `npm run dev` to start the vite server.
6. Open `http://localhost:5173` (port may vary, but it will tell you what port it uses.) in your browser
(7). If you want a production build, run `npx tsc` followed by `npm run build` and serve the `serve` at a web server of your choice. Don't forget the backend.

### Playing the game

After the installation process, you can open `http://localhost:5173` (port may vary, but it will tell you what port it uses.) in your browser.  
You select a stock from the dropdown menu, and then click the buy or sell button to buy or sell stocks that stock.  
The stock owned by the player is shown in the table between the dropdown menu and the buy/sell buttons.  
You advance the time by clicking the "Advance time" button at the center bottom of the page. When clicking the button,  
the time will advance according to the selected speed, and more stock prices will be revealed and the graph updated automatically.

If you leave the page or close the browser, the game will be saved, and you can continue where you left off when you return.  
When the year is over, the game is over, and you can see your score and compare it to others on the high-score list.  
At this point the value of your portfolio is rendered as a graph, and you can see how it has changed over time.  
If your score is high enough, you can enter your name and submit your score to the high-score list.

### Development

You can run `npm run devTS`, to continuously compile the Typescript files to Javascript.  
It is set up to compile to the `serve` folder, which is picked up by the vite server, and that is where the vite server serves the files from.  
The `serve` folder is also where the index.html and css files are located, so you can edit those directly.

The internal graphdrawer module is set up as a git submodule, so should you want to update it to a later version,  
you can run `git clone https://github.com/kodsmed/graphdrawer --recurse-submodule`.

## Issues, bugs and limitations

### Issues

* the game is not very responsive, it is designed for full screen on a desktop computer.
* it doesn't have a favicon resulting in a 404 error in the console.

### Bugs

* none known at this time.

### Limitations

* only the US stock market is supported.
* It is possible to manually change what stocks are traded by updating the `src/config.ts` file,  
  but currently no in-game way to do this is implemented and the config is not validated so **make sure to use existing stocks**.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details  
Author: Jimmy Karlsson (jk224jv) [kodsmed](github.com/kodsmed), copyright 2023
