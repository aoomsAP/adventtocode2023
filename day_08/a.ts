import fs from "fs";

let input = fs.readFileSync("input.txt", "utf8");

// sample
// input = `RL

// AAA = (BBB, CCC)
// BBB = (DDD, EEE)
// CCC = (ZZZ, GGG)
// DDD = (DDD, DDD)
// EEE = (EEE, EEE)
// GGG = (GGG, GGG)
// ZZZ = (ZZZ, ZZZ)`

// extra sample
// input = `LLR

// AAA = (BBB, BBB)
// BBB = (AAA, ZZZ)
// ZZZ = (ZZZ, ZZZ)`

const directions = input.split("\n")[0];

const network = input.split("\n\n")[1].split("\n");

interface Node {
    value: string,
    left: string,
    right: string,
}

const parseNode = (node: string) => {
    let rLeft = node.match(/\(([^,]+),/) as RegExpMatchArray;
    let rRight = node.match(/,\s([^\)]+)\)/) as RegExpMatchArray;
    return {
        value: node.substring(0, 3),
        left: rLeft[1],
        right: rRight[1],
    }
}

const findNode = (nodes: Node[], target: string) => {
    return nodes.find(n => n.value === target);
}

const nodes = network.map(n => parseNode(n));

let zzzReached = false;
let steps = 0;
let directionIndex = 0;
let currentNode = findNode(nodes,"AAA");

while (!zzzReached) {
    steps++;
    let currentDirection = directions[directionIndex];
    let nextNode : Node|undefined = undefined;

    if (currentDirection === "L") {
        nextNode = findNode(nodes,currentNode?.left as string);
    } else {
        nextNode = findNode(nodes,currentNode?.right as string);
    }

    if (nextNode?.value === "ZZZ") {
        zzzReached = true;
    }

    directionIndex = (directionIndex === directions.length-1) ? 0 : directionIndex+1;
    currentNode = nextNode;
}

console.log(steps);

export { }