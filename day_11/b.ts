// not a very optimal solution, took like 30 seconds

import fs from "fs";
import chalk from 'chalk';

let input = fs.readFileSync("input.txt", "utf8");

// sample
// input =
// `...#......
// .......#..
// #.........
// ..........
// ......#...
// .#........
// .........#
// ..........
// .......#..
// #...#.....`

const image = input.split("\n").map(x => x.split(""));

// identify galaxies

interface Galaxy {
    galaxy: string,
    x: number,
    y: number,
}

let galaxies : Galaxy[] = [];

let count = 1;
image.forEach((line,x) => {
    line.forEach((column,y) => {
        if (column === "#") {
            galaxies.push({galaxy: count.toString(), x: x, y: y})
            count++;
        }
    })
});

// update galaxy positions post-expansion

const isEmptyRow = (image: string[][], row: number) => {
    return !image[row].some(e => e === "#");
}

const isEmptyColumn = (image: string[][], column: number) => {
    let noGalaxies : boolean = true; 
    let entireColumn : string[] = [];
    for (let i = 0; i < image.length; i++) {
        entireColumn.push(image[i][column]);
    }
    if (entireColumn.some(e => e === "#")) noGalaxies = false;
    return noGalaxies;
}

let expansionRate = 999999;
// expansionRate = 99;
// expansionRate = 9;

const expandedGalaxies = galaxies.map((galaxy) => {
    let newGalaxy = galaxy;

    let addedVerticalDistance = 0;
    for (let row = 0; row < galaxy.x; row++) {
        if (isEmptyRow(image,row)) {
            addedVerticalDistance+=expansionRate;
        } 
    }
    newGalaxy.x+=addedVerticalDistance;
    
    let addedHorizontalDistance = 0;
    for (let column = 0; column < galaxy.y; column++) {
        if (isEmptyColumn(image,column)) {
            addedHorizontalDistance+=expansionRate;
        } 
    }
    newGalaxy.y+=addedHorizontalDistance;

    return newGalaxy;
})

// get galaxy pairs

const getPairs = (galaxies: Galaxy[]) => {
    let galaxyPairs : Galaxy[][] = [];
    galaxies.forEach((galaxy,i) => {
        galaxies.forEach(differentGalaxy => {
            let pairingAlreadyInGalaxy = galaxyPairs.find(x => {
                return (x[0] == galaxy && x[1] == differentGalaxy) || (x[1] == galaxy && x[0] == differentGalaxy);
            })
            if (differentGalaxy != galaxy && typeof pairingAlreadyInGalaxy === "undefined") {
                galaxyPairs.push([galaxy,differentGalaxy]);
            }
        })
    })
    return galaxyPairs;
}

const galaxyPairs = getPairs(expandedGalaxies);

// get shortest paths

const shortestPaths : number[] = [];

const shortestPath = (a: Galaxy, b: Galaxy) => {
    let pathLength = 0;
    (a.x >= b.x) ? pathLength+=(a.x-b.x) : pathLength+=(b.x-a.x);
    (a.y >= b.y) ? pathLength+=(a.y-b.y) : pathLength+=(b.y-a.y);
    return pathLength;
}

galaxyPairs.forEach(pair => {
    shortestPaths.push(shortestPath(pair[0],pair[1]));
});

// print

console.log(shortestPaths.reduce((sum,x) => sum+x));

export { }