import log4js from "log4js";
import { listAll, listUserTransactions } from "./list";
import { Parser } from "./parser/Parser";
import { Transaction } from "./Transaction";
import { TransactionExporter } from "./TransactionExporter";
import { UserAccountStore } from "./UserAccountStore.interface";
import { getString } from "./userInput";

const logger = log4js.getLogger("<Bank.ts>");

export class SupportBank {
	private users: UserAccountStore;
	private transactions: Transaction[];

	constructor() {
		logger.log("Initialize Support Bank");
	}

	public start() {
		this.mainMenu();
	}

	public async readFromFile(path: string) {
		logger.log(`Reading data from file: ${path}`);

		const parser = Parser.getParser(path);
		const { users, transactions } = await parser.parse();

		logger.log(`Parsed ${Object.keys(users).length} users`);
		logger.log(`Parsed ${transactions.length} transactions`);

		transactions.forEach((transaction) => {
			users[transaction.from].handleTransaction(transaction);
			users[transaction.to].handleTransaction(transaction);
		});

		this.users = users;
		this.transactions = transactions;
	}

	private mainMenu() {
		const option = getString(
			"Enter (a) to list all users, or (u) to list a specific user, or (e) to export transactions: ",
			["a", "u", "e", "q"]
		);

		switch (option) {
			case "a":
				listAll(this.users);
				break;
			case "u":
				this.listUserMenu();
				break;
			case "e":
				this.exportTransactionsMenu();
				break;
			case "q":
				return;
		}

		this.mainMenu();
	}

	private listUserMenu() {
		const username = getString("Enter user name: ");

		if (!(username in this.users)) {
			return;
		}

		listUserTransactions(this.users[username]);
	}

	private exportTransactionsMenu() {
		const path = getString("Enter save path: ");
		TransactionExporter.export(this.transactions, path);
	}
}
