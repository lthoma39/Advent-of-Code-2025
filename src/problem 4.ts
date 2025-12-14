import { Grid } from './DataStructures';

function checkAislesForTP(grid: Grid): [number, number][] {

    let coordinates: [number, number][] = [];

    for (let x = 0; x < grid.getRows(); x++){
        for (let y = 0; y < grid.getCols(); y++){
            if (grid.getCell(x, y) === '@' && grid.countMatchingNeighbors(x, y, '@') < 4){
                coordinates.push([x, y]);
            }
        }
    }

    return coordinates;
}

function main(): void {

    let grid: Grid = new Grid('../data/input4.txt');

    let availableTP: [number, number][] = checkAislesForTP(grid);
    let toiletPaper: number = 0;

    while (availableTP.length !== 0){
        for (const [x, y] of availableTP){
            toiletPaper += 1;
            grid.markCell(x, y);
        }
        availableTP = checkAislesForTP(grid);
    }

    console.log(toiletPaper);
}

main();