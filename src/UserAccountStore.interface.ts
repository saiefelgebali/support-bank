import type { UserAccount } from "./UserAccount";

export interface UserAccountStore {
	[name: string]: UserAccount;
}
