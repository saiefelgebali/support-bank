import { DateTime } from "luxon";
import { TransactionCSVRecord } from "./csv";

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

	static fromTransactionRecord(record: TransactionCSVRecord) {
		const date = DateTime.fromFormat(record.Date, "dd/mm/yyyy");
		return new Transaction(
			date,
			record.From,
			record.To,
			record.Narrative,
			record.Amount
		);
	}
}
