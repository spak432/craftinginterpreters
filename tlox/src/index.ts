import * as fs from 'fs';
import * as path from 'path';
import * as readline from 'node:readline/promises'

const main = (args: string[]) => {
    if (args.length > 1) {
        console.log("Usage: tlox[script]");
        process.exit(64);
    } else if (args.length === 1) {
        runFile(args[0]!);
    } else {
        runPrompt();
    }
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "> ",
});

const runFile = (filepath: string) => {
    const bytes = fs.readFileSync(path.join(process.cwd(), filepath));
    run(bytes);

}

const runPrompt = () => {
    for (;;) {
        rl.prompt();
        rl.on("line", (line) => {
            if (line) {
                run(line);
                rl.prompt();
            } else {
                process.exit(0);
            }
        })
        rl.on("close", () => process.exit(0));
    }
}

const run = (src: string) => {
    const scanner = new Scanner(src);
    let tokens: Token[] = scanner.scanTokens();

    for (token of tokens) {
        console.log(token);
    }
}