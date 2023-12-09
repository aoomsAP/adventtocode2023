import fs from "fs";

let input = fs.readFileSync("input.txt", "utf8");

// sample
// input = `0 3 6 9 12 15
// 1 3 6 10 15 21
// 10 13 16 21 30 45`

const history : string[] = input.split("\n");

const histories = history.map(h => h.split(" ").map(n => parseInt(n)));

const extrapolateOnce = (history: number[]) => {
    let nextSequence = [];
    for (let i = 1; i < history.length; i++) {
        nextSequence.push(history[i]-history[i-1]);
    }
    return nextSequence;
}

const extrapolateUntilZero = (history: number[]) => {
    let current = history;
    let extrapolation : number[][] = [history];
    while (current.filter((x: number) => x === 0).length != current.length) {
        extrapolation.push(extrapolateOnce(current));
        current = extrapolateOnce(current);
    }
    return extrapolation;
}

const getNextValueInHistory = (extrapolation: number[][]) => {
    let nextValue : number = 0;
    for (let i = extrapolation.length-1; i > 0; i--) {
        let firstValue = extrapolation[i-1][0];
        nextValue = firstValue-nextValue;
    }
    return nextValue;
}

let nextValues = histories.map(history => {
    let extrapolation = extrapolateUntilZero(history);
    return getNextValueInHistory(extrapolation);
})

// console.log(nextValues);
console.log(nextValues.reduce((acc,prev) => acc+prev));

export { }