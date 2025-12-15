import fs from 'fs'
import { Stack } from './DataStructures'

function doHomework(mathProblems: Stack<string>[]): number {

    let result: number = 0;;
    let tempResult: number = 0;

    for (const problem of mathProblems){

        const op = problem.pop();

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

function main(): void {

    let data: string[] = fs.readFileSync('../data/input6.txt', 'utf8').split('\n');
    data = data.map(fileLine => fileLine.trim());

    let homework: Stack<string>[] = [];

    for (const line of data){

        let homeworkLine: string[] = line.split(" ")
            .map(str => str.trim())
            .filter(str => str.length > 0);

        for (let i = 0; i < homeworkLine.length; i++){

            if (homework.length <= i){
                homework.push(new Stack<string>());
            }

            homework[i].push(homeworkLine[i]);
        }
    }

    console.log(doHomework(homework));
}

main();