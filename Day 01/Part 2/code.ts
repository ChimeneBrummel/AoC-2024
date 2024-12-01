const example = await Deno.readTextFile("input.txt");
const lines = example.split('\n').filter(line => line.trim() !== '');

const leftList: number[] = [];
const rightList: number[] = [];

lines.forEach(line => {
    const [left, right] = line.split(/\s+/).map(Number);
    leftList.push(left);
    rightList.push(right);
});

const rightCountMap: { [key: number]: number } = {};
rightList.forEach(num => {
    if (rightCountMap[num] === undefined) {
        rightCountMap[num] = 0;
    }
    rightCountMap[num]++;
});

let totalSimilarityScore = 0;
leftList.forEach(num => {
    if (rightCountMap[num] !== undefined) {
        totalSimilarityScore += num * rightCountMap[num];
    }
});

console.log(totalSimilarityScore);