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