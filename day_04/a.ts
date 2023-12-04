import fs from "fs";

let input = fs.readFileSync("input.txt", "utf8");

// sample
// input = `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
// Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
// Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
// Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
// Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
// Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`

let cards : string[] = input.split(`\n`);

let points : number[] = [];

cards.forEach((card,i) => {
    let trimIndex = card.indexOf(":");
    let trimmedCard = card.substring(trimIndex+1);
    
    let winningNumbers = trimmedCard
                        .split("|")[0]
                        .split(" ")
                        .filter(x => /\d/.test(x))
                        .map(n => parseInt(n));

    let yourNumbers = trimmedCard
                        .split("|")[1]
                        .split(" ")
                        .filter(x => /\d/.test(x))
                        .map(n => parseInt(n));

    let matches : number[] = winningNumbers.filter(w => yourNumbers.includes(w));

    if (matches.length > 0) {
        let score : number = 0.5;
        matches.forEach(match => score*=2);
        points.push(score);
    }
})

console.log(points)

console.log(points.reduce((s,x) => s+x));

export {}