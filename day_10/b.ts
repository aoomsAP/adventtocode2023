// inspired by https://www.reddit.com/r/adventofcode/comments/18evyu9/comment/kcqipbx/?utm_source=reddit&utm_medium=web2x&context=3

import fs from "fs";
import {cloneDeep, times} from 'lodash';

let input = fs.readFileSync("input.txt", "utf8");

// sample
// input =
// `...........
// .S-------7.
// .|F-----7|.
// .||.....||.
// .||.....||.
// .|L-7.F-J|.
// .|..|.|..|.
// .L--J.L--J.
// ...........`

// input =
// `.F----7F7F7F7F-7....
// .|F--7||||||||FJ....
// .||.FJ||||||||L7....
// FJL7L7LJLJ||LJ.L-7..
// L--J.L7...LJS7F-7L7.
// ....F-J..F7FJ|L7L7L7
// ....L7.F7||L7|.L7L7|
// .....|FJLJ|FJ|F7|.LJ
// ....FJL-7.||.||||...
// ....L---J.LJ.LJLJ...`

// input =
// `FF7FSF7F7F7F7F7F---7
// L|LJ||||||||||||F--J
// FL-7LJLJ||||||LJL-77
// F--JF--7||LJLJ7F7FJ-
// L---JF-JLJ.||-FJLJJ7
// |F|F-JF---7F7-L7L|7|
// |FFJF7L7F-JF7|JL---7
// 7-L-JL7||F7|L7F-7F7|
// L.L7LFJ|||||FJL7||LJ
// L7JLJL-JLJLJL--JLJ.L`

interface Index {
    x: number,
    y: number
}

const split: string[] = input.split("\n");

let start: Index = { x: 0, y: 0 };
split.forEach((line, index) => {
    if (line.includes("S")) {
        start = { x: index+1, y: line.indexOf("S")+1 }
    }
})

let pipes: string[][] = split.map(x => x.split(""));

// add borders
pipes = pipes.map(row => {
    row.unshift(".");
    row.push(".");
    return row;
});
pipes.unshift([...new Array(pipes[0].length)].map(x => "."));
pipes.push([...new Array(pipes[0].length)].map(x => "."));

const getStartNeighbors = (pipe: Index) => {
    let neighboringPipes = [];
    // check north: should be pipes that connect the south to something
    if (pipes[pipe.x - 1][pipe.y] === "|" ||
        pipes[pipe.x - 1][pipe.y] === "7" ||
        pipes[pipe.x - 1][pipe.y] === "F") {
        neighboringPipes.push({ x: pipe.x - 1, y: pipe.y });
    }
    // check east: should be pipes that connect the west to something
    if (pipes[pipe.x][pipe.y + 1] === "-" ||
        pipes[pipe.x][pipe.y + 1] === "J" ||
        pipes[pipe.x][pipe.y + 1] === "7") {
        neighboringPipes.push({ x: pipe.x, y: pipe.y + 1 });
    }
    // check south: should be pipes that connect the north to something
    if (pipes[pipe.x + 1][pipe.y] === "|" ||
        pipes[pipe.x + 1][pipe.y] === "L" ||
        pipes[pipe.x + 1][pipe.y] === "J") {
        neighboringPipes.push({ x: pipe.x + 1, y: pipe.y });
    }
    // check west: should be pipes that connect the east to something
    if (pipes[pipe.x][pipe.y - 1] === "-" ||
        pipes[pipe.x][pipe.y - 1] === "L" ||
        pipes[pipe.x][pipe.y - 1] === "F") {
        neighboringPipes.push({ x: pipe.x, y: pipe.y - 1 });
    }
    return neighboringPipes;
}

let farthestPoint: number = 1;
let farthestPointReached: boolean = false;
let previousPipes: Index[] = [start, start];
let currentPipes: Index[] = getStartNeighbors(start);

// identify all active pipes
const activePipes = cloneDeep(pipes);
activePipes[start.x][start.y] = "A";

while (!farthestPointReached) {
    farthestPoint++;

    let nextPipes: Index[] = [];
    currentPipes.forEach((pipe, i) => {
        let prevPipe = previousPipes[i];
        let nextPipe = previousPipes[i];
        switch (pipes[pipe.x][pipe.y]) {
            case "|":
                nextPipe = { x: pipe.x - 1, y: pipe.y };
                if (!(nextPipe.x === prevPipe.x && nextPipe.y === prevPipe.y)) nextPipes.push(nextPipe)
                else nextPipes.push({ x: pipe.x + 1, y: pipe.y });
                break;
            case "-":
                nextPipe = { x: pipe.x, y: pipe.y + 1 };
                if (!(nextPipe.x === prevPipe.x && nextPipe.y === prevPipe.y)) nextPipes.push(nextPipe)
                else nextPipes.push({ x: pipe.x, y: pipe.y - 1 });
                break;
            case "L":
                nextPipe = { x: pipe.x - 1, y: pipe.y };
                if (!(nextPipe.x === prevPipe.x && nextPipe.y === prevPipe.y)) nextPipes.push(nextPipe)
                else nextPipes.push({ x: pipe.x, y: pipe.y + 1 });
                break;
            case "J":
                nextPipe = { x: pipe.x - 1, y: pipe.y };
                if (!(nextPipe.x === prevPipe.x && nextPipe.y === prevPipe.y)) nextPipes.push(nextPipe)
                else nextPipes.push({ x: pipe.x, y: pipe.y - 1 });
                break;
            case "7":
                nextPipe = { x: pipe.x + 1, y: pipe.y };
                if (!(nextPipe.x === prevPipe.x && nextPipe.y === prevPipe.y)) nextPipes.push(nextPipe)
                else nextPipes.push({ x: pipe.x, y: pipe.y - 1 });
                break;
            case "F":
                nextPipe = { x: pipe.x + 1, y: pipe.y };
                if (!(nextPipe.x === prevPipe.x && nextPipe.y === prevPipe.y)) nextPipes.push(nextPipe)
                else nextPipes.push({ x: pipe.x, y: pipe.y + 1 });
                break;
            case ".":
                break;
        }
    });

    previousPipes = currentPipes;
    currentPipes = nextPipes;
    farthestPointReached = currentPipes[0].x === currentPipes[1].x && currentPipes[0].y === currentPipes[1].y;

    // repaint previous pipes
    activePipes[previousPipes[0].x][previousPipes[0].y] = "A";
    activePipes[previousPipes[1].x][previousPipes[1].y] = "A";
}

// repaint final pipe
activePipes[currentPipes[0].x][currentPipes[0].y] = "A";

const freeTiles = cloneDeep(pipes);
pipes.forEach((line,x) => {
    line.forEach((tile,y) => {
        if (activePipes[x][y] != "A") {
            freeTiles[x][y] = ".";
        }
    })
})

let nestedTiles = 0;
freeTiles.forEach(row => {
    row.forEach((tile,i) => {
        if (tile === ".") {
            let regexResult = row.join("").substring(0,i).match(/[\||L|J]*/g);
            if (!regexResult) throw "Regex fail";
            let timesCrossed = regexResult.join("").length;
            if (timesCrossed%2 != 0 && timesCrossed != 0) {
                nestedTiles++;
            }
        }
    })
    row.join("")
})

// freeTiles.forEach(line => {
//     console.log(line.join(""));
// })

console.log(nestedTiles);

export { }