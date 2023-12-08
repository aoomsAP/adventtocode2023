import fs from "fs";

let input = fs.readFileSync("input.txt", "utf8");

// sample
// input = `32T3K 765
// T55J5 684
// KK677 28
// KTJJT 220
// QQQJA 483`

// extra sample
// input = `J35T8 158
// 6AJ66 6
// 57378 156
// QT24T 586
// 4T546 850
// 79TA2 237
// A7585 793
// 9TT9Q 138
// K4K4J 154
// K863K 345
// J4675 887
// 86886 2
// 455A6 658
// A5QQ5 341
// 69J9J 165
// KT592 178
// TKTKT 944
// 3JTT5 774
// J5Q24 404
// 49J99 415
// 2Q5AQ 943
// 22226 109
// 95J9T 593
// 4K44K 524
// 428J4 428
// A6JA6 21
// TT7J7 601
// 96TJQ 735
// 4K4TT 719
// JAAAA 983
// K397A 357
// JA348 200
// K8888 732
// J934K 488
// 76J37 201
// QJTT2 628
// 356KA 442
// 99JKK 547
// K7J73 934`

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
    let jokers = sortedHand.filter(x => x === "J").length;
    let splitHand = splitOnDifference(sortedHand);
    splitHand.sort((a, b) => b.length - a.length);

    // five of a kind
    if (splitHand[0].length === 5) return 6;
    if (splitHand[0][0] != "J") {
        if (splitHand[0].length + jokers === 5) return 6;
    }
    if (splitHand[0][0] === "J") {
        if (splitHand[1].length + jokers === 5) return 6;
    }

    // four of a kind
    if (splitHand[0].length === 4) return 5
    if (splitHand[0][0] != "J") {
        if (splitHand[0].length + jokers === 4) return 5;
    }
    if (splitHand[0][0] === "J") {
        if (splitHand[1].length+jokers === 4) return 5;
    }

    // full house
    if (splitHand[0].length === 3 && splitHand[1].length === 2) return 4;
    if (splitHand[0][0] != "J" && splitHand[0][1] != "J") {
        if (splitHand[0].length+jokers === 3 && splitHand[1].length === 2) return 4;
        if (splitHand[0].length === 3 && splitHand[1].length+jokers === 2) return 4;
    }

    // three of a kind
    if (splitHand[0].length === 3) return 3;
    if (splitHand[0][0] != "J") {
        if (splitHand[0].length + jokers === 3) return 3;
    }
    if (splitHand[0][0] === "J") {
        if (splitHand[1].length+jokers === 3) return 3;
    }

    // two pair
    // max jokers === 2, otherwise it would be 3 of a kind or more
    if (splitHand[0].length === 2 && splitHand[1].length === 2) return 2;
    if (splitHand[0][0] != "J") {
        if (splitHand[0].length+jokers === 2 && splitHand[1].length === 2) return 2;
    }

    // one pair
    if (splitHand[0].length === 2) return 1;
    if (splitHand[0][0] != "J") {
        if (splitHand[0].length + jokers === 2) return 1;
    }
    if (splitHand[0][0] === "J") {
        if (splitHand[1].length+jokers === 2) return 1;
    }

    // high card
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
        .sort((a, b) => {
            // added joker!
            let order = ["A", "K", "Q", "T", "9", "8", "7", "6", "5", "4", "3", "2", "J"];
            let highestCardSort: number = 0;
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
    let rank: number = index + 1;
    return sum + (hand.bid * rank);
}, 0);

// console.log(sortHands(hands));
console.log(totalWinnings);

export { }