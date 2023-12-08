import fs from "fs";

let input = fs.readFileSync("input.txt", "utf8");

// sample
// input = `32T3K 765
// T55J5 684
// KK677 28
// KTJJT 220
// QQQJA 483`

interface Hand {
    hand: string,
    bid: number,
    type: number,
}

const splitOnDifference = (arr: string[]) => {
    let splitArray: string[][] = [];
    let sliceStart = 0;
    let sliceEnd = arr.length - 1;
    for (let i = 1; i <= arr.length; i++) {
        if (arr[i] != arr[i - 1]) {
            sliceEnd = i;
            splitArray.push(arr.slice(sliceStart, sliceEnd));
            sliceStart = i;
        }
    }
    return splitArray;
}

const getType = (hand: string) => {
    let sortedHand = hand.split("").sort();
    let splitHand = splitOnDifference(sortedHand);
    splitHand.sort((a, b) => b.length - a.length);
    if (splitHand[0].length === 5) {
        return 6;
    }
    if (splitHand[0].length === 4) {
        return 5;
    }
    if (splitHand[0].length === 3 && splitHand[1].length === 2) {
        return 4;
    }
    if (splitHand[0].length === 3) {
        return 3;
    }
    if (splitHand[0].length === 2 && splitHand[1].length === 2) {
        return 2;
    }
    if (splitHand[0].length === 2) {
        return 1;
    }
    return 0;
}

let hands: Hand[] = input.split(`\n`)
    .map(x => {
        return {
            hand: x.split(" ")[0],
            bid: parseInt(x.split(" ")[1]),
            type: getType(x.split(" ")[0]),
        }
});

const sortHands = (hands: Hand[]) => {
    let sortedHands = [...hands]
    .sort((a,b) => {
        let order = ["A", "K", "Q", "J", "T", "9", "8", "7", "6", "5", "4", "3", "2"];
        let highestCardSort : number = 0;
        for (let i = 0; i < 5; i++) {
            if (order.indexOf(a.hand[i]) < order.indexOf(b.hand[i])) {
                highestCardSort = 1;
                break;
            }
            if (order.indexOf(a.hand[i]) > order.indexOf(b.hand[i])) {
                highestCardSort = -1;
                break;
            }
        }
        return (a.type - b.type) || highestCardSort;
    })
    return sortedHands;
}

const totalWinnings = sortHands(hands).reduce((sum, hand, index) => {
    let rank : number = index+1;
    return sum+(hand.bid*rank);
},0);

console.log(totalWinnings);

export { }