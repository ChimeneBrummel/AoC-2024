const example = await Deno.readTextFile("example.txt");
const array = example.split('\n').map(line => line.split(''));

function countXMASPatterns(array: string[][]): number {
    const xmasOffsets = [
        [-1, -1], [-1, 1],
        [1, -1], [1, 1], 
    ];

    return array.map((row, rowIndex) =>
        row.map((cell, colIndex) =>
            cell === "A" &&
            xmasOffsets.every(([dx, dy], i) =>
                isInBounds(rowIndex + dx, colIndex + dy, array) &&
                array[rowIndex + dx][colIndex + dy] === (i % 2 === 0 ? "M" : "S")
            )
                ? 1
                : 0
        ).reduce((sum, count) => sum + count, 0)
    ).reduce((total, rowSum) => total + rowSum, 0);
}

function isInBounds(row: number, col: number, grid: string[][]): boolean {
    return row >= 0 && row < grid.length && col >= 0 && col < grid[0].length;
}

console.log(countXMASPatterns(array));