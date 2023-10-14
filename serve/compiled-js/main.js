import './gitSubModules/graphModule/components/graphdrawer/graphdrawer.js';
// NOTE: The apparent double import is deliberate. The first import declares the custom element, the second import is for the type definition. Removing either import will cause problems with the compiler/IDE respectively.
const graphComponent = document.createElement('jk224jv-graphdrawer');
const container = document.querySelector('#component');
if (container) {
    container.appendChild(graphComponent);
}
graphComponent.setAxisTitles({ xAxis: 'Month and Day', yAxis: 'Value in $' });
graphComponent.setXAxisLabels(['a', 'b', 'c', 'd', 'e']);
graphComponent.renderArrayAsGraph([1, 3, 4, 5, 67]);
async function getStockHistory() {
    const response = await fetch('http://localhost:8080/api/stocks/APPLE?from=2019-01-01&to=2019-01-02', {
        method: 'GET'
    });
    console.log(response.body);
    const p = document.createElement('p');
    p.innerText = await response.text();
    document.body.appendChild(p);
}
const containerElement = document.querySelector("#componentBox");
const drawer = document.createElement('jk224jv-graphdrawer');
if (containerElement) {
    containerElement.appendChild(drawer);
}
getStockHistory();
//# sourceMappingURL=main.js.map