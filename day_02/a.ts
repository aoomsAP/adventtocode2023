import fs from "fs";

let input = fs.readFileSync("input.txt", "utf8");

// sample
// input = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
// Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
// Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
// Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
// Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`

let games : string[] = input.split(`\n`);

// cut off "game id: "
games = games.map(game => game.substring(game.indexOf(":")+2));

const possibleGames = games.map(game => {

    let possibleGame = true;

    game.split("; ").forEach(set => {

        set.split(", ").forEach(color => {            
            if (color.includes("blue")) {
                color = color.replace("/\D/", "");
                const numberOfCubes = parseInt(color);
                if (numberOfCubes > 14) possibleGame = false;
            }
            else if (color.includes("green")) {
                color = color.replace("/\D/", "");
                const numberOfCubes = parseInt(color);
                if (numberOfCubes > 13) possibleGame = false;
            }
            else if (color.includes("red")) {
                color = color.replace("/\D/", "");
                const numberOfCubes = parseInt(color);
                if (numberOfCubes > 12) possibleGame = false;
            }

        })

    })

    return possibleGame;
})

const sumOfIds : number = possibleGames.reduce((sum,game,i) => {
    if (game === true) return sum+(i+1);
    else return sum;
},0)

console.log(sumOfIds);

export {}