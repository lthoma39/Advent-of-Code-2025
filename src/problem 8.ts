import fs from 'fs';
import { Queue } from './DataStructures';

type PointPairs = {
    pointA: Node;
    pointB: Node;
    distance: number;
}

class Node { 
    public x: number;
    public y: number;
    public z: number;
    public neighbors: Node[];

    constructor(x: number, y: number, z: number){
        this.x = x;
        this.y = y;
        this.z = z;
        this.neighbors = [];
    }
}

class Graph {
    private junctionBoxes: Node[];
    private groups: number;
    private visited: Set<string>;

    constructor(filepath: string[]){
        this.junctionBoxes = [];
        this.groups = 0;
        this.visited = new Set<string>();

        this.buildJunctionBox(filepath);
    }

    private convertToKey(n: Node): string {
        return `${n.x},${n.y},${n.z}`;
    }

    private euclideanDistance(nodeA: Node, nodeB: Node): number {
        return (Math.sqrt((Math.pow((nodeA.x - nodeB.x), 2)) + (Math.pow((nodeA.y - nodeB.y), 2)) + (Math.pow((nodeA.z - nodeB.z), 2))));
    }

    private buildJunctionBox (lines: String[]): void { 
        for (const line of lines){
            let coordinates: string[] = line.split(",");
    
            if (coordinates.length !== 3){
                console.log("File read failed");
                return;
            }
            else {
                this.junctionBoxes.push(new Node(Number(coordinates[0]), Number(coordinates[1]), Number(coordinates[2])));
            }
        }
    }

    private sortJunctionBoxes(): PointPairs[] {
        let junctionDistance: PointPairs[] = [];

        for (let i = 0; i < this.junctionBoxes.length - 1; i++){
            const pointA: Node = this.junctionBoxes[i];
            for (let j = i + 1; j < this.junctionBoxes.length; j++){
                const pointB: Node = this.junctionBoxes[j];

                junctionDistance.push(
                    { 
                        pointA: pointA,
                        pointB: pointB,
                        distance: this.euclideanDistance(pointA, pointB) 
                    }
                );
            }
        }

        junctionDistance.sort(
            (pairA: PointPairs, pairB: PointPairs) => {
                return pairA.distance - pairB.distance;
            }
        );

        return junctionDistance;
    }

    private buildGraph(){

        let weightedNodes: PointPairs[] = this.sortJunctionBoxes();

    }

    public countPathLengths(): number[] {
        return [];
    }
}

function main(): void{ 
    let graph: Graph = new Graph(fs.readFileSync('../data/input8.txt', 'utf8').split(new RegExp("\\r?\\n")).map (line => line.trim()));

    let results = graph.countPathLengths();

    console.log(results);
}

main();