import fs from 'fs';
import { IGrid } from './DataStructures';

class grid implements IGrid {
    buildGrid(filepath: string): string[][] {
        throw new Error('Method not implemented.');
    }
    getRows(): number {
        throw new Error('Method not implemented.');
    }
    getCols(): number {
        throw new Error('Method not implemented.');
    }
    isOutOfBounds(row: number, col: number): boolean {
        throw new Error('Method not implemented.');
    }
    getCell(row: number, col: number): string | undefined {
        throw new Error('Method not implemented.');
    }
    markCell(row: number, col: number, marker: string): void {
        throw new Error('Method not implemented.');
    }
    countMatchingNeighbors(row: number, cel: number, target: string): number {
        throw new Error('Method not implemented.');
    }
}

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