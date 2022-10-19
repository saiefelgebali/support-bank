import { Transaction } from "./Transaction";

export class UserAccount {
	public name: string;
	public balance: number;
	private transactions: Transaction[];

	constructor(name: string) {
		this.name = name;
		this.balance = 0;
		this.transactions = [];
	}

	public getTransactions() {
		return [...this.transactions];
	}

	public addBalance(number: number) {
		this.balance += number;
	}

	public removeBalance(number: number) {
		this.balance -= number;
	}

	public handleTransaction(transaction: Transaction) {
		if (![transaction.from, transaction.to].includes(this.name)) {
			return;
		}

		this.addTransaction(transaction);

		if (transaction.from === this.name) {
			this.removeBalance(transaction.amount);
		}

		if (transaction.to === this.name) {
			this.addBalance(transaction.amount);
		}
	}

	private addTransaction(transaction: Transaction) {
		this.transactions.push(transaction);
	}
}
