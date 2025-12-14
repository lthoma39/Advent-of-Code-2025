//Creating a file for data structures not built in to JavaScript/TypeScript

interface IStack<T> {
    push(item: T): void;
    pop(): T | undefined;
    peek(): T | undefined;
    isEmpty(): boolean;
    size(): number;
}

interface IGrid<T> {
    getRows(): number;
    getCols(): number;
    isOutOfBounds(row: number, col :number): boolean;
    getCell(row: number, col: number): T | undefined;
    countMatchingNeighbors(row: number, cel: number, target: T): number;
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

export class Grid<T> implements IGrid<T> {

    constructor(private grid: T[][], private rows: number, private cols: number) {
        this.grid = grid;
    }
    getRows(): number { return this.rows;}
    
    getCols(): number {return this.cols; }

    isOutOfBounds(currentRow: number, currentCol: number): boolean {

        const ROW_MIN: number = 0;
        const COL_MIN: number = 0;
        const ROW_MAX: number = this.rows - 1;
        const COL_MAX: number = this.cols - 1;

        return currentRow >= ROW_MIN && currentRow <= ROW_MAX && currentCol >= COL_MIN && currentCol <= COL_MAX;
    }

    getCell(currentRow: number, currentCol: number): T | undefined { 

        if (!this.isOutOfBounds(currentRow, currentCol)) { 
            return this.grid[currentRow][currentCol]; 
        }
        
        return undefined;
    }

    countMatchingNeighbors(currentRow: number, currentCol: number, target: T): number {

        let count: number = 0;

        //top left
        if (!this.isOutOfBounds(currentRow - 1, currentCol - 1) && this.grid[currentRow - 1][currentCol - 1] === target) {
            count++;
        }
        //up
        else if(!this.isOutOfBounds(currentRow - 1, currentCol) && this.grid[currentRow - 1][currentCol] === target){
            count++;
        }
        //top right
        else if (!this.isOutOfBounds(currentRow - 1, currentCol + 1) && this.grid[currentRow - 1][currentCol + 1] === target) {
            count++;
        }
        //left
        else if(!this.isOutOfBounds(currentRow, currentCol - 1) && this.grid[currentRow][currentCol - 1] === target){
            count++;
        }
        //right
        if (!this.isOutOfBounds(currentRow, currentCol + 1) && this.grid[currentRow][currentCol + 1] === target) {
            count++;
        }
        //bottom left
        else if(!this.isOutOfBounds(currentRow + 1, currentCol - 1) && this.grid[currentRow + 1][currentCol - 1] === target){
            count++;
        }
        //bottom
        else if (!this.isOutOfBounds(currentRow + 1, currentCol) && this.grid[currentRow + 1][currentCol] === target) {
            count++;
        }
        //bottom right
        else if(!this.isOutOfBounds(currentRow + 1, currentCol + 1) && this.grid[currentRow + 1][currentCol + 1] === target){
            count++;
        }
        return count;
    }

}