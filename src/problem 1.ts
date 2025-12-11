import fs from 'fs';

interface instruction {
    direction: string;
    steps: number;
}

function crackSecondaryCode(instructions: instruction[]): number {
    let count = 0;
    let position = 50;

    for (const inst of instructions) {
        const steps = inst.steps;

        if (inst.direction === "R") {
            // How many times zero is passed
            count += Math.floor((position + steps) / 100);
          
            position = (position + steps) % 100;
        } 
        else { // "L"
            // Convert left move to negative steps modulo 100
            let newPos = (position - steps + 1000) % 100; 
           
            count += Math.floor((steps - 1 - position) / 100) + 1;
           
            position = newPos;
        }
    }

    return count;
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
    });

    return count;
}

function main(): void{

    try {
            const instructionOrders: string[] = fs.readFileSync('input1.txt', 'utf8').split('\n');
            const instructionOrders2: string[] = ["L68", "L30", "R48", "L5", "R60", "L55", "L1", "L99", "R14", "L82"];
            
            let instructions: instruction[] = instructionOrders.map(
                (instruction): instruction => {
                    return {
                        direction: instruction.charAt(0),
                        steps: parseInt(instruction.slice(1))
                    };
                }
            );

            let instructions2: instruction[] = instructionOrders2.map(
                (instruction): instruction => {
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