import fs from "fs";
import { parse } from "csv-parse/sync";
import { UserAccount, UserAccountStore } from "./users";
import { Transaction } from "./transactions";

export interface TransactionCSVRecord {
	Date: string;
	From: string;
	To: string;
	Narrative: string;
	Amount: number;
}

interface ParsedTransactionCSV {
	users: UserAccountStore;
	transactions: Transaction[];
}

export function parseTransactionsCSV(path: string): ParsedTransactionCSV {
	const csv = fs.readFileSync(path).toString();

	const records = parse(csv, {
		columns: true,
		skip_empty_lines: true,
		cast: true,
	}) as TransactionCSVRecord[];

	return {
		users: parseUsers(records),
		transactions: parseTransactions(records),
	};
}

function parseTransactions(records: TransactionCSVRecord[]): Transaction[] {
	return records.map((record) => Transaction.fromTransactionRecord(record));
}

function parseUsers(records: TransactionCSVRecord[]): UserAccountStore {
	const users: { [name: string]: UserAccount } = {};

	records.forEach((record) => {
		if (!(record.From in users)) {
			users[record.From] = new UserAccount(record.From);
		}
		if (!(record.To in users)) {
			users[record.To] = new UserAccount(record.To);
		}
	});

	return users;
}
