import fs from "fs";

let input = fs.readFileSync("input.txt", "utf8");

// sample
// input = `two1nine
// eightwothree
// abcone2threexyz
// xtwone3four
// 4nineeightseven2
// zoneight234
// 7pqrstsixteen`

const values : string[] = input.split(`\n`);

const digitWords: string [] = [
    "one","two","three","four","five","six","seven","eight","nine"
]

// filtering for only digits
const regex = new RegExp(/\d/)

const digits : number[] = values.map(value => {
    // turn digit words into digits
    let valueCopy = value; value = "";
    valueCopy.split("").forEach((char,i) => {
        // at every index of the string
        // check whether there is a match for a digit word
        let count: number = 1;
        let digitWordReplaced : boolean = false;
        // if yes, replace the character with the digit value
        digitWords.forEach(digitWord => {
            if (valueCopy.startsWith(digitWord,i)) {
                value+= count.toString();
                digitWordReplaced = true;
            }
            count++;
        })
        // if no, keep the character as is
        if (!digitWordReplaced) value+=char;
    });

    // keep only digits
    const onlyDigits = value.split("").reduce((str,char) => {
        return (regex.test(char)) ? str+char : str;
    },"");

    // keep only first and last digit
    return parseInt(onlyDigits[0]+onlyDigits[onlyDigits.length-1]);
});

console.log("What is the sum of all of the calibration values?");
const sumOfValues = digits.reduce((sum,value) => sum+value);
console.log(sumOfValues);

export { }