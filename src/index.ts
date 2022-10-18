import { parseTransactionsCSV } from "./csv";
import { listAll, listUserTransactions } from "./list";
import { getString } from "./userInput";
import { UserAccountStore } from "./users";

function collapseTransactions(path: string) {
	const { users, transactions } = parseTransactionsCSV(path);

	transactions.forEach((transaction) => {
		users[transaction.from].handleTransaction(transaction);
		users[transaction.to].handleTransaction(transaction);
	});

	return users;
}

function listUserMenu(users: UserAccountStore) {
	const username = getString("Enter user name: ");
	if (!(username in users)) {
		return listUserMenu(users);
	}

	const user = users[username];
	listUserTransactions(user);
}

function mainMenu(users: UserAccountStore) {
	const option = getString(
		"Enter (a) to list al users, or (u) to list a specific user: ",
		["a", "u", "q"]
	);

	switch (option) {
		case "a":
			listAll(users);
			break;
		case "u":
			listUserMenu(users);
			break;
		case "q":
			return;
	}

	mainMenu(users);
}

function main() {
	const users = collapseTransactions("./examples/Transactions2014.csv");
	mainMenu(users);
}

main();
