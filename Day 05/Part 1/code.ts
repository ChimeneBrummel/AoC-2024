const input = await Deno.readTextFile("input.txt");

const [rulesSection, updatesSection] = input.split("\n\n");
const rules = rulesSection.split("\n");
const printerUpdates = updatesSection.split("\n");

const parsedRules = rules.map(rule => {
    const [pageBefore, pageAfter] = rule.split("|").map(Number);
    return { pageBefore, pageAfter };
});

const isUpdateValid = (printerUpdates: string) => {
    const pages = printerUpdates.split(",").map(Number);

    return parsedRules.every(({ pageBefore, pageAfter }) => {
        const indexBefore = pages.indexOf(pageBefore);
        const indexAfter = pages.indexOf(pageAfter);

        return indexBefore === -1 || indexAfter === -1 || indexBefore < indexAfter;
    });
};

const validUpdates = printerUpdates.filter(isUpdateValid);
const middlePages = validUpdates.map(update => {
    const pages = update.split(",").map(Number);
    const middleIndex = Math.floor(pages.length / 2);
    return pages[middleIndex];
});

const middleSum = middlePages.reduce((acc, curr) =>
    acc + curr,
    0);

console.log(middleSum);
