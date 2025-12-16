import fs from 'fs';

function isOutOfBounds(): boolean {

    return false;
}

function countSplits(row: number, col: number, numSplits: {value: number}): number {

    return 0;
}

function  buildGrid(file: string[]): string[][] {

    let grid: string[][] = [];

    for (const line of file){
        grid.push([]);
        for (const char of line){
            grid[grid.length - 1].push(char);
        }
    }

    return grid;
}

function main(): void {

    const data: string[] = fs.readFileSync('../data/input7.txt', 'utf8').split(/\r?\n/);
    let grid: string[][] = buildGrid(data);

    const result: {value: number} = {value: 0};

    console.log(grid);
}

main();