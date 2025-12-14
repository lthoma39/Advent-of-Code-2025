import { Grid } from './DataStructures';

function main(): void {

    let grid: Grid = new Grid('../data/input4.txt');

    let toiletPaper: number = 0;

    for (let x = 0; x < grid.getRows(); x++){
        for (let y = 0; y < grid.getCols(); y++){

            if (grid.getCell(x, y) === '@' && grid.countMatchingNeighbors(x, y, '@') < 4){
                toiletPaper++;
                //grid.markCell(x, y); //check neighbors for updates...
            }
        }
    }

    console.log(toiletPaper);
}

main();