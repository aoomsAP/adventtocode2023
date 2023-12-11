// not a very optimal solution lol

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

// expand image

const expandAndNumber = (image: string[][]) => {
    let count = 1;
    const newImage : string[][] = [];
    image.forEach((line,x) => {
        let newLine : string[] = [];
        line.forEach((column,y) => {
            let newColumn = column;

            let noGalaxies : boolean = false; 
            let entireColumn : string = "";
            for (let i = 0; i < image.length; i++) {
                entireColumn+=image[i][y];
            }
            if (!entireColumn.includes("#")) noGalaxies = true;

            if (column === "#") {
                newColumn = count.toString();
                count++;
            }
    
            if (noGalaxies) newLine.push(newColumn);
            newLine.push(newColumn);
        })
        if (!line.includes("#")) newImage.push(newLine);
        newImage.push(newLine);
    });
    return newImage;
}

const expandedImage = expandAndNumber(image);

// identify galaxies

interface Galaxy {
    galaxy: string,
    x: number,
    y: number,
}

const galaxies : Galaxy[] = [];

expandedImage.forEach((line,x) => {
    line.forEach((column,y) => {
        if (/\d+/.test(column)) galaxies.push({galaxy: column, x: x,y:y});
    })
});

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

const galaxyPairs = getPairs(galaxies);

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

// expandedImage.forEach((line,x) => {
//     line.forEach((column,y) => {
//         let noGalaxies : boolean = false;
//         if (!line.some(e => /\d+/.test(e))) noGalaxies = true;

//         let entireColumn : string[] = [];
//         for (let i = 0; i < expandedImage.length; i++) {
//             entireColumn.push(expandedImage[i][y]);
//         }
//         if (!entireColumn.some(e => /\d+/.test(e))) noGalaxies = true;

//         if (noGalaxies) process.stdout.write(chalk.bgGray(column))
//         else process.stdout.write(column);
//     })
//     console.log();
// });

console.log(shortestPaths.reduce((sum,x) => sum+x));

export { }