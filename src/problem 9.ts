import fs from 'fs';

type Point = [y: number, x: number];

function calculateArea(pointA: Point, pointB: Point): number{ return Math.abs(pointA[0] - pointB[0] + 1) * Math.abs(pointA[1] - pointB[1] + 1)}

function main(): void {
    let data: string[] = fs.readFileSync('../data/input9.txt', 'utf8').split(new RegExp("\\r?\\n")).map (line => line.trim())
    let points: Point[] = [];
    let result: number = 0;

    for (const line of data){
        points.push(line.split(',').map(x => Number(x)) as Point)
    }

    for (let i = 0; i < points.length - 1; i++){
        for (let j = i + 1; j < points.length; j++){
            const val: number = calculateArea(points[i], points[j]);
            if (val > result) result = val;
        }
    }

    console.log(result);

}

main();