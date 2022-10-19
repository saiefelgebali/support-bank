import log4js from "log4js";
import { DateTime } from "luxon";
import { TransactionParser } from "./TransactionParser";
import { Transaction } from "../Transaction";

const logger = log4js.getLogger("<TransactionParserJSON.ts>");

export class TransactionParserJSON extends TransactionParser {
	constructor(text: string) {
		super(text);
	}

	public override async parseTransactions() {
		logger.log(`Parsing JSON file`);

		const data = JSON.parse(this.text) as any[];

		return data.map(this.createTransaction);
	}

	private createTransaction(data: any, i: number): Transaction {
		const date = DateTime.fromISO(data.Date);
		const amount = data.Amount;

		if (date.invalidReason) {
			logger.error(
				`The date at entry ${i} is invalid: ${date.invalidExplanation}`
			);
		}

		if (Number.isNaN(amount)) {
			logger.error(`The amount in entry ${i} is not a number`);
		}

		return new Transaction(
			date,
			data.FromAccount,
			data.ToAccount,
			data.Narrative,
			amount
		);
	}
}
