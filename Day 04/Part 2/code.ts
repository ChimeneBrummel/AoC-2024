const input = await Deno.readTextFile("input.txt");
const array = input.split('\n').map(line => line.split(''));

function countXMAS(array: string[][]): number {

    const directions: [number, number][] = [
        [-1, -1], //top left
        [-1, 1], //top right
    ];

    const correspondingDirections: Record<string, [number, number]> = {
        '-1,-1': [1, 1],
        '-1,1': [1, -1]
    }

    const correspondingLetters: Record<string, string> = {
        'M': 'S',
        'S': 'M'
    }

    const xmasPattern = /M|S/;

    return array.flatMap((row, rowIndex) =>
        row.flatMap((cell, colIndex) =>
            cell === 'A' && directions.every((direction) => {
                const topLetter = searchDirection(array, rowIndex, colIndex, direction);
                if (!topLetter) return false;
                const topLetterValid = topLetter.match(xmasPattern)
                const bottomLetter = searchDirection(array, rowIndex, colIndex, correspondingDirections[direction.toString()]);
                if (!bottomLetter) return false;
                const bottomLetterValid = bottomLetter === correspondingLetters[topLetter];
                return topLetterValid && bottomLetterValid
            })
        )
    ).reduce((acc, curr) => {
        if (curr) {
            return acc + 1
        }
        return acc
    }, 0);
}

function searchDirection(grid: string[][], startRow: number, startCol: number,
    [y, x]: [number, number]): string {
    const newRow = startRow + y;
    const newCol = startCol + x;
    return grid?.[newRow]?.[newCol];
};

console.log(countXMAS(array));
