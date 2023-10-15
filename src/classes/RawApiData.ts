export class RawApiData {
    status: string;
    ticker: string;
    timestamps: number[];
    closePrices: number[];

    constructor(status: string, ticker: string, timestamps: number[], closePrices: number[]) {
        this.status = status;
        this.ticker = ticker;
        this.timestamps = timestamps;
        this.closePrices = closePrices;
    }
}