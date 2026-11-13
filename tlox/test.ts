import * as readline from "node:readline/promises";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: '> ',
});

const main = async () => {
    rl.prompt();
    rl.on("line", (line) => {
        if (line) {
            console.log(line + 'log');
            rl.prompt();
        } else {
            process.exit(0);
        }
    });
    rl.on("close", () => process.exit(0));
}

main();