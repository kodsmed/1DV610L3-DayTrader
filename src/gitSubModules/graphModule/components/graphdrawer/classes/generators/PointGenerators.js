export class PointGenerators {
  /**
   * Important: The points are calculated on the prime adjusted length of the dataset,
   * meaning the renderArea width will be divided by the datasets length + 1 if its a prime number,
   * keeping the distance between the points equal.
   * Remember this when testing the generator.
   */
  *pointGenerator(graphAndCanvasData) {
    const { canvasProperties, graphProperties, dataset } = graphAndCanvasData
    const graphAreaWidth = canvasProperties.renderAreaWidth
    const numberOfLabelsOnYAxis = graphAndCanvasData.numberOfLabelsOnYAxis
    const numberOfPoints = graphProperties.primeAdjustedLength
    const pointDistance = Math.floor(graphAreaWidth / numberOfPoints)

    let adjustedMin, adjustedRange

    if (graphProperties.range < 2) {
      adjustedMin = Math.floor(graphProperties.average) - 5
      adjustedRange = 10
    } else {
      adjustedMin = graphProperties.min
      adjustedRange = graphProperties.range
    }

    for (let i = 0; i < dataset.length; i++) {
      const x = canvasProperties.marginWidth + i * pointDistance

      const yOrigin = canvasProperties.marginHeight + canvasProperties.renderAreaHeight
      const yOffset = dataset[i] - adjustedMin
      const yRangeScaleFactor = Math.ceil(adjustedRange / numberOfLabelsOnYAxis)
      const yAvailableHeightScaleFactor = Math.ceil(canvasProperties.renderAreaHeight / numberOfLabelsOnYAxis)
      const y = yOrigin - (yOffset) / yRangeScaleFactor * yAvailableHeightScaleFactor
      yield { xCoordinate: Math.floor(x), yCoordinate: Math.floor(y) }
    }
  }

  *yAxisPointGenerator(graphAndCanvasData) {
    const { canvasProperties } = graphAndCanvasData
    const numberOfSegments = graphAndCanvasData.numberOfLabelsOnYAxis
    const bottomOfGraph = canvasProperties.marginHeight + canvasProperties.renderAreaHeight
    for (let labelNumber = 0; labelNumber <= numberOfSegments; labelNumber++) {
      const x = canvasProperties.marginWidth
      const y = bottomOfGraph - labelNumber / numberOfSegments * canvasProperties.renderAreaHeight
      yield { xCoordinate: Math.floor(x), yCoordinate: Math.floor(y) }
    }
  }
}