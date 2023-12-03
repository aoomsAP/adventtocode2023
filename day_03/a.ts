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
    let neighbors: string[] = [
        grid[x - 1][y - 1],
        grid[x - 1][y],
        grid[x - 1][y + 1],
        grid[x][y - 1],
        grid[x][y + 1],
        grid[x + 1][y - 1],
        grid[x + 1][y],
        grid[x + 1][y + 1],
    ];
    return neighbors;
}

// check if a cell touches a symbol
const touchesSymbol = (x: number, y: number, grid: string[][]) => {
    const neighbors = getNeighbors(x, y, grid);
    let isPartNumber: boolean = false;
    neighbors.forEach(neighbor => {
        if (/[^0-9.]/.test(neighbor)) isPartNumber = true;
    })
    return isPartNumber;
}

const partNumbers: number[] = [];

grid.forEach((row, x) => {
    let skipIndex: number[] = [];
    row.forEach((character, y) => {

        // only run if character is a digit & if index doesn't need to be skipped
        if (/\d/.test(character) && !skipIndex.includes(y)) {
            // clear skipIndex
            skipIndex = [];

            // if the first digit touches a symbol, the number is a part number
            let isPartNumber = touchesSymbol(x,y,grid);

            // traverse next characters in the row as long as they are digits
            let fullNumber = character;
            let count = 1;
            let endOfNumber = false;
            while (!endOfNumber) {
                if (/\d/.test(grid[x][y + count])) {
                    // add next digit to full number string
                    fullNumber += grid[x][y + count];

                    // if next digit touches a symbol, the number is a part number
                    if (touchesSymbol(x,y+count,grid)) isPartNumber = true;

                    // if it is a digit, then this character shouldn't be checked when the loop continues
                    skipIndex.push(y + count);
                }
                else {
                    endOfNumber = true;
                }
                count++;
            }

            // only add to part numbers array if full number is a part number
            if (isPartNumber) {
                partNumbers.push(parseInt(fullNumber));
            }
        }
    });
})

console.log(partNumbers.reduce((s, x) => s + x));

export { }