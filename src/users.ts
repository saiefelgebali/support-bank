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

	private _balance: number;

	constructor(private _name: string) {
		this._balance = 0;
	}

	addBalance(number: number) {
		this._balance += number;
	}

	removeBalance(number: number) {
		this._balance -= number;
	}

	handleTransaction(transaction: Transaction) {
		if (transaction.from === this.name) {
			this.removeBalance(transaction.amount);
		}

		if (transaction.to === this.name) {
			this.addBalance(transaction.amount);
		}
	}
}
