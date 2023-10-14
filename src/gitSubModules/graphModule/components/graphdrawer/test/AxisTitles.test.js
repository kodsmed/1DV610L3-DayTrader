import { AxisTitles } from '../classes/AxisTitles.js'

describe('AxisTitles', () => {
  describe('constructor', () => {
    it('should throw a TypeError if xAxis is not a string', () => {
      expect(() => new AxisTitles(1, 'yAxis')).toThrow(TypeError)
    })
    it('should throw a TypeError if yAxis is not a string', () => {
      expect(() => new AxisTitles('xAxis', 1)).toThrow(TypeError)
    })
    it('should throw a TypeError if xAxis is null', () => {
      expect(() => new AxisTitles(null, 'yAxis')).toThrow(TypeError)
    })
    it('should throw a TypeError if yAxis is null', () => {
      expect(() => new AxisTitles('xAxis', null)).toThrow(TypeError)
    })
    it('should throw a TypeError if xAxis is undefined', () => {
      expect(() => new AxisTitles(undefined, 'yAxis')).toThrow(TypeError)
    })
    it('should throw a TypeError if yAxis is undefined', () => {
      expect(() => new AxisTitles('xAxis', undefined)).toThrow(TypeError)
    })
    it('should set the xAxis property', () => {
      const axisTitles = new AxisTitles('xAxis', 'yAxis')
      expect(axisTitles.xAxis).toBe('xAxis')
    })
    it('should set the yAxis property', () => {
      const axisTitles = new AxisTitles('xAxis', 'yAxis')
      expect(axisTitles.yAxis).toBe('yAxis')
    })
  })
})