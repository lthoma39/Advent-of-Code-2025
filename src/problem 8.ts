import fs from 'fs';
import { Queue, Node } from './DataStructures';

type PointPairs = {
    pointA: Node<string>;
    pointB: Node<string>;
    distance: number;
}

class Graph {
    private junctionBoxes: Node<string>[];
    private groups: number;
    private visited: Set<string>;

    constructor(filepath: string[]){
        this.junctionBoxes = [];
        this.groups = 0;
        this.visited = new Set<string>();

        this.buildJunctionBox(filepath);
        this.buildGraph();
    }

    private coordinatesToString(x: number, y: number, z: number): string {
        return `${x},${y},${z}`;
    }

    private keyToCoordinates(key: string): {x: number, y: number, z: number} {
        const [x, y, z] = key.split(',').map(Number);
        return {
            x: x,
            y: y,
            z: z,
        };
    }

    private euclideanDistance(nodeA: Node<string>, nodeB: Node<string>): number {
        const nodeAVal = this.keyToCoordinates(nodeA.val);
        const nodeBVal = this.keyToCoordinates(nodeB.val);

        return (Math.sqrt((Math.pow((nodeAVal.x - nodeBVal.x), 2)) + (Math.pow((nodeAVal.y - nodeBVal.y), 2)) + (Math.pow((nodeAVal.z - nodeBVal.z), 2))));
    }

    private buildJunctionBox (lines: String[]): void { 
        for (const line of lines){
            let coordinates: string[] = line.split(",");
    
            if (coordinates.length !== 3){
                console.log("File read failed");
                return;
            }
            else {
                this.junctionBoxes.push(
                    {                       
                        val: this.coordinatesToString(Number(coordinates[0]), Number(coordinates[1]), Number(coordinates[2])),
                        neighbors: []
                    }
                );
            }
        }
    }

    private sortJunctionBoxes(): PointPairs[] {
        let junctionDistance: PointPairs[] = [];

        for (let i = 0; i < this.junctionBoxes.length - 1; i++){
            const pointA: Node<string> = this.junctionBoxes[i];
            for (let j = i + 1; j < this.junctionBoxes.length; j++){
                const pointB: Node<string> = this.junctionBoxes[j];

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

    private buildGraph(): void{

        let weightedNodes: PointPairs[] = this.sortJunctionBoxes();
        let totalCircuits: number = this.junctionBoxes.length;

        for (const nodePair of weightedNodes){
                let nodeA: Node<string> = nodePair.pointA;
                let nodeB: Node<string> = nodePair.pointB;

                if (!this.contains(nodeA, nodeB)){
                    totalCircuits--;
                    nodeA.neighbors.push(nodeB);
                    nodeB.neighbors.push(nodeA);

                    if (totalCircuits === 1){
                        console.log(this.keyToCoordinates(nodeA.val).x * this.keyToCoordinates(nodeB.val).x);
                        break;
                    }
                }
        }
    }

    private contains(nodeA: Node<string>, targetNode: Node<string>): boolean {

        let neighbors: Queue<Node<string>> = new Queue(nodeA.neighbors);
        let hasVisited: Set<string> = new Set<string>();

        hasVisited.add(nodeA.val);

        while (!neighbors.isEmpty()){

            let neighbor: Node<string> = neighbors.pop()!;

            hasVisited.add(neighbor.val);

            if (neighbor.val === targetNode.val) return true;

            neighbor.neighbors.forEach(
                (person) => {
                    if (!hasVisited.has(person.val)){
                        neighbors.add(person);
                    }
                }
            );
        }
        return false;
    }

    public countPathLengths(): number[] {

        let results: number[] = [];

        for (const node of this.junctionBoxes){

            if (!this.visited.has(node.val)){
                let result: number = 1;
                this.visited.add(node.val);
                let neighbors: Queue<Node<string>> = new Queue(node.neighbors);

                while (!neighbors.isEmpty()){
                    let newNeighbor: Node<string> = neighbors.pop()!;

                    if (this.visited.has(newNeighbor.val)) continue;

                    this.visited.add(newNeighbor.val);
                    neighbors.addAll(newNeighbor.neighbors.filter(node => !this.visited.has(node.val)));
                    result++;
                }

                results.push(result);
            }
        }
        return results.sort(
            (x: number, y: number) =>
            {
                return y - x;
            }
        );
    }
}

function main(): void{ 
    
    let graph: Graph = new Graph(fs.readFileSync('../data/input8.txt', 'utf8').split(new RegExp("\\r?\\n")).map (line => line.trim()));
}

main();