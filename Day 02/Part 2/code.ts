const input = await Deno.readTextFile("input.txt");
const lines = input.split('\n');

const isMonotonic = (report: number[]) => {
    const isIncreasing = report.every((num, i) => i === 0 || num > report[i - 1]);
    const isDecreasing = report.every((num, i) => i === 0 || num < report[i - 1]);
    return isIncreasing || isDecreasing;
};

const hasValidDifferences = (report: number[]) =>
    report.every((num, i, arr) => i === 0 || Math.abs(num - arr[i - 1]) >= 1 && Math.abs(num - arr[i - 1]) <= 3);

const isSafe = (report: number[]) => isMonotonic(report) && hasValidDifferences(report);

const canBecomeSafe = (report: number[]) => {
    return report.some((_, i) => {
        const modifiedReport = report.filter((_, j) => j !== i);
        return isSafe(modifiedReport);
    });
};

const reports = lines.map(line => line.split(' ').map(Number));
const safeReportsCount = reports.filter(report => isSafe(report) || canBecomeSafe(report)).length;

console.log(safeReportsCount);