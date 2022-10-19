import readlineSync from "readline-sync";
import log4js from "log4js";

const logger = log4js.getLogger("<userInput.ts>");

export function getString(message: string, options?: string[]) {
    const inputString = readlineSync.question(message);

    const validOption = !!options?.find((o) =>
        inputString.toLowerCase().startsWith(o.toLowerCase())
    );

    if (options && !validOption) {
        return getString(message, options);
    }

    return inputString;
}

export function getCommandLineArguments(n): string[] {
    const args = process.argv.slice(2);
    if (args.length < n) {
        logger.error(
            "User did not input the correct number of command line arguments"
        );
        throw "Missing command line arguments";
    }
    return args;
}
