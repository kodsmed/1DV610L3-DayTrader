export class TimeConverter {
  convertUnixTimeToDate(unixTime: number) {
    return new Date(unixTime * 1000)
  }

  convertDateToUnixTime(date: Date) {
    return Math.floor(date.getTime() / 1000)
  }
}