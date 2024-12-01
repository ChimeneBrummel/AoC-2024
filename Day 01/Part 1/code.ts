const example = await Deno.readTextFile("input.txt");
const lines = example.split('\n').filter(line => line.trim() !== '');

const leftList: number[] = [];
const rightList: number[] = [];

lines.forEach(line => {
    const [left, right] = line.split(/\s+/).map(Number);
    leftList.push(left);
    rightList.push(right);
});

leftList.sort((a, b) => a - b);
rightList.sort((a, b) => a - b);

let totalDistance = 0;
for (let i = 0; i < leftList.length; i++) {
    totalDistance += Math.abs(leftList[i] - rightList[i]);
}

console.log(totalDistance);