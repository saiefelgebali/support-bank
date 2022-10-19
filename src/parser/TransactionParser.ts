import log4js from "log4js";
import { Transaction } from "../Transaction";
import { UserAccount } from "../UserAccount";
import Decimal from "decimal.js";

const logger = log4js.getLogger("<TransactionParser.ts>");

export abstract class TransactionParser {
	protected text: string;

	constructor(text: string) {
		this.text = text;
		logger.log(`Creating new TransactionParser`);
	}

	public async parse() {
		const transactions = await this.parseTransactions();
		const users: { [name: string]: UserAccount } = {};

		transactions.forEach((record) => {
			if (!(record.from in users)) {
				users[record.from] = new UserAccount(record.from);
			}
			if (!(record.to in users)) {
				users[record.to] = new UserAccount(record.to);
			}
		});

		return { users, transactions };
	}

	protected abstract parseTransactions(): Promise<Transaction[]>;

	protected formatAmount(amount: string | number) {
		if (typeof amount === "string") {
			return new Decimal(parseFloat(amount));
		}

		return new Decimal(amount);
	}
}
