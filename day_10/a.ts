import fs from "fs";

let input = fs.readFileSync("input.txt", "utf8");

// sample
// input =
//     `.....
// .S-7.
// .|.|.
// .L-J.
// .....`

// input =
// `..F7.
// .FJ|.
// SJ.L7
// |F--J
// LJ...`

interface Index {
    x: number,
    y: number
}

const split: string[] = input.split("\n");

let start: Index = { x: 0, y: 0 };
split.forEach((line, index) => {
    if (line.includes("S")) {
        start = { x: index, y: line.indexOf("S") }
    }
})

const pipes: string[][] = split.map(x => x.split(""));

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
let previousPipes: Index[] = [start,start];
let currentPipes: Index[] = getStartNeighbors(start);

while (!farthestPointReached) {
    farthestPoint++;

    let nextPipes : Index[] = [];
    currentPipes.forEach((pipe,i) => {
        let prevPipe = previousPipes[i];
        let nextPipe = previousPipes[i];
        switch (pipes[pipe.x][pipe.y]) {
            case "|":
                nextPipe = {x: pipe.x-1, y: pipe.y};
                if (!(nextPipe.x === prevPipe.x && nextPipe.y === prevPipe.y)) nextPipes.push(nextPipe)
                else nextPipes.push({x: pipe.x+1, y: pipe.y});
                break;
            case "-":
                nextPipe = {x: pipe.x, y: pipe.y+1};
                if (!(nextPipe.x === prevPipe.x && nextPipe.y === prevPipe.y)) nextPipes.push(nextPipe)
                else nextPipes.push({x: pipe.x, y: pipe.y-1});
                break;
            case "L":
                nextPipe = {x: pipe.x-1, y: pipe.y};
                if (!(nextPipe.x === prevPipe.x && nextPipe.y === prevPipe.y)) nextPipes.push(nextPipe)
                else nextPipes.push({x: pipe.x, y: pipe.y+1});
                break;
            case "J":
                nextPipe = {x: pipe.x-1, y: pipe.y};
                if (!(nextPipe.x === prevPipe.x && nextPipe.y === prevPipe.y)) nextPipes.push(nextPipe)
                else nextPipes.push({x: pipe.x, y: pipe.y-1});
                break;
            case "7":
                nextPipe = {x: pipe.x+1, y: pipe.y};
                if (!(nextPipe.x === prevPipe.x && nextPipe.y === prevPipe.y)) nextPipes.push(nextPipe)
                else nextPipes.push({x: pipe.x, y: pipe.y-1});
                break;
            case "F":
                nextPipe = {x: pipe.x+1, y: pipe.y};
                if (!(nextPipe.x === prevPipe.x && nextPipe.y === prevPipe.y)) nextPipes.push(nextPipe)
                else nextPipes.push({x: pipe.x, y: pipe.y+1});
                break;
            case ".":
                break;
        }
    });

    previousPipes = currentPipes;
    currentPipes = nextPipes;
    farthestPointReached = currentPipes[0].x === currentPipes[1].x && currentPipes[0].y === currentPipes[1].y;
}

console.log(farthestPoint);

export { }