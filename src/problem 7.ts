import fs from 'fs';
import { Grid, Queue } from './DataStructures';
import { count } from 'console';

type Point = [x: number, y: number];


class GridGraph extends Grid {

    private q: Queue<Point> = new Queue<Point>();
    private startingPoint: Point = [0, 0];
    private visited: Map<string, number> = new Map<string, number>();

    constructor(filepath: string, splitter: string = '\n', isRegEx: boolean = false){

        super(filepath, splitter, isRegEx);

        for (let col = 0; col < this.grid[0].length; col++){
            if (this.grid[0][col] === 'S'){
                const point: Point = [0, col];
                this.startingPoint = point;
                this.q.add(point);
                break;
            }
        }
    }

    convertToKey(x: number, y:number): string { 
        return `${x},${y}`;
    }

    displayGrid(): void {
        console.log(this.grid);
    }

    countTimelines(x: number = this.startingPoint[0], y: number = this.startingPoint[1]): number {

        if (this.isOutOfBounds(x, y)) return 0;

        if (x === this.getRows() - 1) return 1;
        
        const key = this.convertToKey(x, y);
        
        if (this.visited.has(key)) return this.visited.get(key)!;

        let result = 0;
        let cell: string = this.getCell(x,y)!;

        if (cell === 'S' ||cell === '.'){
            result = this.countTimelines(x + 1, y);
        }

        else if (cell === '^'){
            //we split
            result = this.countTimelines(x, y - 1) + this.countTimelines(x, y + 1); 
        }

        this.visited.set(key, result);
        return result; 
    }

    countSplits(): number {

        let numSplits: number = 0;
        let numTimelines: number = 0;
        let currPosition: Point;
        let x, y: number;

        while(!this.q.isEmpty()){
            currPosition = this.q.pop() as Point;
            x = currPosition[0];
            y = currPosition[1];

            let endSearch = false;

            while(!this.isOutOfBounds(x, y) && !endSearch){
                
                let currCell: string = this.getCell(x, y) as string; 

                if (currCell === 'S' || currCell === '.'){          
                    this.markCell(x, y, '|');
                    x++;
                }
                else if (currCell === '^'){
                    numSplits++;
                    //we split                
                    if (!this.isOutOfBounds(x, y - 1)) this.q.add([x, y - 1]);
                    if (!this.isOutOfBounds(x, y + 1)) this.q.add([x, y + 1]);
                    endSearch = true;   
                }
                else { //its been discovered already 
                    endSearch = true;
                }
            }
        }
        return numSplits;
    }
}

function main(): void {

    let grid: GridGraph = new GridGraph('../data/input7.txt', "\\r?\\n", true);

    // console.log(grid.countSplits());
    console.log(grid.countTimelines());
}

main();