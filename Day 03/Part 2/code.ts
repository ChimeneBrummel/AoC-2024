const input = await Deno.readTextFile("input.txt");

const mulRegex = /mul\((\d{1,3}),(\d{1,3})\)/g;
const doRegex = /do\(\)/g;
const dontRegex = /don't\(\)/g;

// Added .sort to ensure the regex matches are processed in the correct order. Otherwise mulEnabled kept defaulting to true.
//Leading to incorrect answers. This happened due to the array not having been sorted based on index of the input.txt.
const array = [
    ...input.matchAll(mulRegex),
    ...input.matchAll(doRegex),
    ...input.matchAll(dontRegex)
].sort((a, b) => a.index - b.index);

let mulEnabled = true

const totalSum = array.reduce(
    (sum, match) => {
        if (mulRegex.test(match[0]) && mulEnabled) {
            const [_fullMatch, firstNumber, secondNumber] = match;
            sum += parseInt(firstNumber) * parseInt(secondNumber);
        }

        else if (doRegex.test(match[0])) {
            mulEnabled = true;
        }

        else if (dontRegex.test(match[0])) {
            mulEnabled = false;
        }

        return sum;
    }, 0)

console.log(totalSum);