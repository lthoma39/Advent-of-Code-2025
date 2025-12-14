import { Grid } from './DataStructures'
import  fs  from 'fs'

function buildGrid(filepath: string): string[][]{

    let gridResult: string[][] = [];

    try{
        let gridFile: string[] = fs.readFileSync(filepath, 'utf8').split('\n');

        if (gridFile.length === 0) { return []; }

        for (const gridLine of gridFile){

            let tempRow: string[] = gridLine.split(''); 

            gridResult.push(tempRow);
        }
    }
    catch (err){
        console.log(err)
    }

    return gridResult; 
}

function main(): void {

    let grid: Grid<string> = new Grid<string>(buildGrid('../data/input4.txt'));

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