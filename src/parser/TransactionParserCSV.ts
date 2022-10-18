import log4js from "log4js";
import { DateTime } from "luxon";
import { parse, CastingContext } from "csv-parse/sync";
import { TransactionParser } from "./TransactionParser";
import { Transaction } from "../Transaction";

const logger = log4js.getLogger("<TransactionParser.ts>");

export class TransactionParserCSV extends TransactionParser {
	constructor(text: string) {
		super(text);
	}

	public override async parseTransactions() {
		logger.log(`Parsing CSV file`);

		return parse(this.text, {
			columns: true,
			onRecord: this.createTransaction,
		}) as Transaction[];
	}

	private createTransaction(
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
}
