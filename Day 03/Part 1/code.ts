const input = await Deno.readTextFile("input.txt");

const regex = /mul\((\d{1,3}),(\d{1,3})\)/g;
const matches = [...input.matchAll(regex)];

const totalSum = matches.reduce((sum, match) => sum + parseInt(match[1]) * parseInt(match[2]), 0);

console.log(totalSum);