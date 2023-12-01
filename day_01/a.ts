import fs from "fs";

let input = fs.readFileSync("input.txt", "utf8");

// sample
input = `1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet`

const values : string[] = input.split(`\n`);

// filtering for only digits
const regex = new RegExp(/\d/)

const digits : number[] = values.map(value => {
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