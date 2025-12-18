import fs from 'fs';
import { Grid, Queue } from './DataStructures';

type Point = [x: number, y: number];


class GridGraph extends Grid {

    private q: Queue<Point> = new Queue<Point>();

    constructor(filepath: string, splitter: string = '\n', isRegEx: boolean = false){

        super(filepath, splitter, isRegEx);

        for (let col = 0; col < this.grid[0].length; col++){
            if (this.grid[0][col] === 'S'){
                this.q.add([0, col]);
                break;
            }
        }
    }

    displayGrid(): void {
        console.log(this.grid);
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

    console.log(grid.countSplits());
}

main();