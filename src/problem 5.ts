import fs from 'fs';

interface Range {
    start: number;
    end: number;
}

function updateRanges(rangeArr: Range[]): Range[] {

    let result: Range[] = [];

    let currentRange: Range = rangeArr[0];

    let isOverlapAtEnd: boolean = false;

    for (let i = 1; i < rangeArr.length; i++){

        if (rangeArr[i].start >= currentRange.start && rangeArr[i].start <= currentRange.end){
            
            if (currentRange.end < rangeArr[i].end){
                currentRange.end = rangeArr[i].end;

                if (i === rangeArr.length - 1){
                    isOverlapAtEnd = true;
                }
            }
        }
        else {
            result.push(currentRange);
            currentRange = rangeArr[i];
        }
    }
    result.push(isOverlapAtEnd ? currentRange : rangeArr[rangeArr.length - 1]);

    return result;
}

function processDatabaseShort(db: string[]): number {

    //scans for ranges first then, blank space, then ingredients
    let isBlankSpace: boolean = false; 

    let freshIngredients: Set<number> = new Set<number>();

    let result: number = 0;

    let ranges: Range[] = [];

    for (const line of db){

        if (line.length === 0){
            break;
        }

        const [startStr, endStr]: [string, string] = line.split("-") as [string, string];
        ranges.push({start: Number(startStr), end: Number(endStr)});
    }

    ranges.sort(
        (range1, range2) => {
            return range1.start === range2.start 
            ? range1.end - range2.end
            : range1.start - range2.start;
        }
    );

    const rangesUnique = updateRanges(ranges);

    let score: number = 0;
    
    score = rangesUnique.reduce(
        (currVal, range): number => {
            return currVal + range.end - range.start + 1;
        }, 0
    );

    return score; 

}

function processDatabase(db: string[]): number {

    //scans for ranges first then, blank space, then ingredients
    let isBlankSpace: boolean = false; 

    let freshIngredients: Set<number> = new Set<number>();

    let result: number = 0;

    let ranges: Range[] = [];

    for (const line of db){

        if (line.length === 0){
            isBlankSpace = true;
        }
        else if (!isBlankSpace){
            
            const [startStr, endStr]: [string, string] = line.split("-") as [string, string];
            ranges.push({start: Number(startStr), end: Number(endStr)});
        }
        else {
            const ingredient: number = Number(line);

            result += ranges.some( 
                (range): number => {
                    if (ingredient >= range.start && ingredient <= range.end){
                        return 1;
                    }
                    return 0;
                }
            ) ? 1 : 0;
        }
    }

    return result; 

}

function main(): void {

    try{
        let result: number = processDatabaseShort(fs.readFileSync('../data/input5.txt', 'utf8').split('\n'));
    
        console.log(result);
    }
    catch (err){
        console.log(err);
    }

}

main();