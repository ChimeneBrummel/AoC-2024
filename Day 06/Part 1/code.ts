const input = await Deno.readTextFile("input.txt");
const rows = input.split('\n');

type Direction = '^' | '>' | 'v' | '<';
type Position = { x: number, y: number };

const directions: Direction[] = ['^', '>', 'v', '<'];
const directionDeltas: { [key in Direction]: Position } = {
  '^': { x: 0, y: -1 },
  '>': { x: 1, y: 0 },
  'v': { x: 0, y: 1 },
  '<': { x: -1, y: 0 }
};

let guardPosition: Position = { x: 0, y: 0 };
let guardDirection: Direction = '^';

rows.some((row, y) => row.split('').some((cell, x) => {
    if (directions.includes(cell as Direction)) {
        guardPosition = { x, y };
        guardDirection = cell as Direction;
        return true;
    }
    return false;
}));

const visitedPositions = new Set<string>([`${guardPosition.x},${guardPosition.y}`]);

const isObstacle = (pos: Position) => {
    return rows[pos.y] && rows[pos.y][pos.x] === '#';
};

const moveGuard = () => {

    const delta = directionDeltas[guardDirection];
    const newPosition = { x: guardPosition.x + delta.x, y: guardPosition.y + delta.y };

    if (isObstacle(newPosition)) {
        guardDirection = directions[(directions.indexOf(guardDirection) + 1) % 4];
    }
    else {
        guardPosition = newPosition;
        visitedPositions.add(`${guardPosition.x},${guardPosition.y}`);
    }
};

while (
    guardPosition.x >= 0 && guardPosition.x < rows[0].length &&
    guardPosition.y >= 0 && guardPosition.y < rows.length
) {
    moveGuard();
}

const printVisitedPositions = () => {
    const output = rows.map((row, y) => {
        return row.split('').map((cell, x) => {
            return visitedPositions.has(`${x},${y}`) ? 'X' : cell;
        }).join('');
    }).join('\n');
    console.log(output);

    const countX = output.split('').filter(char => char === 'X').length;
    console.log(`Distinct positions visited: ${countX}`);
};

printVisitedPositions();