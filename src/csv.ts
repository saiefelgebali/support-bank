import fs from "fs";
import { CastingContext, parse } from "csv-parse";
import { DateTime } from "luxon";
import { UserAccount } from "./UserAccount";
import { Transaction } from "./Transaction";
import log4js from "log4js";
import type { UserAccountStore } from "./UserAccountStore.interface";

const logger = log4js.getLogger("<csv.ts>");

function createTransactionFromCSV(
	record: { [col: string]: string },
	context: CastingContext
): Transaction {
	const date = DateTime.fromFormat(record.Date, "dd/mm/yyyy");
	const from = record.From;
	const to = record.To;
	const narrative = record.Narrative;
	const amount = parseFloat(record.Amount);

	if (date.invalidReason) {
		logger.error(
			`The date in line ${context.lines} is invalid: ${date.invalidExplanation}`
		);
	}

	if (Number.isNaN(amount)) {
		logger.error(`The amount in line ${context.lines} is not a number`);
	}

	return new Transaction(date, from, to, narrative, amount);
}

export async function parseTransactionsCSV(path: string) {
	logger.log("Starting to parse csv file");

	const csv = fs.readFileSync(path).toString();

	const parser = parse(csv, {
		columns: true,
		onRecord: createTransactionFromCSV,
	});

	const transactions: Transaction[] = [];

	for await (const transaction of parser) {
		transactions.push(transaction);
	}

	return transactions;
}

export function parseUsers(records: Transaction[]): UserAccountStore {
	const users: { [name: string]: UserAccount } = {};

	records.forEach((record) => {
		if (!(record.from in users)) {
			users[record.from] = new UserAccount(record.from);
		}
		if (!(record.to in users)) {
			users[record.to] = new UserAccount(record.to);
		}
	});

	return users;
}
