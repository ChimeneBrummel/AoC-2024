const input = await Deno.readTextFile("input.txt");
const time = performance.now();

const lines: [number, number[]][] = input.split('\n').map(line => {
    const [testValue, numbers] = line.split(':');
    return [parseInt(testValue), numbers.trim().split(' ').map(Number)];
});

const generateEquations = (numbers: number[], index: number = 0, current: string = ''): string[] =>
    index === numbers.length - 1
        ? [current + numbers[index]]
        : [
            ...['+', '*', '||'].flatMap(operator => generateEquations(numbers, index + 1, current + numbers[index] + operator))
        ];

const evaluateEquation = (equation: string): number =>
    equation.split(/(\+|\*|\|\|)/).reduce((result, token, index, tokens) =>
        index % 2 === 0
            ? result
            : token === '+'
                ? result + parseInt(tokens[index + 1])
                : token === '*'
                    ? result * parseInt(tokens[index + 1])
                    : parseInt(result.toString() + tokens[index + 1]),
        parseInt(equation.split(/(\+|\*|\|\|)/)[0])
    );

const isValidEquation = (testValue: number, numbers: number[]): boolean =>
    generateEquations(numbers).some(equation => evaluateEquation(equation) === testValue);

const totalCalibrationResult = lines
    .filter(([testValue, numbers]) => isValidEquation(testValue, numbers))
    .map(([testValue]) => testValue)
    .reduce((sum, value) => sum + value, 0);

console.log(totalCalibrationResult);
console.log(`${time} seconds since start!`);
