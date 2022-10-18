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
}
