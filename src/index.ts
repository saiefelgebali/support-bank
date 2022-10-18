import { parseTransactionsCSV } from "./csv";
import { listAll, listUserTransactions } from "./list";
import readlineSync from "readline-sync";

function collapseTransactions(path: string) {
	const { users, transactions } = parseTransactionsCSV(path);

	transactions.forEach((transaction) => {
		users[transaction.from].handleTransaction(transaction);
		users[transaction.to].handleTransaction(transaction);
	});

	return users;
}

function getString(message: string, options?: string[]) {
	const inputString = readlineSync.question(message);

	const validOption = !!options?.find((o) =>
		inputString.toLowerCase().startsWith(o.toLowerCase())
	);

	if (options && !validOption) {
		return getString(message, options);
	}

	return inputString;
}

function main() {
	const users = collapseTransactions("./examples/Transactions2014.csv");

	const option = getString(
		"Enter (a) to list al users, or (u) to list a specific user: ",
		["a", "u"]
	);

	switch (option) {
		case "a":
			listAll(users);
			break;
		case "u":
			const username = getString("Enter user name: ");
			const user = users[username];
			listUserTransactions(user);
			break;
	}
}

main();
