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

    isOutOfBounds(row: number, col: number): boolean {
        return false; // WIP
    }

    getCell(row: number, cel: number): T | undefined { 

        if (!this.isOutOfBounds(row, cel)) { 
            return this.grid[row][cel]; 
        }
        
        return undefined;
    }

    countMatchingNeighbors(row: number, cel: number, target: T): number {
        return 0; // WIP
    }

}