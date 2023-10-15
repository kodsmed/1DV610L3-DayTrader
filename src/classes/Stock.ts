import { ValueOnDay } from "./ValueOnDay.js";

export class Stock{
    name: string;
    symbol: string;
    prices: ValueOnDay[];

    constructor(name: string, symbol: string, prices: ValueOnDay[]){
        this.name = name;
        this.symbol = symbol;
        this.prices = prices
    }

    getPriceOnDay(date: Date){
        return this.prices.find((price: ValueOnDay) => price.date.getTime() === date.getTime()) || new ValueOnDay(date, 0);
    }

    get valueArray(){
        return this.prices.map((price: ValueOnDay) => price.valueInUSD);
    }

    get datesArray(){
        return this.prices.map((price: ValueOnDay) => price.dateToString);
    }
}