import { DateTime } from "luxon";

export class Transaction {
	constructor(
		public date: DateTime,
		public from: string,
		public to: string,
		public narrative: string,
		public amount: number
	) {}
}
