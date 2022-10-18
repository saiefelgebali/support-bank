import { Transaction } from "./transactions";

export interface UserAccountStore {
	[name: string]: UserAccount;
}

export class UserAccount {
	public get name() {
		return this._name;
	}
	public get balance() {
		return this._balance;
	}
	public get transactions() {
		return [...this._transactions];
	}

	private _balance: number;
	private _transactions: Transaction[];

	constructor(private _name: string) {
		this._balance = 0;
		this._transactions = [];
	}

	addBalance(number: number) {
		this._balance += number;
	}

	removeBalance(number: number) {
		this._balance -= number;
	}

	addTransaction(transaction: Transaction) {
		this._transactions.push(transaction);
	}

	handleTransaction(transaction: Transaction) {
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
}
