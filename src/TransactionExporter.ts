import fs from "fs";
import { Transaction } from "./Transaction";
import log4js from "log4js";

const logger = log4js.getLogger("<TransactionExporter.ts>");

export class TransactionExporter {
	public static export(transactions: Transaction[], path: string) {
		logger.log("Exporting transactions");

		const text = JSON.stringify(
			transactions.map((data) => this.transactionToJson(data))
		);

		logger.log(`Writing to file: ${fs.realpath(path)}`);

		fs.writeFileSync(path, text);
	}

	private static transactionToJson(transaction: Transaction) {
		return {
			date: transaction.date.toISO(),
			from: transaction.from,
			to: transaction.to,
			narrative: transaction.narrative,
			amount: transaction.amount,
		};
	}
}
