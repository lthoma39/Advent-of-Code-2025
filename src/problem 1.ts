import fs from 'fs';

interface instruction {
    direction: string;
    steps: number;
}

function crackCode(instructions: instruction[]): number {

    let count: number = 0;
    let position: number = 50;
    
    instructions.forEach(
        (instruction) => {
            if (instruction.direction === "R") {
                position = (position + instruction.steps) % 100;
            }
            else if (instruction.direction === "L") {
                position = (position - instruction.steps + 100) % 100;
            }
            if (position === 0){
                count++;
            }
    } );

    return count;
}

function main(): void{

    try {
            const instructionOrders: string[] = fs.readFileSync('input1.txt', 'utf8').split('\n');

            let instructions: instruction[] = instructionOrders.map(
                (instruction): instruction => {
                    return {
                        direction: instruction.charAt(0),
                        steps: parseInt(instruction.slice(1))
                    };
                }
            );
            console.log(crackCode(instructions));
        }
        catch (err) {
            console.error(err);
    }
}

main();