import { ValueOnDay } from "./ValueOnDay.js"

export class Stock{
    name: string
    symbol: string
    prices: ValueOnDay[]

    constructor(name: string, symbol: string, prices: ValueOnDay[]){
        this.name = name
        this.symbol = symbol
        this.prices = prices
    }

    getPriceOnDay(day: number){
        if (day < 0 || day >= this.prices.length){
            throw new Error(`Cannot get price on day ${day} because there are only ${this.prices.length} days.`)
        }
        return this.prices[day].valueInUSD
    }

    get valueArray(){
        return this.prices.map((price: ValueOnDay) => price.valueInUSD)
    }

    get datesArray(){
        return this.prices.map((price: ValueOnDay) => price.dateToString)
    }
}