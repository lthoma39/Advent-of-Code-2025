import fs from 'fs';
import { Queue } from './DataStructures';

function stringToArray(str: string): string[] {
    
    const result: string[] = [];
    
    for (const char of str){
        result.push(char);
    }

    return result;
}

function arrayToString(strArr: string[]): string {
    let result: string = "";

    strArr.forEach(char => result += char);

    return result;
}

function numPresses(diagram: string, buttons: number[][]): number {

    const visited: Set<string> = new Set<string>();
    const q: Queue<[pattern: string, presses: number]> = new Queue();

    let state: string = "";
    
    while(state.length < diagram.length) state += '.';

    q.add([state, 0]);
    visited.add(state);

    while (!q.isEmpty()){
        let [pattern, presses] = q.pop()!;
        
        if (pattern === diagram){
            return presses;
        }

        for (const button of buttons){
            let newPattern: string[] = stringToArray(pattern);
            for (const btn of button){
                if (newPattern[btn] !== undefined){
                    newPattern[btn] = newPattern[btn] === '.' ? '#' : '.';
                }
            }
            let newPatternStr: string = arrayToString(newPattern);

            if (!visited.has(newPatternStr)){
                visited.add(newPatternStr);
                q.add([newPatternStr, presses + 1]);
            }
        }
    }
    return 0;
}

function main (): void {

    const data: string[] = fs.readFileSync('../data/input10.txt', 'utf8').split(new RegExp("\\r?\\n"));
    const resultArr: number[] = [];

    for (const machine of data){

        let lightDiagram: string;
        let buttons: number[][] = [];   

        lightDiagram = machine.match(/\[(.*?)\]/)![1];
        buttons = [...machine.matchAll(/\((.*?)\)/g).map(bttn => bttn[1].split(',').map(Number))];

        resultArr.push(numPresses(lightDiagram, buttons));
    }

    let result: number = 0;
    resultArr.forEach(x => result += x);

    console.log(result);
}


main();