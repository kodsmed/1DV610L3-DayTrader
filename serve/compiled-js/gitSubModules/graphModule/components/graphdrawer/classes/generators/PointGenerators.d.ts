export class PointGenerators {
    /**
     * Important: The points are calculated on the prime adjusted length of the dataset,
     * meaning the renderArea width will be divided by the datasets length + 1 if its a prime number,
     * keeping the distance between the points equal.
     * Remember this when testing the generator.
     */
    pointGenerator(graphAndCanvasData: any): Generator<{
        xCoordinate: number;
        yCoordinate: number;
    }, void, unknown>;
    yAxisPointGenerator(graphAndCanvasData: any): Generator<{
        xCoordinate: number;
        yCoordinate: number;
    }, void, unknown>;
}
