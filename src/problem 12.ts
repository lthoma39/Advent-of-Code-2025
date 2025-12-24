import * as fs from "fs";

const shapes: string[][] = [
[
    "###",
    ".##",
    "..#",
],
[
    "#..",
    "###",
    "###",
],
[
    "#.#",
    "###",
    "#.#",
],
[
    "#.#",
    "###",
    "##.",
],
[
    "###",
    "..#",
    "###",
],
[
    ".##",
    "##.",
    "#..",
],
];

function shapeParity(shape: string[]): number {
let black = 0;
let white = 0;

for (let r = 0; r < shape.length; r++) {
    for (let c = 0; c < shape[r].length; c++) {
        if (shape[r][c] === "#") {
            if ((r + c) % 2 === 0) {
                black++;
            } else {
                white++;
            }
        }
    }
}

return black - white;
}

const shapeParities: number[] = shapes.map(shapeParity);

function shapeArea(shape: string[]): number {
    let area = 0;
    for (const row of shape) {
        for (const ch of row) {
            if (ch === "#") area++;
        }
    }
    return area;
}

const shapeAreas: number[] = shapes.map(shapeArea);

function canFitRegion(width: number, height: number, counts: number[]): boolean {
    const regionArea = width * height;

    let totalArea = 0;
    for (let i = 0; i < counts.length; i++) {
      totalArea += counts[i] * shapeAreas[i];
    }

    return totalArea <= regionArea;
}

let data: string[] = fs.readFileSync("../data/input12.txt", "utf8").split(/\r?\n/)

let result: number = 0;

for (const line of data) {
if (!line.includes("x")) continue;

const [dim, rest] = line.split(":");
const [w, h] = dim.split("x").map(Number);
const counts = rest.trim().split(/\s+/).map(Number);

if (canFitRegion(w, h, counts)) {
    result++;
}
}

console.log(result);
