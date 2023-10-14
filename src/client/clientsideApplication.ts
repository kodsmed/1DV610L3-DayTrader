import "./classes/3rdpartycomponents/graphdrawer/graphdrawer.js";

const newHeader = document.createElement('h1');
newHeader.innerText = 'hello from the client side';
document.body.appendChild(newHeader);


async function getStockHistory() {
  const response = await fetch ('./api/stocks/APPLE?from=2019-01-01&to=2019-01-02')
  console.log(response.body)
  const p = document.createElement('p')
  p.innerText = await response.text()
  document.body.appendChild(p)
}

const containerElement = document.querySelector("#componentBox")
const drawer = document.createElement('jk224jv-graphdrawer')
if (containerElement) {
  containerElement.appendChild(drawer)
}

getStockHistory()

