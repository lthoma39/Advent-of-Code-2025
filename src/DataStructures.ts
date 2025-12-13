//Creating a file for data structures not built in to JavaScript/TypeScript

interface Stack<T> {
    push(item: T): void;
    pop(): T | undefined;
    peek(): T | undefined;
    isEmpty(): boolean;
    size(): number;
}

export class ArrayStack<T> implements Stack<T> {
    private stack: T[] = [];

    constructor(){} 

    size(): number { return this.stack.length; }

    isEmpty(): boolean { return this.stack.length === 0; }

    peek(): T | undefined { return this.stack[this.stack.length - 1]; }

    pop(): T | undefined { return !this.isEmpty() ? this.stack.pop() : undefined; }

    push(val: T): void { this.stack.push(val); }
}