//Creating a file for data structures not built in to JavaScript/TypeScript
import  fs  from 'fs';

export interface IStack<T> {
    push(item: T): void;
    pop(): T | undefined;
    peek(): T | undefined;
    isEmpty(): boolean;
    size(): number;
}

export interface IGrid{
    buildGrid(filepath: string): string[][];
    getRows(): number;
    getCols(): number;
    isOutOfBounds(row: number, col :number): boolean;
}

export class Stack<T> implements IStack<T> {
    
    private stack: T[] = [];

    constructor(){} 

    size(): number { return this.stack.length; }

    isEmpty(): boolean { return this.stack.length === 0; }

    peek(): T | undefined { return this.stack[this.stack.length - 1]; }

    pop(): T | undefined { return !this.isEmpty() ? this.stack.pop() : undefined; }

    push(val: T): void { this.stack.push(val); }
}

export class Grid implements IGrid{

    private grid: string[][];
    private rows: number;
    private cols: number;


    constructor(filepath: string) {
        this.grid = this.buildGrid(filepath);
        this.rows = this.grid.length;
        this.cols = this.grid[0].length;
    }

    buildGrid(filepath: string): string[][]{
    
        let gridResult: string[][] = [];
    
        try{
            let gridFile: string[] = fs.readFileSync(filepath, 'utf8').split('\n');
    
            if (gridFile.length === 0) { return []; }
    
            for (const gridLine of gridFile){
    
                let tempRow: string[] = gridLine.split(''); 
    
                gridResult.push(tempRow);
            }
        }
        catch (err){
            console.log(err)
        }
    
        return gridResult; 
    }

    getRows(): number { return this.rows; }
    
    getCols(): number { return this.cols; }

    isOutOfBounds(currentRow: number, currentCol: number): boolean {

        const ROW_MIN: number = 0;
        const COL_MIN: number = 0;
        const ROW_MAX: number = this.rows - 1;
        const COL_MAX: number = this.cols - 1;

        //negation since im checking the ranges within and function is called "is out of bounds"
        return !(currentRow >= ROW_MIN && currentRow <= ROW_MAX && currentCol >= COL_MIN && currentCol <= COL_MAX);
    }

    getCell(currentRow: number, currentCol: number): string | undefined { 

        if (!this.isOutOfBounds(currentRow, currentCol)) { 
            return this.grid[currentRow][currentCol]; 
        }
        
        return undefined;
    }

    markCell(currentRow: number, currentCol: number, marker: string = 'x'): void {
        if (!this.isOutOfBounds(currentRow, currentCol)) {
            this.grid[currentRow][currentCol] = marker;
        }
    }

    countMatchingNeighbors(currentRow: number, currentCol: number, target: string): number {

        let count: number = 0;

        //top left
        if (!this.isOutOfBounds(currentRow - 1, currentCol - 1) && this.grid[currentRow - 1][currentCol - 1] === target) {
            count++;
        }
        //up
        if(!this.isOutOfBounds(currentRow - 1, currentCol) && this.grid[currentRow - 1][currentCol] === target){
            count++;
        }
        //top right
        if (!this.isOutOfBounds(currentRow - 1, currentCol + 1) && this.grid[currentRow - 1][currentCol + 1] === target) {
            count++;
        }
        //left
        if (!this.isOutOfBounds(currentRow, currentCol - 1) && this.grid[currentRow][currentCol - 1] === target){
            count++;
        }
        //right
        if (!this.isOutOfBounds(currentRow, currentCol + 1) && this.grid[currentRow][currentCol + 1] === target) {
            count++;
        }
        //bottom left
        if (!this.isOutOfBounds(currentRow + 1, currentCol - 1) && this.grid[currentRow + 1][currentCol - 1] === target){
            count++;
        }
        //bottom
        if (!this.isOutOfBounds(currentRow + 1, currentCol) && this.grid[currentRow + 1][currentCol] === target) {
            count++;
        }
        //bottom right
        if(!this.isOutOfBounds(currentRow + 1, currentCol + 1) && this.grid[currentRow + 1][currentCol + 1] === target){
            count++;
        }
        return count;
    }
}