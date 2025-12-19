import fs from 'fs';

class Point3D { 
    public x: number;
    public y: number;
    public z: number;

    constructor(x: number, y: number, z: number){
        this.x = x;
        this.y = y;
        this.z = z;
    }

    euclideanDistanceCoordinates(x: number, y: number, z: number): number {
        return (Math.sqrt((Math.pow((this.x - x), 2)) + (Math.pow((this.y - y), 2)) + (Math.pow((this.z - z), 2))));
    }

    euclideanDistancePoint(point: Point3D): number {
        return (Math.sqrt((Math.pow((this.x - point.x), 2)) + (Math.pow((this.y - point.y), 2)) + (Math.pow((this.z - point.z), 2))));
    }
}
