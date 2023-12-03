import fs from "fs";

let input = fs.readFileSync("input.txt", "utf8");

// sample
// input = `467..114..
// ...*......
// ..35..633.
// ......#...
// 617*......
// .....+.58.
// ..592.....
// ......755.
// ...$.*....
// .664.598..`

let grid: string[][] = input.split(`\n`).map(row => row.split(""));

interface Cell {
    value: string,
    x: number,
    y: number,
}

// add border of "." to grid
grid = grid.map(row => {
    row.unshift(".");
    row.push(".");
    return row;
});
grid.unshift([...new Array(grid[0].length)].map(x => "."));
grid.push([...new Array(grid[0].length)].map(x => "."));

// identify neighbors of a cell
const getNeighbors = (x: number, y: number, grid: string[][]) => {
    let neighbors: Cell[] = [
        {
            value: grid[x - 1][y - 1],
            x: x - 1,
            y: y - 1
        },
        {
            value: grid[x - 1][y],
            x: x - 1,
            y: y
        },
        {
            value: grid[x - 1][y + 1],
            x: x - 1,
            y: y + 1,
        },
        {
            value: grid[x][y - 1],
            x: x,
            y: y - 1
        },
        {
            value: grid[x][y + 1],
            x: x,
            y: y + 1
        },
        {
            value: grid[x + 1][y - 1],
            x: x + 1,
            y: y - 1
        },
        {
            value: grid[x + 1][y],
            x: x + 1,
            y: y
        },
        {
            value: grid[x + 1][y + 1],
            x: x + 1,
            y: y + 1
        },
    ];
    return neighbors;
}

// check if a cell touches a symbol
const touchesSymbol = (x: number, y: number, grid: string[][]) => {
    const neighbors = getNeighbors(x, y, grid);
    let touchesSymbol: boolean = false;
    neighbors.forEach(neighbor => {
        if (/[^0-9.]/.test(neighbor.value)) touchesSymbol = true;
    })
    return touchesSymbol;
}

const getFullNumberCells = (x: number, y: number, grid: string[][]) => {
    let cells: Cell[] = [];

    // check digits before
    let count = 1;
    let endOfNumber = false;
    while (!endOfNumber) {
        if (/\d/.test(grid[x][y - count])) {
            // add next digit to full number string
            cells.unshift({ value: grid[x][y - count], x: x, y: y - count });
        }
        else {
            endOfNumber = true;
        }
        count++;
    }

    cells.push({ value: grid[x][y], x: x, y: y })

    // check digits after
    count = 1;
    endOfNumber = false;
    while (!endOfNumber) {
        if (/\d/.test(grid[x][y + count])) {
            // add next digit to full number string
            cells.push({ value: grid[x][y + count], x: x, y: y + count });
        }
        else {
            endOfNumber = true;
        }
        count++;
    }

    return cells;
}

const getPartNumberCells = (x: number, y: number, grid: string[][]) => {
    // if the digit touches a symbol, the number is a part number
    let isPartNumber = touchesSymbol(x, y, grid);

    let fullNumber: Cell[] = getFullNumberCells(x, y, grid);

    // only add to part numbers array if full number is a part number
    if (isPartNumber) {
        return fullNumber;
    }
}

const calculateGearRatio = (x: number, y: number, grid: string[][]) => {
    // if not adjacent to two part numbers, then gear = 0
    const neighbors = getNeighbors(x, y, grid);
    let arr: Cell[][] = [];
    neighbors.forEach(neighbor => {
        if (/[0-9]/.test(neighbor.value)) {
            const validPartNumber = getPartNumberCells(neighbor.x, neighbor.y, grid);
            if (validPartNumber) {
                arr.push(validPartNumber);
            };
        }
    })

    // filter out duplicates
    arr = arr.filter((number,i,self) => {
        return self.findIndex(x => x[0].y === number[0].y && x[0].x === number[0].x) === i;
    });

    if (arr.length != 2) return 0;

    let partNumbers : number[] = arr.map(number => {
        let numberString : string = "";
        number.forEach(x => numberString+=x.value);
        return parseInt(numberString);
    })
    return partNumbers[0]*partNumbers[1];
}

const gearRatios: number[] = [];
grid.forEach((row, x) => {
    row.forEach((cell, y) => {
        if (/[*]/.test(cell)) {
            gearRatios.push(calculateGearRatio(x, y, grid));
        }
    });
})

console.log(gearRatios.reduce((s, x) => s + x));

export { }