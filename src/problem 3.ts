//https://adventofcode.com/2025/day/3
//Solution for Day 3 Part 1
import fs from 'fs';
import { Stack } from './DataStructures';

//This only handles one string at a time and is checking adjacent i and j pairs leading to O(n^2). Could be optimized to O(n) by tracking the two largest digits while iterating through the string once.
function enableBatteriesSlow(bank: string): number{

    let result: number = 0;

    let maxI: number = - 1;
    let maxJ: number = - 1;

    for (let i = 0; i < bank.length - 1; i++){

        if (Number(bank[i]) > maxI){
            maxI = Number(bank[i]);
        }

        for (let j = i + 1; j < bank.length; j++){
            maxJ = Number(bank[j]);

            if ((maxI * 10) + maxJ > result){
                result = (maxI * 10) + maxJ;
            }
        }
    }

    return result;
}
// Optimized version with O(n) complexity but only handles two batteries
function enableBatteriesFast(bank: string): number {

    let firstBulb: number = 0;
    let secondBulb: number = 0;

    for (let i = 0; i < bank.length - 1; i++){
        let bulbValue: number = Number(bank[i]);

        if (bulbValue > firstBulb){
            firstBulb = bulbValue;
            secondBulb = -1;
        }
        else if (bulbValue > secondBulb){
            secondBulb = bulbValue;
        }
    }

    if (Number(bank[bank.length - 1]) > secondBulb){
        secondBulb = Number(bank[bank.length - 1]);
    }

    return firstBulb*10 + secondBulb;
}

//new battery method but we ask for number of batteries to enable  and create a stack and start calculating from there
function enableBatteries(bank: string, batteriesToEnable: number = 2): number {

    let bulbs: Stack<number> = new Stack<number>();

    for (let i = 0; i < bank.length; i++) {

        let currentBulb: number = Number(bank[i]);
        let spaceLeft: number = bank.length - i - 1;

        //effectively checks if we can still fill the stack to the required size
        while (!bulbs.isEmpty() && (bulbs.peek() ?? -1) < currentBulb && (spaceLeft + bulbs.size() >= batteriesToEnable)) {
            bulbs.pop();
        }
    
        if (bulbs.size() < batteriesToEnable) {
            bulbs.push(currentBulb);
        }
    }

    return (() => {
        
        let multiplier: number = 0;
        let bulbResult:number = 0;

        while(!bulbs.isEmpty()){
            bulbResult += (bulbs.pop() ?? 0) * Math.pow(10, multiplier);
            multiplier++;
        }

        return bulbResult;

    })(); 
}


function calculateJoltage(){
    try {
        const data : string = fs.readFileSync('input3.txt', 'utf8');
        const lines: string[] = data.split('\n');
        let voltage: number = 0;
    
        for (const line of lines){
            voltage += enableBatteries(line.trim(), 12);
        }

        console.log(voltage);
    }
    catch (err) {
        console.error(err);
    }
}

calculateJoltage();
