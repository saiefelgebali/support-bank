export interface UserAccountStore {
	[name: string]: UserAccount;
}

export class UserAccount {
	name: string;
	balance: number;

	constructor(name: string) {
		this.name = name;
		this.balance = 0;
	}
}
