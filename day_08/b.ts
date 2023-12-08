// solved with LCM suggestion from reddit

import fs from "fs";

let input = fs.readFileSync("input.txt", "utf8");

// sample
// input = `LR

// 11A = (11B, XXX)
// 11B = (XXX, 11Z)
// 11Z = (11B, XXX)
// 22A = (22B, XXX)
// 22B = (22C, 22C)
// 22C = (22Z, 22Z)
// 22Z = (22B, 22B)
// XXX = (XXX, XXX)`

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

const nodes = network.map(n => parseNode(n));

const findAllNodes = (nodes: Node[], regex: RegExp) => {
    return nodes.filter(n => regex.test(n.value));
}

const findNode = (nodes: Node[], target: string) => {
    for (let node of nodes) {
        if (node.value === target) return node;
    }
}

const stepsToZNode = (nodes: Node[], currNode: Node) => {
    let zReached = false;
    let steps = 0;
    let directionIndex = 0;
    let currentNode = currNode;

    while (!zReached) {
        steps++;
        let currentDirection = directions[directionIndex];
        let nextNode: Node | undefined = undefined;

        if (currentDirection === "L") {
            nextNode = findNode(nodes, currentNode?.left as string);
        } else {
            nextNode = findNode(nodes, currentNode?.right as string);
        }

        if (!nextNode) return 0;
        if (/([\w)]{2}\Z)/.test(nextNode?.value)) {
            zReached = true;
        }

        directionIndex = (directionIndex === directions.length - 1) ? 0 : directionIndex + 1;
        currentNode = nextNode;
    }

    return steps;
}

let aNodes: Node[] = findAllNodes(nodes, /([\w)]{2}\A)/);

let allSteps = aNodes.map(node => stepsToZNode(nodes, node));

// greatest common divisor
const gcd = (a: number, b: number) => {
    while (b != 0) {
        let tempGCD = b;
        b = a % b;
        a = tempGCD;
    }
    return a;
}

// least common multiple
const lcm = (a: number, b: number) => {
    return (a * b) / gcd(a, b);
}

const leastCommonMultiple = (arr: number[]) => {
    let currentLCM = arr[0];
    for (let n of arr) {
        currentLCM = lcm(currentLCM, n);
    }
    return currentLCM;
}

console.log(leastCommonMultiple(allSteps));

export { }