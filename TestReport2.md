# Test report

Test report for DayTrader, as per the [test specifications](./test/testSpecification.md).

Version (commit hash): 5c98b31123bbc33239c0e242f79ecabfce13b39a  
Environment: Windows 11 (22H2), Avast! Secure Browser 118.0.22847.89 (64 bitar), Firefox 118.0.2 (64 bitar)  
Tester: Jimmy Karlsson  
Date: 2023-10-21

## Summary

| Test case | Result | Comment |
| --- | --- | --- |
| #1 | Passed | |
| #2 | Passed | |
| #3 | Passed | |
| #4 | Passed | The previous double click bug on firefox is fixed |
| #5 | Passed | |
| #6 | Passed | |
| #7 | Passed | The previous bug on firefox is fixed |
| #8 | Failed | The focus slider works backwards |
| #9 | Passed | |
| #10 | Passed | |
| #11 | Passed | |

## Test cases

### 1: The game should use the Finnhub.io API to get stock data

The backend returned a 200 ok response and a JSON object with stock data similar to the one in the specification.  
The status field was present and the value was "success" as expected.  
The ticker field was present and the value was "AAPL" as expected.  
The timestamps and closePrices fields were present and both had 10 elements as expected.  

Conclusion: The test passed.

### 2: The system should not overstep the Finnhub.io API rate limit

On spamming the refresh button, the backend started to que requests and returned them when the rate limit was no longer exceeded as expected.

Conclusion: The test passed.

### 3: The game should use the graphdrawer-component to draw a graph of the stock price over time

The graphdrawer-component was present and the graph was drawn and expanded as expected.

Conclusion: The test passed.

### 4: The user should be able to buy and sell stocks

The user was able to buy and sell stocks as expected.

Conclusion: The test passed, the previous bug on firefox is fixed.

### 5: The user should be able to see the current stock price & 6: The user should be able to see the current value of their portfolio

The user was able to see the current stock price and the current value of their portfolio as expected.

Conclusion: The test passed.

### 7: The user should be able to set the game speed

The user was able to set the game speed as expected.

Conclusion: The test passed, the previous bug on firefox is fixed.

### 8: The player should be able to see sections of the graph, to see how the price has changed over time

The user was able to see sections of the graph, but the focus slider works backwards.

Conclusion: The test failed.

### 9: When the player leaves the game, the game should be saved & Test 10: When the player returns to the game, the game should be loaded

The game was saved and loaded as expected.

Conclusion: The test passed.

### 11: When the game is over, the player should be able to see their score and compare it to other players

The player score and the high-score list was present as expected.

Conclusion: The test passed.