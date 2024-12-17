const input = await Deno.readTextFile("input.txt");

const [rulesSection, updatesSection] = input.split("\n\n");
const rules = rulesSection.split("\n");
const updates = updatesSection.split("\n");

const parsedRules = rules.map(rule => {
    const [pageBefore, pageAfter] = rule.split("|").map(Number);
    return { pageBefore, pageAfter };
});

export const buildGraph = (rules: { pageBefore: number; pageAfter: number }[]) => {
    const adjacencyList: Map<number, number[]> = new Map();
    const inDegreeCount: Map<number, number> = new Map();

    rules.forEach(({ pageBefore, pageAfter }) => {
        adjacencyList.set(pageBefore, adjacencyList.get(pageBefore) || []);
        adjacencyList.set(pageAfter, adjacencyList.get(pageAfter) || []);
        inDegreeCount.set(pageBefore, inDegreeCount.get(pageBefore) || 0);
        inDegreeCount.set(pageAfter, (inDegreeCount.get(pageAfter) || 0) + 1);

        adjacencyList.get(pageBefore)!.push(pageAfter);
    });

    return { adjacencyList, inDegreeCount };
};

export const topologicalSort = (adjacencyList: Map<number, number[]>, inDegreeCount: Map<number, number>) => {
    const sorted: number[] = [];
    const queue: number[] = Array.from(inDegreeCount.entries())
        .filter(([_, count]) => count === 0)
        .map(([node]) => node);

    while (queue.length > 0) {
        const node = queue.shift()!;
        sorted.push(node);

        (adjacencyList.get(node) || []).forEach(neighbor => {
            inDegreeCount.set(neighbor, inDegreeCount.get(neighbor)! - 1);
            if (inDegreeCount.get(neighbor) === 0) queue.push(neighbor);
        });
    }

    return sorted;
};

export  const isUpdateValid = (update: string) => {
    const pages = update.split(",").map(Number);

    return parsedRules.every(({ pageBefore, pageAfter }) => {
        const indexBefore = pages.indexOf(pageBefore);
        const indexAfter = pages.indexOf(pageAfter);

        return indexBefore === -1 || indexAfter === -1 || indexBefore < indexAfter;
    });
};

const { adjacencyList, inDegreeCount } = buildGraph(parsedRules);
const topoOrder = topologicalSort(adjacencyList, inDegreeCount);

console.log("Topological Order:", topoOrder);

const invalidUpdates = updates.filter(update => !isUpdateValid(update));
console.log("Invalid Updates:", invalidUpdates);

const reorderedUpdates = invalidUpdates.map(update => {
    const pages = update.split(",").map(Number);
    return pages.sort((a, b) => topoOrder.indexOf(a) - topoOrder.indexOf(b));
});

console.log("Reordered Updates:", reorderedUpdates);

const middlePages = reorderedUpdates.map(update => {
    const middleIndex = Math.floor(update.length / 2);
    return update[middleIndex];
});

console.log("Middle Pages:", middlePages);

const middleSum = middlePages.reduce((acc, curr) => acc + curr, 0);

console.log(`Reordered Invalid Updates:`);
reorderedUpdates.forEach(update => console.log(update.join(",")));
console.log(`Middle page numbers: ${middlePages}`);
console.log(`Sum of middle page numbers: ${middleSum}`);