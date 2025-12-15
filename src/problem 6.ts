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

function redoHomework(mathProblems: Stack<string>[]): number {

    for (const problem of mathProblems){

        const op: string | undefined = problem.pop();

        let questions: string[] = [];
        let maxLenStr: number = 0;
        let revisedMathProblems: Stack<string>[] = [];

        while(!problem.isEmpty()){
            let question: string = problem.pop() as string;
            maxLenStr = question.length > maxLenStr ? question.length : maxLenStr;
            questions.push(question);
        }

        for (let i = 0; i < maxLenStr; i++){
            revisedMathProblems.push(new Stack<string>());
        }

        for (const question of questions){
            for (let i = 0; i < question.length; i++){
                revisedMathProblems[i].push(question[i]);
            }
        }
        console.log(revisedMathProblems);
    }

    return 0;
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

    console.log(redoHomework(homework));
}

main();