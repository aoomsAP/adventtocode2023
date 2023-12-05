import fs from "fs";

let input = fs.readFileSync("input.txt", "utf8");

// sample
// input = `seeds: 79 14 55 13

// seed-to-soil map:
// 50 98 2
// 52 50 48

// soil-to-fertilizer map:
// 0 15 37
// 37 52 2
// 39 0 15

// fertilizer-to-water map:
// 49 53 8
// 0 11 42
// 42 0 7
// 57 7 4

// water-to-light map:
// 88 18 7
// 18 25 70

// light-to-temperature map:
// 45 77 23
// 81 45 19
// 68 64 13

// temperature-to-humidity map:
// 0 69 1
// 1 0 69

// humidity-to-location map:
// 60 56 37
// 56 93 4`

let data : string[] = input.split(`\n\n`);

const mapData = (data: string) => {
    return data.substring(data.indexOf("\n")+1).split("\n");
}

const seeds = data[0].substring(data[0].indexOf(":")+2)
                    .split(" ")
                    .map(seed => parseInt(seed));


const locations : number[] = seeds.map((seed,index) => {

    let value : number = seed;

    for (let i = 1; i < data.length; i++) {
        let map = mapData(data[i]);
        let converted = false;
        map.forEach(line => {
            let destRange = parseInt(line.split(" ")[0]);
            let sourceRange = parseInt(line.split(" ")[1]);
            let rangeLength = parseInt(line.split(" ")[2]);

            if (value >= sourceRange && value < sourceRange+rangeLength
                && !converted) {
                value = (value-sourceRange)+destRange;
                converted = true;
            }
        })
    }

    return value;
})

console.log(locations.sort((a,b) => a-b));

export {}