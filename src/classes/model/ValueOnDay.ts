export class ValueOnDay {
    date: Date
    valueInUSD: number

    constructor(date: Date, value: number) {
        this.date = date
        this.valueInUSD = value
        Object.freeze(this)
    }

    get dateToString() {
        return `${this.date.getMonth() + 1} / ${this.date.getDate()}`
    }
}