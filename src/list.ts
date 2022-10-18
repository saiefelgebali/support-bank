import { UserAccount, UserAccountStore } from "./users";
import { Table } from "./table";

export function listAll(users: UserAccountStore): void {
	const data = Object.values(users).map((user) => ({
		name: user.name,
		balance: `${user.balance.toFixed(2)}`,
	}));

	const headers = {
		name: "Name",
		balance: "Balance (£)",
	};

	const table = new Table(headers, data);

	table.printTable();
}

export function listUserTransactions(user: UserAccount) {
	const headers = {
		amount: "Amount",
		date: "Date",
		narrative: "Narrative",
	};

	const data = user.transactions.map((transaction) => ({
		amount: `£${transaction.amount.toFixed(2)}`,
		date: transaction.date.toFormat("dd/mm/yyyy"),
		narrative: transaction.narrative,
	}));

	const table = new Table(headers, data);

	table.printTable();
}
