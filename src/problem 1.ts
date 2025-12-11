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

    let fakeInstructions: string[] = [
        "L68",
        "L30",
        "R48",
        "L5",
        "R60",
        "L55",
        "L1",
        "L99",
        "R14",
        "L82",
    ];

    let instructions: instruction[] = fakeInstructions.map(
        (instruction): instruction => {
            return {
                direction: instruction.charAt(0),
                steps: parseInt(instruction.slice(1))
            };
        }
    );

    console.log(crackCode(instructions));

}

main();