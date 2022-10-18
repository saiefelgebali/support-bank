import fs from "fs";
import { parse } from "csv-parse";
import { UserAccount, UserAccountStore } from "./users";
import { Transaction } from "./transactions";
import log4js from "log4js";

const logger = log4js.getLogger("<csv.ts>");

interface ParsedTransactionCSV {
	users: UserAccountStore;
	transactions: Transaction[];
}

export async function parseTransactionsCSV(
	path: string
): Promise<ParsedTransactionCSV> {
	logger.log("Starting to parse csv file");

	const csv = fs.readFileSync(path).toString();

	const parser = parse(csv, {
		columns: true,
		onRecord: Transaction.createTransactionFromRecord,
	});

	const transactions: Transaction[] = [];

	for await (const transaction of parser) {
		transactions.push(transaction);
	}

	return {
		users: parseUsers(transactions),
		transactions,
	};
}

function parseUsers(records: Transaction[]): UserAccountStore {
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
