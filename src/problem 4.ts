import { Grid } from './DataStructures'

function main(): void {

    const gridArr: string[][] = 
    [
        ['.', '.', '@', '@', '.', '@', '@', '@', '@', '.'],
        ['@', '@', '@', '.', '@', '.', '@', '.', '@', '@'],
        ['@', '@', '@', '@', '@', '.', '@', '.', '@', '@'],
        ['@', '.', '@', '@', '@', '@', '.', '.', '@', '.'],
        ['@', '@', '.', '@', '@', '@', '@', '.', '@', '@'],
        ['.', '@', '@', '@', '@', '@', '@', '@', '.', '@'],
        ['.', '@', '.', '@', '.', '@', '.', '@', '@', '@'],
        ['@', '.', '@', '@', '@', '.', '@', '@', '@', '@'],
        ['.', '@', '@', '@', '@', '@', '@', '@', '@', '.'],
        ['@', '.', '@', '.', '@', '@', '@', '.', '@', '.'],
    ];

    let grid: Grid<string> = new Grid<string>(gridArr);

    let toiletPaper: number = 0;

    for (let x = 0; x < grid.getRows(); x++){
        for (let y = 0; y < grid.getCols(); y++){

            if (grid.getCell(x, y) === '@' && grid.countMatchingNeighbors(x, y, '@') < 4){
                toiletPaper++;
            }
        }
    }

    console.log(toiletPaper);
}

main();