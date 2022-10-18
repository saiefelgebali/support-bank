import { parseTransactionsCSV } from "./csv";
import { listAll } from "./list";
import { Transaction } from "./transactions";
import { UserAccountStore } from "./users";

function collapseTransactions(path: string) {
	const { users, transactions } = parseTransactionsCSV(path);

	transactions.forEach((transaction) => {
		users[transaction.from].handleTransaction(transaction);
		users[transaction.to].handleTransaction(transaction);
	});

	return { users, transactions };
}

function listUserTransactions(
	name: string,
	users: UserAccountStore,
	transactions: Transaction[]
) {
	const user = users[name];
}

function main() {
	const { users, transactions } = collapseTransactions(
		"./examples/Transactions2014.csv"
	);

	listAll(users);
}

main();
