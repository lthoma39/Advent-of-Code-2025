import fs from 'fs';

function validateIDs(ids: string[]): number {
    
    let count: number = 0;

    ids.forEach( (id) => {
        
            let [start, end]: number[] = id.split("-").map(x => Number(x));   

            for (let i = start; i <= end; i++){
                
                let idStr: string = i.toString();

                let strDouble = idStr + idStr;
                strDouble = strDouble.slice(1, -1);

                if (strDouble.includes(idStr)) {
                    count += Number(idStr);
                    console.log(`Invalid ID found: ${idStr}`);
                }
            }
    });
    
    return count;
}

function main(): void {
    let testIds: string[] = 
    [
        "11-22", "95-115", "998-1012", "1188511880-1188511890",
        "222220-222224", "1698522-1698528", "446443-446449", "38593856-38593862",
        "565653-565659", "824824821-824824827", "2121212118-2121212124"
    ];

    try {
        const ids: string[] = fs.readFileSync('../data/input2.txt', 'utf8').split(',');

        let validCount: number = validateIDs(ids);
        console.log(validCount);

    } catch (error) {
        console.error(error);
    }
}

main();