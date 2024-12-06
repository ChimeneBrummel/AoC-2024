const input = await Deno.readTextFile("input.txt");
const array = input.split('\n').map(line => line.split(''));

function countXMAS(array: string[][]): number {

    const directions: [number, number][] = [
        [-1, 0], [1, 0], [0, -1], [0, 1],
        [-1, -1], [-1, 1], [1, -1], [1, 1]
    ];
    const targetWord = "XMAS";

    return array.flatMap((row, rowIndex) =>
        row.flatMap((cell, colIndex) =>
            cell === 'X'
                ? directions.reduce((count, direction) =>
                    count + (searchDirection(array, rowIndex, colIndex, direction, targetWord) ? 1 : 0),
                    0
                )
                : 0
        )
    ).reduce((a, b) => a + b, 0);
}

function searchDirection(grid: string[][], startRow: number, startCol: number, 
    direction: [number, number], word: string): boolean {
    return [...word].every((char, index) => {
        const newRow = startRow + direction[0] * index;
        const newCol = startCol + direction[1] * index;
        return isInBounds(newRow, newCol, grid) && grid[newRow][newCol] === char;
    });
}

function isInBounds(row: number, col: number, grid: string[][]): boolean {
    return row >= 0 && row < grid.length && col >= 0 && col < grid[0].length;
}

console.log(countXMAS(array));
