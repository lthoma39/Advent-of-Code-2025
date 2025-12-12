function validateIDs(ids: string[]): number {
    
    let count: number = 0;

    ids.forEach( (id) => {
        {
            let [start, end]: number[] = id.split("-").map(Number);   

            for (let i = start; i <= end; i++){
                
                let idStr: string = i.toString();
                let idStrDouble: string = idStr + idStr;

                idStrDouble = idStrDouble.slice(1, -1);

                if (idStrDouble.includes(idStr)) {
                    console.log(`Invalid ID found: ${idStr} in range ${start}-${end}`);
                    count += Number(idStr);
                }
            }
        }
    });
    
    return count;
}

function main(): void {
    let ids: string[] = ["11-22", "95-115", "998-1012", "1188511880-1188511890",
         "222220-222224", "1698522-1698528", "446443-446449", "38593856-38593862",
        "565653-565659", "824824821-824824827", "2121212118-2121212124"];

    let validCount: number = validateIDs(ids);
    console.log(validCount);
}

main();