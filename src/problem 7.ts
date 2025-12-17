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

    countSplits(numSplits: {value: number}): number {

        return 0;
    }
}

function main(): void {

    let grid: GridGraph = new GridGraph('../data/input7.txt', "\\r?\\n", true);

    grid.displayGrid();
    
    // const result: {value: number} = {value: 0};

    // console.log(grid);
}

main();