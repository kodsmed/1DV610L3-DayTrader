import dotenv from 'dotenv';
dotenv.config({ path: './.env' });

const apiKey = process.env.FINNHUB_API_KEY;

const apiURL = `https://finnhub.io/api/v1/stock/candle?symbol=AAPL&resolution=1&from=0&to=1696969282&token=${apiKey}`;

const options = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
};



async function testApi() {
  const response = await fetch(`${apiURL}`, options);
  const data = await response.json();
  console.log(data);
}

testApi();
