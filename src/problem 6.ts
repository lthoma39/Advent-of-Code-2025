import fs from 'fs'
import { Stack } from './DataStructures'

function doHomework(mathProblems: Stack<string>[]): number {

    let result: number = 0;;
    let tempResult: number = 0;

    for (const problem of mathProblems){

        const op: string | undefined = problem.pop();

        if (op === '*'){
            tempResult = 1;

            while(!problem.isEmpty()){
                tempResult *= Number(problem.pop());
            }
        }
        else {
            tempResult = 0;

            while(!problem.isEmpty()){
                tempResult += Number(problem.pop());
            }
        }

        result += tempResult;
    }

    return result;
}

function evaluteProblem(question: string[]): number {

    const op: string = question[0][(question[0].length - 1)];
    
    question[0] = question[0].slice(0, -1);

    let result: number;

    if (op === '*'){

        result = 1;

        for (const number of question){
            if (number !== op){
                result *= Number(number);
            }
        }
    }
    else if (op === '+') {
        result = 0;

        for (const number of question){
            if (number !== op){
                result += Number(number);
            }
        }
    }
    else {
        console.log("something went wrong here");
        result = -1;
    }
    return result;
}

function redoHomework(fileData: string[]): number {

    let fileGrid: string[][] = [];
    let result: number = 0;

   for (const [rowCount, line] of fileData.entries()){
        fileGrid[rowCount] = [];

        for (let colCount = 0; colCount < line.length; colCount++){
            fileGrid[rowCount].push(line[colCount]);
        }
    }

    //time to build each math number and also check for nothing but space col. iterate over the cols
    let problem: string[] = [];
    let isAllSpaces: boolean; ; //check if we encounter a column of spaces. that indicates we found the end

    for (let col = 0; col < fileData[0].length; col++){

        let str: string = "";
        isAllSpaces = true;

        for (let row = 0; row < fileData.length; row++){
            const char: string = fileGrid[row][col];

            if (col >= fileGrid[row].length) { continue; }

            if (char !== ' ' && char !== '\r'){
                isAllSpaces = false;
                str += char;
            }
        }

        if (isAllSpaces){
            //evaluate
            isAllSpaces = true;
            result += evaluteProblem(problem);
            problem = [];
        }
        else{
            problem.push(str);
        }
        str = "";   
    }

    return result;
}

function main(): void {
    console.log(redoHomework(fs.readFileSync('../data/input6.txt', 'utf8').split('\n')));
}

main();