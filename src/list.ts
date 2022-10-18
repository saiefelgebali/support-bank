import { UserAccountStore } from "./users";
import { Table } from "./table";

export function listAll(users: UserAccountStore): void {
	const userList = Object.values(users).map((user) => ({
		name: user.name,
		balance: `${user.balance.toFixed(2)}`,
	}));

	const headers = {
		name: "Name",
		balance: "Balance (£)",
	};

	const table = new Table(headers, userList);

	table.printTable();
}
