import fs from "fs";

let input = fs.readFileSync("input.txt", "utf8");

// sample
// input = `Time:      7  15   30
// Distance:  9  40  200`

const data: string[] = input.split(`\n`)
    .map(line => line.substring(line.indexOf(":") + 1).trimStart());

const times = data[0].split(/\s+/).map(time => parseInt(time));
const distances = data[1].split(/\s+/).map(distance => parseInt(distance));

interface Race {
    time: number,
    distance: number,
}

const races: Race[] = times.map((time, i) => {
    return {
        time: time,
        distance: distances[i]
    }
})

const racePossibilities = races.map(race => {
    let possibilities: number = 0;
    for (let speed = 0; speed < race.time; speed++) {
        let distanceResult = (race.time - speed) * speed;
        if (distanceResult > race.distance) possibilities++;
    }
    return possibilities;
});

console.log(racePossibilities.reduce((acc,x) => acc*x));

export { }