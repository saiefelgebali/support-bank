import fs from "fs";
import log4js from "log4js";

const logger = log4js.getLogger("<csv.ts>");

interface TransactionDataJSON {
	Date: string;
	FromAccount: string;
	ToAccount: string;
	Narrative: string;
	Amount: number;
}

export async function parseTransactionsJSON(path: string) {
	logger.log("Starting to parse json file");

	const json = JSON.parse(fs.readFileSync(path).toString());

	console.log(json);

	return [];
}
