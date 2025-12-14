import { Grid } from './DataStructures';

function main(): void {

    let grid: Grid = new Grid('../data/input4.txt');

    let availableTP: boolean = true;
    let toiletPaper: number = 0;
    
    while (availableTP){

        availableTP = false;

        for (let x = 0; x < grid.getRows(); x++){
            for (let y = 0; y < grid.getCols(); y++){
                if (grid.getCell(x, y) === '@' && grid.countMatchingNeighbors(x, y, '@') < 4){
                    toiletPaper += 1;
                    grid.markCell(x, y);
                    availableTP = true;
                }
            }
        }
    }

    console.log(toiletPaper);
}

main();