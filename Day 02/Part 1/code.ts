const input = await Deno.readTextFile("input.txt");
const lines = input.split('\n');

const isMonotonic = (report: number[]) => {
    const isIncreasing = report.every((num, i) => i === 0 || num > report[i - 1]);
    const isDecreasing = report.every((num, i) => i === 0 || num < report[i - 1]);
    return isIncreasing || isDecreasing;
};

const hasValidDifferences = (report: number[]) =>
    report.every((num, i, arr) => i === 0 || Math.abs(num - arr[i - 1]) >= 1 && Math.abs(num - arr[i - 1]) <= 3);

const safeReports = lines
    .map(line => line.split(' ').map(Number))
    .filter(report => isMonotonic(report) && hasValidDifferences(report));

console.log(safeReports.length);