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

function main(): void{ 
    
    let data = fs.readFileSync('../data/input8.txt', 'utf8').split(new RegExp("\\r?\\n")).map (line => line.trim());
    let points: Point3D[] = [];


    for (const line of data){
        let coordinates: string[] = line.split(",");

        if (coordinates.length !== 3){
            console.log("File read failed");
            return;
        }
        else {
            points.push(new Point3D(Number(coordinates[0]), Number(coordinates[2]), Number(coordinates[2])));
        }
    }

    console.log(points);
}

main();