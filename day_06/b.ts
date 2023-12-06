import fs from "fs";

let input = fs.readFileSync("input.txt", "utf8");

// sample
// input = `Time:      7  15   30
// Distance:  9  40  200`

const data: string[] = input.split(`\n`)
    .map(line => line.substring(line.indexOf(":") + 1).trimStart());

const time = parseInt(data[0].replaceAll(/\s+/gi, ""));
const distance = parseInt(data[1].replaceAll(/\s+/gi, ""));

const winPossible = (speed: number, time: number, distance: number) => {
    let distanceResult = (time - speed) * speed;
    return (distanceResult > distance) ? true : false;
}

// find bottom range
const min = (time: number, distance: number) => {
    let left: number = 0;
    let right: number = time;

    let previousMiddle = 0;

    while (left <= right) {
        const middle: number = Math.ceil((left + right) / 2);

        let currentPossible = winPossible(middle, time, distance);
        if (!currentPossible) {
            return previousMiddle;
        }
        if (currentPossible) {
            right = middle+1;
            previousMiddle = middle+1;
        } 
    }
}

// find top range
const max = (time: number, distance: number) => {
    let left: number = time;
    let right: number = 0;

    let previousMiddle = 0;

    while (left >= right) {
        const middle: number = Math.ceil((left + right) / 2);

        let currentPossible = winPossible(middle, time, distance);
        if (!currentPossible) {
            return previousMiddle;
        }
        if (currentPossible) {
            right = middle+1;
            previousMiddle = middle+1;
        } 
    }
}

let range : number[] = [];

// find minimum win
let count = 0;
while (count < (min(time,distance) as number)) {
    if (winPossible(count, time,distance)) {
        range.push(count);
        break;
    };
    count++;
}

// find maximum win
count = time;
while (time > (max(time,distance) as number)) {
    if (winPossible(count, time,distance)) {
        range.push(count);
        break;
    };
    count--;
}

console.log(range[1]-range[0]+1);

export { }