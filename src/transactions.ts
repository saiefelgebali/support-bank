import { CastingContext } from "csv-parse/.";
import { DateTime } from "luxon";
import log4js from "log4js";

const logger = log4js.getLogger("<transactions.ts>");

export class Transaction {
	public get date() {
		return this._date;
	}

	public get from() {
		return this._from;
	}

	public get to() {
		return this._to;
	}

	public get narrative() {
		return this._narrative;
	}

	public get amount() {
		return this._amount;
	}

	constructor(
		private _date: DateTime,
		private _from: string,
		private _to: string,
		private _narrative: string,
		private _amount: number
	) {}

	static createTransactionFromRecord(
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
