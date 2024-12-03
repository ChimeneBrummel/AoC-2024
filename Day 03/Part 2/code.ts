const input = await Deno.readTextFile("input.txt");

const regex = /mul\((\d{1,3}),(\d{1,3})\)|do\(\)|don't\(\)/g;

const array = [...input.matchAll(regex)];

let mulEnabled = true;

const totalSum = array.reduce((sum, match) => {
    const [fullMatch, firstNumber, secondNumber] = match;

    if (fullMatch.startsWith('mul') && mulEnabled) {
        sum += parseInt(firstNumber) * parseInt(secondNumber);
    }
    else if (fullMatch === 'do()') {
        mulEnabled = true;
    }
    else if (fullMatch === "don't()") {
        mulEnabled = false;
    }

    return sum;
}, 0);

console.log(totalSum);