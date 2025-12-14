import fs from 'fs';

interface Instruction {
    direction: string;
    steps: number;
}

function crackSecondaryCode(instructions: Instruction[]): number {
    let count = 0;
    let position = 50;

    for (const inst of instructions) {
        const steps = inst.steps;

        if (inst.direction === "R") {
        
            count += Math.floor((position + steps) / 100);

            position = (position + steps) % 100;
        } 
        else { 

            count += Math.floor((steps - 1 - position) / 100) + 1;

            position = (position - steps);

            while (position < 0 && (position * -1) > 100) {
                position +=  100;
            }

            position = (position + 100) % 100;
        }
    }

    return count;
}

function crackCode(instructions: Instruction[]): number {

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
    });

    return count;
}

function main(): void{

    try {
            const instructionOrders: string[] = fs.readFileSync('../data/input1.txt', 'utf8').split('\n');
            const instructionOrders2: string[] = ["L68", "L30", "R48", "L5", "R60", "L55", "L1", "L99", "R14", "L82"];
            
            let instructions: Instruction[] = instructionOrders.map(
                (instruction): Instruction => {
                    return {
                        direction: instruction.charAt(0),
                        steps: parseInt(instruction.slice(1))
                    };
                }
            );

            let instructions2: Instruction[] = instructionOrders2.map(
                (instruction): Instruction => {
                    return {
                        direction: instruction.charAt(0),
                        steps: parseInt(instruction.slice(1))
                    };
                }
            );

            console.log(crackCode(instructions));
            console.log(crackSecondaryCode(instructions));
        }
        catch (err) {
            console.error(err);
    }
}

main();