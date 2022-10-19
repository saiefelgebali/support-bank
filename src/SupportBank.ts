import log4js from "log4js";
import { listAll, listUserTransactions } from "./list";
import { Parser } from "./parser/Parser";
import { UserAccountStore } from "./UserAccountStore.interface";
import { getString } from "./userInput";

const logger = log4js.getLogger("<Bank.ts>");

export class SupportBank {
	private users: UserAccountStore;

	constructor() {
		logger.log("Initialize Support Bank");
	}

	public start() {
		this.mainMenu();
	}

	public async readFromFile(filename: string) {
		logger.log("Getting users from file");
		this.users = await this.getUserAccounts(filename);
		logger.log(`Parsed ${Object.keys(this.users).length} users`);
	}

	private async getUserAccounts(path: string) {
		const parser = Parser.getParser(path);
		const { users, transactions } = await parser.parse();

		transactions.forEach((transaction) => {
			users[transaction.from].handleTransaction(transaction);
			users[transaction.to].handleTransaction(transaction);
		});

		return users;
	}

	private mainMenu() {
		const option = getString(
			"Enter (a) to list al users, or (u) to list a specific user: ",
			["a", "u", "q"]
		);

		switch (option) {
			case "a":
				listAll(this.users);
				break;
			case "u":
				this.listUserMenu();
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
}
