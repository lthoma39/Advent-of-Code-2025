import fs from 'fs';
import { Queue } from './DataStructures';

function countPathsVisitingBoth(
    adj: Map<string, string[]>,
    start = "svr",
    end = "out",
    mustA = "dac",
    mustB = "fft"): number {
    const state = new Map<string, number>();

    function countPathsVisitingBothR(node: string, seenA: boolean, seenB: boolean): number {
        if (node === mustA) seenA = true;
        if (node === mustB) seenB = true;

        if (node === end) {
            return (seenA && seenB) ? 1 : 0;
        }

        const key = `${node}|${seenA ? 1 : 0}|${seenB ? 1 : 0}`;
        const cached = state.get(key);
        if (cached !== undefined) return cached;

        let total = 0;
        for (const nxt of adj.get(node) ?? []) {
        total += countPathsVisitingBothR(nxt, seenA, seenB);
        }

        state.set(key, total);
        return total;
    };

    return countPathsVisitingBothR(start, false, false);
}

function numPathsR(adjList: Map<string, string[]>, state: Map<string, number>, current: string = "you",
    destination: string = "out"): number {

        if (current === destination) return 1;

        if (state.has(current)) return state.get(current)!;

        let total = 0;

        for (const node of adjList.get(current) ?? []){
            total += numPathsR(adjList, state, node);
        }

        state.set(current, total);

        return total;
    }

function numPaths(adjList: Map<string, string[]>, current: string = "you", destination: string = "out"): number {
    const state: Map<string, number> = new Map<string, number>();
    return numPathsR(adjList, state);
}

function main(): void { 
    let data: string[] = fs.readFileSync("../data/input11.txt", "utf8").split(/\r?\n/);
    let adjList: Map<string, string[]> = new Map<string, string[]>();

    for (const lines of data){
        const [key, destinations]: string[] = lines.split(':');
        const values = destinations === undefined ? [] : destinations.trim().split(/\s+/);

        adjList.set(key, values);
    }

    console.log(countPathsVisitingBoth(adjList));
}

main();