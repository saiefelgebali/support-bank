import readlineSync from "readline-sync";

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
		throw "Missing command line arguments";
	}
	return args;
}
