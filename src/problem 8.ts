import fs from 'fs';
import { Queue } from './DataStructures';

type PointPairs = {
    pointA: Point3D;
    pointB: Point3D;
    distance: number;
}

class Point3D { 
    public x: number;
    public y: number;
    public z: number;
    public neighbors: Queue<Point3D>;

    constructor(x: number, y: number, z: number){
        this.x = x;
        this.y = y;
        this.z = z;
        this.neighbors = new Queue<Point3D>();
    }

    convertToKey(): string {
        return `${this.x},${this.y},${this.z}`;
    }

    euclideanDistance(point: Point3D): number {
        return (Math.sqrt((Math.pow((this.x - point.x), 2)) + (Math.pow((this.y - point.y), 2)) + (Math.pow((this.z - point.z), 2))));
    }

    countPathLength(): number {
        return 0;
    }
}

function main(): void{ 
    
    let data = fs.readFileSync('../data/input8.txt', 'utf8').split(new RegExp("\\r?\\n")).map (line => line.trim());
    let junctionBoxes: Point3D[] = [];
    let junctionDistance: PointPairs[] = [];
    let visitedNodes: Set<Point3D> = new Set<Point3D>();

    for (const line of data){
        let coordinates: string[] = line.split(",");

        if (coordinates.length !== 3){
            console.log("File read failed");
            return;
        }
        else {
            junctionBoxes.push(new Point3D(Number(coordinates[0]), Number(coordinates[1]), Number(coordinates[2])));
        }
    }

    for (let i = 0; i < junctionBoxes.length - 1; i++){
        const pointA: Point3D = junctionBoxes[i];
        for (let j = i + 1; j < junctionBoxes.length; j++){
            const pointB: Point3D = junctionBoxes[j];
            let distance: number = pointA.euclideanDistance(pointB);

            junctionDistance.push(
                { 
                    pointA: pointA,
                    pointB: pointB,
                    distance: pointA.euclideanDistance(pointB) 
                }
            );
        }
    }

    junctionDistance.sort(
        (pairA: PointPairs, pairB: PointPairs) => {
            return pairA.distance - pairB.distance;
        }
    );

    for (let i = 0; i < junctionDistance.length; i++){
        let pairs: PointPairs = junctionDistance[i];
        const pairA: Point3D = pairs.pointA;
        const pairB: Point3D = pairs.pointB;

        pairA.neighbors.add(pairB);
        pairB.neighbors.add(pairA);
    }
}

main();